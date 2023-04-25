import React, { useMemo, useRef } from "react";
import { useCallback } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Places from "./places";
import Distance from "./distance";
import "./globals.css";

const Map = () => {
  const center = useMemo(() => ({ lat: 43, lng: -80 }), []);
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      mapId: "b181cac70f27f5e6",
    }),
    []
  );
  const mapRef = useRef();

  const onLoad = useCallback((map) => (mapRef.current = map), []);
  return (
    <GoogleMap
      zoom={2}
      center={center}
      mapContainerClassName="map-container"
      options={options}
      onLoad={onLoad}
    />
  );
};

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

const generateHouses = (position) => {
  const _houses = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2;
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _houses;
};

export default Map;
