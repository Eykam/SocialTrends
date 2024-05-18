import { ResponsiveLine } from "@nivo/line";
import { Box, Typography } from "@mui/material";
import { metricQueries } from "../data/data";
import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { tokens } from "../theme";

const LineChart = ({ query }) => {
  const colors = tokens;

  const formatYAxis = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`; // Convert to 'k' for thousands
    }
    return value.toString(); // Return the original value for numbers < 1000
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: [query],
    queryFn: metricQueries[query]["query"],
  });

  const formattedData = useMemo(() => {
    if (data) {
      return [
        {
          id: "postsByHour", // Or any identifier for this series
          data: data.map((dataPoint) => ({
            x: new Date(dataPoint.truncated_day),
            y: parseInt(dataPoint.count, 10),
          })),
        },
      ];
    } else {
      return [];
    }
  }, [data]);

  useEffect(() => {
    console.log("formattedData", formattedData);
  }, [formattedData]);

  if (isLoading) {
    return (
      <Typography variant="h5" color={colors.tanAccent[500]}>
        Loading...
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography variant="h5" color={colors.tanAccent[500]}>
        Error: {error.message}
      </Typography>
    );
  }

  return (
    <Box height="100%" width="95%">
      <h2 style={{ color: colors.tanAccent[500], margin: "5px" }}>
        {metricQueries[query]["subtitle"]}
      </h2>

      <Box height="95%">
        <ResponsiveLine
          data={formattedData}
          theme={{
            axis: {
              ticks: {
                text: {
                  fill: colors.tanAccent["500"],
                },
              },
              legend: {
                text: {
                  fontSize: "14px",
                  fill: colors.tanAccent["500"],
                },
              },
            },
          }}
          colors={[
            query === "postsByDay"
              ? colors.yellowAccent[400]
              : colors.blueAccent[200],
          ]}
          margin={{ top: 20, right: 50, bottom: 70, left: 70 }}
          xScale={{
            type: "time",
            format: "native", // Use "native" because we converted dates to Date objects
            precision: "day", // Adjust based on your data's granularity
          }}
          xFormat="time:%Y-%m-%d"
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat={(value) => formatYAxis(value)}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: "%Y-%m-%d",
            tickValues: "every 4 day",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Date",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "New Post Count",
            legendOffset: -50,
            legendPosition: "middle",
            format: formatYAxis,
          }}
          lineWidth={5}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          enableArea={true}
          useMesh={true}
        />
      </Box>
    </Box>
  );
};

export default LineChart;
