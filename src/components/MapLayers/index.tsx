import type { LayerProps } from "react-map-gl";

export const clusterLayer: LayerProps = {
  id: "clusters",
  type: "circle",
  source: "earthquakes",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#51bbd6",
      100,
      "#f1f075",
      750,
      "#f28cb1",
    ],
    "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
  },
};

export const clusterCountLayer: LayerProps = {
  id: "cluster-count",
  type: "symbol",
  source: "earthquakes",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};

export const unclusteredPointLayer: LayerProps = {
  id: "unclustered-point",
  type: "circle",
  source: "earthquakes",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#11b4da",
    "circle-radius": 12,
    "circle-stroke-width": 2,
    "circle-stroke-color": "#fff",
  },
};

export const chargingPlugsCount: LayerProps = {
  id: "cluster-count",
  type: "symbol",
  source: "earthquakes",
  filter: ["!", ["has", "point_count"]],
  layout: {
    "text-field": ["get", "charging_plugs_count"],
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 13,
    "text-allow-overlap": true,
    // ?bold
  },
  paint: {
    "text-color": "#ffffff",
  },
};