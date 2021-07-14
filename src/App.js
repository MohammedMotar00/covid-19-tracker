import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
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

import { sortData } from "./util";
import LineGraph from "./components/LineGraph";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

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
        setCountryInfo(data);
      });
  };

  return (
    <AppContainer>
      {/* Header */}
      {/* title + select input dropdown field */}
      <AppLeft>
        <AppHeader>
          <h1>Covid-19 Tracker</h1>
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
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </AppStats>
        <Map />
      </AppLeft>

      {/* Map */}

      <AppRight>
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
        </CardContent>
        <LineGraph />
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

const AppDropdown = styled(FormControl)``;
const AppLeft = styled.div`
  flex: 0.9;
`;
const AppRight = styled(Card)``;

const AppHeader = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const AppStats = styled.div`
  display: flex;
  justify-content: space-between;
`;
