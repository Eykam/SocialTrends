import { useQuery } from "@tanstack/react-query";
import { metricQueries } from "../data/data";
import { tokens } from "../theme";
import { Box, Typography } from "@mui/material";
import StatBox from "./StatBox";
import PercentageArrow from "./PercentageArrow";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Metric = ({ query }) => {
  const colors = tokens;

  let { isLoading, isError, data, error } = useQuery({
    queryKey: [query],
    queryFn: metricQueries[query]["query"],
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

  // let avg;
  if (query === "avgNewPosts") {
    // avg = data["avgnewposts"];
    data = parseInt(data["average_count"]);
  } else if (query === "avgNewUsers") {
    // avg = data["avgnewusers"];
    data = parseInt(data["average_count"]);
  }

  const setPercentage = () => {
    if (query === "avgNewUsers" || query === "avgNewPosts") {
      // const percentage = data / avg;
      data = data.toLocaleString("en-US");

      return (
        <Box>
          {metricQueries[query]["subtitle"]}
          {/* <PercentageArrow percentage={percentage} /> */}
        </Box>
      );
    } else {
      return <Box> {metricQueries[query]["subtitle"]} </Box>;
    }
  };

  return (
    <StatBox
      subtitle={setPercentage()}
      title={data}
      icon={
        <PersonAddIcon
          sx={{ color: colors.grayAccent[600], fontSize: "26px" }}
        />
      }
    />
  );
};

export default Metric;
