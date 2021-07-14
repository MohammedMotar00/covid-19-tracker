import React from "react";
import styled from "styled-components";
import { MapContainer, TileLayer } from "react-leaflet";

function Map() {
  return (
    <div>
      <MapContainer>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
}

export default Map;
