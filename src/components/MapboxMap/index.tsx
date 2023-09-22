"use client";
import { usePinsStore } from "@store/pins";
import "mapbox-gl/dist/mapbox-gl.css";
import * as React from "react";
import { useMemo } from "react";
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
import { Pin, PinPopup } from "@components/PinPopup";

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
            onClick={(e: MapMouseEvent) => {
              // If we let the click event propagates to the map, it will immediately close the popup
              // with `closeOnClick: true`
              e.originalEvent.stopPropagation();
              // setPopupInfo(city);
              console.log("pin", pin);
              setSelectedPin(pin);
            }}
            className="cursor-pointer"
          ></Marker>
        );
      })
    : [];

  return (
    <div className="flex flex-grow">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          latitude: 38.88,
          longitude: -98,
          zoom: 4,
        }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        projection={{ name: "mercator" }}
      >
        {evPins}
        {selectedPin && (
          <PinPopup pin={selectedPin} setSelectedPin={setSelectedPin} />
        )}
      </Map>
    </div>
  );
};
