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
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import { Pin, PinPopup } from "@components/PinPopup";
import { Geocoder } from "@components/GeocoderControl";

export const MapboxMap = () => {
  const pins = usePinsStore((state) => state.pins);
  const [selectedPin, setSelectedPin] = React.useState<Pin>();

  React.useEffect(() => {
    console.log("MapboxMap mounted");
    return () => {
      console.log("MapboxMap unmounted");
    };
  }, []);

  const evPins = pins
    ? pins.map((pin: Pin, index) => {
        return (
          <Marker
            key={`marker-${index}`}
            longitude={pin.longitude}
            latitude={pin.latitude}
            anchor="bottom"
            onClick={() => {
              // If we let the click event propagates to the map, it will immediately close the popup
              // with `closeOnClick: true`
              // setPopupInfo(city);
              console.log("pin", pin);
              setSelectedPin(pin);
            }}
          ></Marker>
        );
      })
    : [];

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
      </Map>
    </div>
  );
};
