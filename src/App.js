import React, { useEffect, useState } from "react";
import "./App.css";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";

import styled from "styled-components";

import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";

import { prettyPrintStat, sortData } from "./util";
import LineGraph from "./components/LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountiresData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };

    getCountiresData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <AppContainer>
      {/* Header */}
      {/* title + select input dropdown field */}
      <AppLeft>
        <AppHeader>
          <h1>COVID-19 TRACKER</h1>
          <AppDropdown>
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>

              {/* Loop through all the countries and show a drop down */}
              {countries.map((country) => (
                <MenuItem key={country.name} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </AppDropdown>
        </AppHeader>

        <AppStats>
          <InfoBox
            isRed
            title="Coronavirus Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={countryInfo.cases}
            onClick={(e) => setCasesType("cases")}
            active={casesType === "cases"}
          />
          <InfoBox
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={countryInfo.recovered}
            onClick={(e) => setCasesType("recovered")}
            active={casesType === "recovered"}
          />
          <InfoBox
            isRed
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={countryInfo.deaths}
            onClick={(e) => setCasesType("deaths")}
            active={casesType === "deaths"}
          />
        </AppStats>
        <Map
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
          casesType={casesType}
        />
      </AppLeft>

      {/* Map */}

      <AppRight>
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3 style={{ marginTop: "20px", marginBottom: "20px" }}>
            Worldwide new {casesType}{" "}
          </h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </AppRight>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 20px;

  @media (max-width: 990px) {
    flex-direction: column;
  }
`;

const AppDropdown = styled(FormControl)`
  background-color: white;
`;

const AppLeft = styled.div`
  flex: 0.9;
`;

const AppRight = styled(Card)`
  display: flex;
  flex-direction: column;

  .MuiCardContent-root {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
`;

const AppHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    font-size: 2rem;
    color: #9c0000;
  }

  @media (max-width: 500px) {
    h1 {
      font-size: 1.5rem;
    }
  }
`;

const AppStats = styled.div`
  display: flex;
  justify-content: space-between;
`;
