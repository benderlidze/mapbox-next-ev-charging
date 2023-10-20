"use client";
import { usePinsStore } from "@store/pins";
import { useDirectionsStore } from "@store/directions";
import * as React from "react";
import Map, { Source, Layer, MapRef, MapLayerMouseEvent } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import { PinProps, PinPopup } from "@components/PinPopup";
import { Geocoder } from "@components/GeocoderControl";
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
  chargingPlugsCount,
  chargingPin,
  cirlces,
} from "@components/MapLayers";
import { useCallback, useEffect, useRef, useState } from "react";
import { Directions } from "@components/Directions";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Vehicle } from "@apptypes/vehicle";

export const MapboxMap = () => {
  const { pins, updatePins } = usePinsStore();
  // const updatePins = usePinsStore((state) => state.updatePins);
  const supabase = createClientComponentClient();

  const [selectedPin, setSelectedPin] = useState<PinProps>();
  const [cursor, setCursor] = useState<string>("auto");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    console.log("MapboxMap mounted");

    const getEVCarModels = async () => {
      const { data, error } = await supabase.from("vehicles").select();
      console.log("supabase", data);
      data && setVehicles(data);
    };
    getEVCarModels();

    return () => {
      console.log("MapboxMap unmounted");
    };
  }, []);

  // const evPins = pins
  //   ? pins.map((pin: PinProps, index) => {
  //       const count =
  //         pin.ev_dc_fast_num + pin.ev_level1_evse_num + pin.ev_level2_evse_num;
  //       return (
  //         <Marker
  //           key={`marker-${index}`}
  //           longitude={pin.longitude}
  //           latitude={pin.latitude}
  //           onClick={() => {
  //             console.log("pin", pin);
  //             setSelectedPin(pin);
  //           }}
  //         >
  //           <Pin count={count} size={30} />
  //         </Marker>
  //       );
  //     })
  //   : [];

  const mapRef = useRef<MapRef | null>(null);
  const mapRefCallback = useCallback((ref: MapRef | null) => {
    if (ref !== null) {
      //Set the actual ref we use elsewhere
      mapRef.current = ref;
      const map = ref;
      console.log("map", map);
      const loadImage = () => {
        if (!map.hasImage("ev-icon")) {
          map.loadImage("icons/pin-8-24.png", (error, image) => {
            if (error || image === undefined) throw error;
            map.addImage("ev-icon", image);
          });
        }
      };
      loadImage();
      //TODO need this?
      map.on("styleimagemissing", (e) => {
        const id = e.id; // id of the missing image
        console.log(id);
        loadImage();
      });
    }
  }, []);

  const onClick = useCallback(
    (event: MapLayerMouseEvent) => {
      const feature = event.features && event.features[0];

      if (pins) {
        console.log("feature", feature);
        console.log("pins", pins);
        const id = feature && feature.properties && feature.properties.id;
        const pin = pins.find((pin: PinProps) => pin.id === id);
        console.log("pin", pin);
        setSelectedPin(pin);
      }
    },
    [pins]
  );
  const getStationsInView = async (
    min_lat: number,
    min_long: number,
    max_lat: number,
    max_long: number
  ) => {
    const { data, error } = await supabase.rpc("stations_in_view", {
      min_lat,
      min_long,
      max_lat,
      max_long,
    });
    console.log("data", data, error);
    return data;
  };

  const onMouseEnter = useCallback(() => setCursor("pointer"), []);
  const onMouseLeave = useCallback(() => setCursor("auto"), []);

  const geojson = pins
    ? pins.map((pin: PinProps, index) => {
        const e = +pin.ev_dc_fast_num;
        const l1 = +pin.ev_level1_evse_num;
        const l2 = +pin.ev_level2_evse_num;
        const count = e + l1 + l2;

        console.log("count", count);
        return {
          type: "Feature",
          properties: {
            ...pin,
            charging_plugs_count: count > 0 ? count : "?",
          },
          geometry: {
            type: "Point",
            coordinates: [pin.longitude, pin.latitude],
          },
        };
      })
    : [];
  const featureCollection = {
    type: "FeatureCollection",
    features: geojson,
  } as GeoJSON.FeatureCollection<GeoJSON.Geometry>;

  console.log("featureCollection", featureCollection);
  return (
    <div className="flex flex-grow">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          latitude: 37.798569051801806,
          longitude: -122.37883419920246,
          zoom: 9.5,
        }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        projection={{ name: "mercator" }}
        ref={mapRefCallback}
        interactiveLayerIds={["charging-pin"]}
        cursor={cursor}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMoveEnd={async (e) => {
          const bbox = mapRef.current?.getMap().getBounds().toArray().flat();
          // Get all places in a box of coordinates
          if (bbox) {
            const data = await getStationsInView(
              bbox[1],
              bbox[0],
              bbox[3],
              bbox[2]
            );
            console.log("data", data);
            updatePins(data);
          }
        }}
      >
        <Geocoder
          position={"top-left"}
          onResult={(e: any) => {
            console.log("e======>", e);
            console.log("e======>", e.result.place_type);

            if (e && e.result.place_type.includes("postcode")) {
              const postcode = e.result.text;
              fetch("/api/load-pins/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify([`zip=${postcode}`]),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log("data", data);
                  console.log("data.fuel_stations", data.fuel_stations);
                  updatePins(data.data.fuel_stations);
                })
                .catch((err) => {
                  console.log("err", err);
                });
            }
          }}
        />

        {/* {evPins} */}

        {selectedPin && (
          <PinPopup
            vehicles={vehicles}
            pin={selectedPin}
            setSelectedPin={setSelectedPin}
          />
        )}

        <Source
          id="earthquakes"
          type="geojson"
          data={featureCollection}
          // cluster={false}
          // clusterMaxZoom={14}
          // clusterRadius={50}
        >
          {/* <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} /> */}
          {/* <Layer {...unclusteredPointLayer} /> */}
          <Layer {...cirlces} />
          <Layer {...chargingPin} />
          <Layer {...chargingPlugsCount} />
        </Source>

        <Directions />
      </Map>
    </div>
  );
};
