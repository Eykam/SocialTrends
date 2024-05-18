import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { postTimes } from "../data/data";

const BarChart = () => {
  const colors = tokens;

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["postTimes"],
    queryFn: postTimes,
  });

  const formattedData = useMemo(() => {
    if (data) {
      return data.map((dataPoint) => {
        return {
          id: dataPoint.id,
          value: parseFloat(dataPoint.value),
        };
      });
    }
  }, [data]);

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
        Most Popular Times to Post (EST)
      </h2>

      <Box height="95%">
        <ResponsiveBar
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
          margin={{ top: 20, right: 20, bottom: 70, left: 70 }}
          padding={0.3}
          groupMode="grouped"
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          valueFormat=" >-.3%"
          colors={{ scheme: "set2" }}
          colorBy="id"
          borderColor={{ theme: "background" }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 90,
            legend: "Hour of Day",
            legendPosition: "middle",
            legendOffset: 32,
            color: colors.tanAccent["500"],
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Percentage of all Posts",
            legendPosition: "middle",
            legendOffset: -50,
            format: (value) => (value * 100).toFixed(2),
          }}
          enableLabel={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          legends={[]}
          role="application"
          isFocusable={true}
          ariaLabel="Post Times"
        />
      </Box>
    </Box>
  );
};

export default BarChart;
