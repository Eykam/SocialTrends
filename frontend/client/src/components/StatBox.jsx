import { Box, Typography } from "@mui/material";
import { tokens } from "../theme";

const StatBox = ({ title, subtitle, icon }) => {
  const colors = tokens;

  return (
    <Box width="100%" m="0 30px">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: colors.blueAccent[400], textAlign: "center" }}
          >
            {subtitle}
          </Typography>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.tanAccent[500] }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StatBox;
