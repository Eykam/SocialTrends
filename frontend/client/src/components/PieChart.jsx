import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { commonHashtags } from "../data/data";

const PieChart = () => {
  const colors = tokens;

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["commonHashtags"],
    queryFn: commonHashtags,
  });

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
        Most Common Hashtags
      </h2>

      <ResponsivePie
        data={data}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.tanAccent[500],
              },
            },
          },
          ticks: {
            line: {
              stroke: colors.tanAccent[500],
              strokeWidth: 1,
            },
            text: {
              fill: colors.tanAccent[500],
            },
          },
        }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        valueFormat=" >-.3p"
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "green_blue" }}
        borderWidth={1}
        borderColor={{ theme: "background" }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#f8f4ca"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsTextColor={colors.primary["500"]}
        legends={[]}
      />
    </Box>
  );
};

export default PieChart;
