"use client";
import { usePinsStore } from "@store/pins";
import * as React from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  MapboxEvent,
  MapMouseEvent,
  Source,
  Layer,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import { PinProps, PinPopup } from "@components/PinPopup";
import { Geocoder } from "@components/GeocoderControl";
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
  chargingPlugsCount,
} from "@components/MapLayers";
import { Pin } from "@components/Pin";

export const MapboxMap = () => {
  const pins = usePinsStore((state) => state.pins);
  const [selectedPin, setSelectedPin] = React.useState<PinProps>();

  React.useEffect(() => {
    console.log("MapboxMap mounted");
    return () => {
      console.log("MapboxMap unmounted");
    };
  }, []);

  const evPins = pins
    ? pins.map((pin: PinProps, index) => {
        const count =
          pin.ev_dc_fast_num + pin.ev_level1_evse_num + pin.ev_level2_evse_num;

        return (
          <Marker
            key={`marker-${index}`}
            longitude={pin.longitude}
            latitude={pin.latitude}
            onClick={() => {
              // If we let the click event propagates to the map, it will immediately close the popup
              // with `closeOnClick: true`
              // setPopupInfo(city);
              console.log("pin", pin);
              setSelectedPin(pin);
            }}
          >
            <Pin count={count} size={30} />
          </Marker>
        );
      })
    : [];

  const geojson = pins
    ? pins.map((pin: PinProps, index) => {
        const count =
          pin.ev_dc_fast_num + pin.ev_level1_evse_num + pin.ev_level2_evse_num;

        return {
          type: "Feature",
          properties: {
            ...pin,
            charging_plugs_count: count,
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
      >
        <Geocoder position={"top-left"} />
        {evPins}
        {selectedPin && (
          <PinPopup pin={selectedPin} setSelectedPin={setSelectedPin} />
        )}

        {/* <Source
          id="earthquakes"
          type="geojson"
          data={featureCollection}
          // cluster={false}
          // clusterMaxZoom={14}
          // clusterRadius={50}
        >
        <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} /> 
          <Layer {...unclusteredPointLayer} />
          <Layer {...chargingPlugsCount} />
        </Source> 
        */}
      </Map>
    </div>
  );
};
