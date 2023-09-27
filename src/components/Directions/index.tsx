"use client";
import { useDirectionsStore } from "@store/directions";
import * as React from "react";
import { Source, Layer, LayerProps } from "react-map-gl";

export const Directions = () => {
  const route = useDirectionsStore((state) => state.route);
  const [showDirections, setShowDirections] = React.useState(true);
  console.log("route", route);

  React.useEffect(() => {
    if (route && route.length > 0) {
      setShowDirections(true);
    }
  }, [route]);

  if (!route || route.length === 0) return null;

  const data = route[0] as any;
  const steps = data.legs[0].steps;

  const Instructions = () => (
    <div>
      <div
        className="absolute top-0 right-0 p-2 cursor-pointer"
        onClick={() => {
          setShowDirections(false);
        }}
      >
        <img src="/icons/close.svg" alt="" width={30} />
      </div>
      <strong>Trip duration: {Math.floor(data.duration / 60)} </strong>
      <div>
        <ol>
          {steps.map((step: any, key: number) => (
            <li key={step.maneuver.instruction}>
              {key + 1}. {step.maneuver.instruction}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );

  const geometry = route[0] || [];
  const featureCollection: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: [],
  };
  featureCollection.features.push(geometry);
  const routeLayer: LayerProps = {
    id: "route",
    type: "line",
    source: "route",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#888",
      "line-width": 8,
    },
  };

  if (!showDirections) return null;
  return (
    <>
      <Source id="route" type="geojson" data={featureCollection}>
        <Layer {...routeLayer} />
      </Source>
      <div className="flex flex-col max-w-[250px] absolute z-10 right-2 top-2 p-2 bg-white rounded-lg">
        <Instructions />
      </div>
    </>
  );
};
