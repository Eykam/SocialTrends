import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { engagingUsers } from "../data/data";
import { useQuery } from "@tanstack/react-query";

const UserTable = () => {
  const colors = tokens;
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "uniqueid",
      headerName: "Username",
      flex: 1,
      renderCell: ({ row: { uniqueid } }) => {
        return (
          <a
            href={"https://tiktok.com/@" + uniqueid}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: colors.tanAccent[500] }}
          >
            {uniqueid}
          </a>
        );
      },
    },
    {
      field: "followercount",
      headerName: "Follower Count",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "followingcount",
      headerName: "Following Count",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "heartcount",
      headerName: "Total Likes",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "videocount",
      headerName: "Total Videos",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
  ];

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["engagingUsers"],
    queryFn: engagingUsers,
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
    <Box height="100%" width="97%">
      <h2 style={{ color: colors.tanAccent[500], margin: "5px" }}>
        Engaging Users
      </h2>

      <Box
        m="0"
        height="90%"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            color: colors.tanAccent[500],
          },
          "& .MuiDataGrid": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeader": {
            background: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiToolbar-root": {
            color: colors.tanAccent[500],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.tanAccent[500]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default UserTable;
