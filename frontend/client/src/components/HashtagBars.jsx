import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { commonHashtags } from "../data/data";
import { isMobile } from "react-device-detect";

const HashtagBars = () => {
  const colors = tokens;

  const formatNumber = (value) => {
    if (value >= 1e9) {
      return `${(value / 1e9).toFixed(1)}B`;
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(1)}M`;
    } else if (value >= 1e3) {
      return `${(value / 1e3).toFixed(1)}k`;
    } else {
      return value.toString();
    }
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["commonHashtags"],
    queryFn: commonHashtags,
  });

  const formattedPercentageData = useMemo(() => {
    if (data) {
      const sortedData = [...data].sort(
        (a, b) => parseFloat(a.percentage) - parseFloat(b.percentage)
      ); // Ensure sorting is descending
      return sortedData.map((dataPoint) => ({
        id: dataPoint.id.replace(/\"/gm, ""),
        value: parseFloat(dataPoint.percentage),
      }));
    }
  }, [data]);

  const formattedViewsData = useMemo(() => {
    if (data) {
      const sortedData = [...data].sort(
        (a, b) => parseFloat(a.totalplaycount) - parseFloat(b.totalplaycount)
      ); // Ensure sorting is descending
      return sortedData.map((dataPoint) => ({
        id: dataPoint.id.replace(/\"/gm, ""),
        value: parseFloat(dataPoint.totalplaycount),
      }));
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
      {isMobile && (
        <h2 style={{ color: colors.tanAccent[500], margin: "5px" }}>
          Most Popular Hashtags
        </h2>
      )}

      <Box
        height="95%"
        width="100%"
        display="flex"
        justifyContent="space-evenly"
      >
        <Box height="95%" width="45%">
          <h3
            style={{
              color: colors.tanAccent[500],
              margin: "5px",
              textAlign: "center",
            }}
          >
            % of Posts w/ Tag
          </h3>
          <ResponsiveBar
            data={formattedPercentageData}
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
            layout="horizontal"
            margin={{ top: 20, bottom: 70, left: 80 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            valueFormat=" >-.3%"
            colors={{ scheme: "set2" }}
            colorBy="id"
            borderColor={{ theme: "background" }}
            axisTop={null}
            axisRight={null}
            axisBottom={
              isMobile
                ? null
                : {
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "% of Posts Containing Hashtag",
                    legendPosition: "middle",
                    legendOffset: 32,
                    color: colors.tanAccent["500"],
                    format: (value) => {
                      return (value * 100).toFixed(0);
                    },
                  }
            }
            axisLeft={{
              tickSize: 1,
              tickPadding: 5,
              tickRotation: 0,
              legendPosition: "middle",
              legendOffset: -50,
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

        <Box height="95%" width="45%">
          {isMobile && (
            <h3
              style={{
                color: colors.tanAccent[500],
                margin: "5px",
                textAlign: "center",
              }}
            >
              Total Play Count
            </h3>
          )}

          <ResponsiveBar
            data={formattedViewsData}
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
            colors={[colors.blueAccent[200]]}
            layout="horizontal"
            margin={{ top: 20, bottom: 70, left: 80, right: 10 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            valueFormat={(value) => formatNumber(value)}
            colorBy="id"
            borderColor={{ theme: "background" }}
            axisTop={null}
            axisRight={null}
            axisBottom={
              isMobile
                ? null
                : {
                    tickValues: 4,
                    tickSize: 1,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Play Count",
                    legendPosition: "middle",
                    legendOffset: 32,
                    color: colors.tanAccent["500"],
                    format: formatNumber,
                  }
            }
            axisLeft={{
              tickSize: 1,
              tickPadding: 5,
              tickRotation: 0,
              legendPosition: "middle",
              legendOffset: -50,
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
    </Box>
  );
};

export default HashtagBars;
