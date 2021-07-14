import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
import styled from "styled-components";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

// Draw circles on the map with interactive tooltip
export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <InfoContainer>
          <InfoFlag
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <InfoName>{country.country}</InfoName>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </InfoContainer>
      </Popup>
    </Circle>
  ));

const InfoContainer = styled.div`
  width: 150px;

  .info-confirmed,
  .info-recovered,
  .info-deaths {
    font-size: 16px;
    margin-top: 5px;
  }
`;

const InfoFlag = styled.div`
  height: 80px;
  width: 100%;
  background-size: cover;
  border-radius: 8px;

  img {
    width: 100px;
    border-radius: 5px;
  }
`;

const InfoName = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #555;
`;
