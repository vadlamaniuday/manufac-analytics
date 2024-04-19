import { Table, Paper, Text } from "@mantine/core";
import React, { useState, useEffect } from "react";

function Flavanoids({ wineData }) {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    if (wineData.length > 0) {
      calculateStats();
    }
  }, [wineData]);

  /**
   * Calculates the mean of an array of numbers.
   */
  const calculateMean = (values) => {
    const sum = values.reduce((acc, val) => acc + val, 0);
    const mean = sum / values.length;
    return mean.toFixed(3);
  };

  /**
 * Calculates the median value of an array of numbers.

 */
  const calculateMedian = (values) => {
    const sortedValues = values.sort((a, b) => a - b);
    const mid = Math.floor(sortedValues.length / 2);
    if (sortedValues.length % 2 === 0) {
      return (sortedValues[mid - 1] + sortedValues[mid]) / 2;
    } else {
      return sortedValues[mid];
    }
  };

  /**
   * Calculates the mode of an array of values.
   */
  const calculateMode = (values) => {
    const counts = {};
    values.forEach((value) => {
      counts[value] = (counts[value] || 0) + 1;
    });
    let mode = null;
    let maxCount = 0;
    Object.entries(counts).forEach(([value, count]) => {
      if (count > maxCount) {
        mode = value;
        maxCount = count;
      }
    });
    return mode;
  };

  /**
   * Calculates statistics for each class of alcohol in the wineData array.
   *
    Updates the stats state with an array of objects containing the class name, mean, median, and mode 
    of the flavanoids values for each class.
   */
  const calculateStats = () => {
    const classes = [...new Set(wineData.map((wine) => wine.Alcohol))];
    const flavanoidsStats = classes.map((className) => {
      const classFlavanoids = wineData
        .filter((wine) => wine.Alcohol === className)
        .map((wine) => parseFloat(wine.Flavanoids));
      const mean = calculateMean(classFlavanoids);
      const median = calculateMedian(classFlavanoids);
      const mode = calculateMode(classFlavanoids);
      return { className, mean, median, mode };
    });
    setStats(flavanoidsStats);
  };

  return (
    <>
      <h2>Flavanoids Statistics</h2>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Measure</Table.Th>
            {stats.map((stat) => (
              <Table.Th key={stat.className}>Class {stat.className}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>Flavanoids Mean</Table.Td>
            {stats.map((stat) => (
              <Table.Td key={stat.className}>{stat.mean}</Table.Td>
            ))}
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Flavanoids Median</Table.Td>
            {stats.map((stat) => (
              <Table.Td key={stat.className}>{stat.median}</Table.Td>
            ))}
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Flavanoids Mode</Table.Td>
            {stats.map((stat) => (
              <Table.Td key={stat.className}>{stat.mode}</Table.Td>
            ))}
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </>
  );
}

export default Flavanoids;
