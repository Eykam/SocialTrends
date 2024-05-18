import ConstructionOutlineIcon from "@mui/icons-material/ConstructionOutlined";
import { Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
const Construction = () => {
  const colors = tokens;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <ConstructionOutlineIcon
        color={colors.tanAccent[500]}
        sx={{
          height: "150px",
          width: "150px",
          display: "block",
          position: "inherit",
          left: "50%",
          top: "-75%",
          transform: "translateX(-50%)",
        }}
      />

      <Typography
        variant="h1"
        color={colors.tanAccent[500]}
        marginBottom="10%"
        marginTop="10%"
        sx={{
          display: "block",
        }}
      >
        Sorry, this page is under construction
      </Typography>

      <Box
        boxShadow="7"
        width="50%"
        sx={{
          display: "block",
          position: "inherit",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Link to="/">
          <Button
            fullWidth
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.tanAccent[500],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            Back to Dashboard
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default Construction;
