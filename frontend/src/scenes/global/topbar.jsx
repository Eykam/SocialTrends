import { Box, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  const colors = tokens;

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* Search Bar */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase
          sx={{ ml: 2, flex: 1, color: colors.tanAccent[500] }}
          placeholder="Search"
        />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon sx={{ color: colors.tanAccent[500] }} />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <a href="/construction">
          <IconButton>
            <NotificationsOutlinedIcon sx={{ color: colors.tanAccent[500] }} />
          </IconButton>
        </a>

        <a href="/construction">
          <IconButton>
            <SettingsOutlinedIcon sx={{ color: colors.tanAccent[500] }} />
          </IconButton>
        </a>

        <a href="/construction">
          <IconButton>
            <PersonOutlinedIcon sx={{ color: colors.tanAccent[500] }} />
          </IconButton>
        </a>
      </Box>
    </Box>
  );
};

export default Topbar;
