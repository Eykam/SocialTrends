import { Typography, Box } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const colors = tokens;

  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.blueAccent[400]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>

      <Typography variant="h5" color={colors.tanAccent[500]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
