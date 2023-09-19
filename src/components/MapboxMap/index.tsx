"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import * as React from "react";
import Map from "react-map-gl";

export const MapboxMap = () => {
  return (
    <div
     className="flex flex-grow"
    >
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          latitude: 38.88,
          longitude: -98,
          zoom: 4,
        }}
        
        mapStyle="mapbox://styles/mapbox/light-v11"
        projection={{ name: "mercator" }}
      />
    </div>
  );
};
