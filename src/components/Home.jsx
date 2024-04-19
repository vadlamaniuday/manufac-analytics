import React, { useState, useEffect } from "react";
import Flavanoids from "./Flavanoids";
import Gamma from "./Gamma";
import { Container, Center, Paper } from "@mantine/core";
function Home() {
  const [wineData, setWineData] = useState([]);

  /**
   * Fetches data from "/Wine-Data.json" and sets the retrieved data in the state.
   */

  const fetchData = async () => {
    try {
      const response = await fetch("/Wine-Data.json");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setWineData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Center>
        <h1>Manufac Analytics Assignment : Wine Analysis</h1>
      </Center>
      <Container
        size="xs"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Paper shadow="xs" radius="xl" withBorder p="xl">
          <Flavanoids wineData={wineData} />
        </Paper>
      </Container>
      <Container
        size="xs"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Paper shadow="xs" radius="xl" withBorder p="xl">
          <Gamma wineData={wineData} />
        </Paper>
      </Container>
    </>
  );
}

export default Home;
