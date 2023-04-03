import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import KeyboardDoubleArrowDownOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";
import { Box, Typography } from "@mui/material";

const PercentageArrow = (percentage) => {
  let up;
  let arrowColor;

  if (percentage["percentage"] >= 1) {
    up = true;
    arrowColor = "#33FFCB";
  } else {
    up = false;
    arrowColor = "#FF3333";
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {up && (
        <KeyboardDoubleArrowUpOutlinedIcon
          sx={{ height: "60px", width: "60px", color: arrowColor }}
        />
      )}

      {!up && (
        <KeyboardDoubleArrowDownOutlinedIcon
          sx={{ height: "60px", width: "60px", color: arrowColor }}
        />
      )}

      <Typography variant="h5" fontWeight="bold" color={arrowColor}>
        {(percentage["percentage"] * 100).toFixed(2) + "%"}
      </Typography>
    </Box>
  );
};

export default PercentageArrow;
