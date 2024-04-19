import React, { useState, useEffect } from "react";
import { Container, Table } from "@mantine/core";

const Gamma = ({ wineData }) => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    if (wineData.length > 0) {
      calculateStats();
    }
  }, [wineData]);

  /**
   * Calculates the gamma value for a given wine.
   * returns The calculated gamma value.
   */
  const calculateGamma = (wine) => {
    return (wine.Ash * wine.Hue) / wine.Magnesium;
  };

  /**
   * Calculates the mean of an array of numbers.
   * returns the mean value
   */
  const calculateMean = (values) => {
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  };

  /**
   * Calculates the median value of an array of numbers.
   *returns a number which is the calculated median value.
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
   * returns the mode value, or null if the array is empty or contains only unique values.
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
    Sets the gammaStats state with an array of objects containing the class name, mean, median, and mode 
    of the gamma values for each class.
   */
  const calculateStats = () => {
    const classes = [...new Set(wineData.map((wine) => wine.Alcohol))];
    const gammaStats = classes.map((className) => {
      const classGamma = wineData
        .filter((wine) => wine.Alcohol === className)
        .map((wine) => calculateGamma(wine));
      const mean = calculateMean(classGamma);
      const median = calculateMedian(classGamma);
      const mode = calculateMode(classGamma);
      return { className, mean, median, mode };
    });
    setStats(gammaStats);
  };

  return (
    <>
      <h2>Gamma Statistics</h2>
      <Container size="xs">
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
              <Table.Td>Gamma Mean</Table.Td>
              {stats.map((stat) => (
                <Table.Td key={stat.className}>{stat.mean.toFixed(3)}</Table.Td>
              ))}
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Gamma Median</Table.Td>
              {stats.map((stat) => (
                <Table.Td key={stat.className}>
                  {stat.median.toFixed(3)}
                </Table.Td>
              ))}
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Gamma Mode</Table.Td>
              {stats.map((stat) => (
                <Table.Td key={stat.className}>
                  {stat.mode !== null && stat.mode !== undefined
                    ? parseFloat(stat.mode).toFixed(3)
                    : stat.mode}
                </Table.Td>
              ))}
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Container>
    </>
  );
};

export default Gamma;
