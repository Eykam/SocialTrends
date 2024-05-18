import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { popularPosts } from "../data/data";
import { useQuery } from "@tanstack/react-query";

const PostTable = () => {
  const colors = tokens;
  const columns = [
    {
      field: "Post ID",
      headerName: "Post ID",
      flex: 1,
      renderCell: (params) => {
        return (
          <a
            href={
              "https://tiktok.com/@" +
              params.row.username +
              "/video/" +
              params.row["Post ID"]
            }
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: colors.tanAccent[500] }}
          >
            {params.row["Post ID"]}
          </a>
        );
      },
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      renderCell: ({ row: { username } }) => {
        return (
          <a
            href={"https://tiktok.com/@" + username}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: colors.tanAccent[500] }}
          >
            {username}
          </a>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "Length (seconds)",
      headerName: "Length (seconds)",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "song",
      headerName: "Song",
      flex: 1,
    },
    {
      field: "plays",
      headerName: "Plays",
      flex: 1,
    },
    {
      field: "comments",
      headerName: "Comments",
      flex: 1,
    },
    {
      field: "diggs",
      headerName: "Diggs",
      flex: 1,
    },
    {
      field: "shares",
      headerName: "Shares",
      flex: 1,
    },
    {
      field: "hashtags",
      headerName: "Hashtags",
      flex: 1,
    },
    {
      field: "Created At",
      headerName: "Created At",
      flex: 1,
    },
  ];

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["popularPosts"],
    queryFn: popularPosts,
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
        Popular Posts
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
          getRowId={(row) => row["Post ID"]}
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default PostTable;
