import { Box, Button } from "@mui/material";
import Metric from "../../components/Metric";
import { tokens } from "../../theme";
import { BrowserView, MobileView } from "react-device-detect";
import Header from "../../components/Header";
import UserTable from "../../components/UserTable";
import PostTable from "../../components/PostTable";
import PieChart from "../../components/PieChart";
import BarChart from "../../components/BarChart";
import GeoGraph from "../../components/GeoGraph";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const colors = tokens;

  return (
    <>
      <BrowserView>
        <Box m="20px">
          {/* Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header
              title="Dashboard"
              subtitle="Here's an example of how our data can be used"
            />

            {/* Download Report Button */}
            <Box boxShadow="7">
              <Link to="/construction" style={{ textDecoration: "none" }}>
                <Button
                  className="download"
                  sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.tanAccent[500],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                  }}
                >
                  <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                  Download Reports
                </Button>
              </Link>
            </Box>
          </Box>

          {/* GRID */}
          <Box
            display="grid"
            gridTemplateColumns="repeat(15,1fr)"
            gridAutoRows="140px"
            gap="20px"
          >
            {/* Row 1 */}

            {/* Total Posts */}

            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
              boxShadow="7"
            >
              <Metric query="totalUniquePosts" />
            </Box>

            {/* Total Users */}

            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
              boxShadow="7"
            >
              <Metric query="totalUniqueUsers" />
            </Box>

            {/* AvgDescriptionLength */}

            <Box
              gridColumn="span 3"
              gridRow="span 1"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
              boxShadow="7"
            >
              <Metric query="avgDescriptionLength" />
            </Box>

            {/* Post Times BarChart */}
            <Box
              gridColumn="span 6"
              gridRow="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
              boxShadow="7"
            >
              <BarChart />
            </Box>

            {/* New Posts */}

            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
              boxShadow="7"
            >
              <Metric query="avgNewPosts" />
            </Box>

            {/* New Users */}

            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
              boxShadow="7"
            >
              <Metric query="avgNewUsers" />
            </Box>

            {/* AvgVideoLength */}
            <Box
              gridColumn="span 3"
              gridRow="span 1"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
              boxShadow="7"
            >
              <Metric query="avgVideoLengths" />
            </Box>

            {/* Row 2 */}

            {/* GeoData map*/}
            <Box
              gridColumn="span 5"
              gridRow="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
              boxShadow="7"
            >
              <GeoGraph />
            </Box>

            {/* Hashtag Pie Chart */}
            <Box
              gridColumn="span 4"
              gridRow="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
              boxShadow="7"
            >
              <PieChart />
            </Box>

            {/* Engaging Users Table */}
            <Box
              gridColumn="span 6"
              gridRow="span 5"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
              boxShadow="7"
            >
              <UserTable />
            </Box>

            {/* Post Table*/}
            <Box
              gridColumn="span 9"
              gridRow="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
              boxShadow="7"
            >
              <PostTable />
            </Box>

            {/* Footer */}
            <Box
              gridColumn="span 15"
              gridRow="span .1"
              backgroundColor={colors.backgroundColor}
              display="flex"
              alignItems="center"
              justifyContent="center"
            ></Box>
          </Box>
        </Box>
      </BrowserView>
      {/* Mobile View */}
      {/*------------------------------------------------------------------------------------------------------------------------------------------------------ */}
      <MobileView>
        <Box m="20px">
          {/* Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header
              title="Dashboard"
              subtitle="Here's an example of how our data can be used"
            />

            {/* Download Report Button */}
            <Link to="/construction" style={{ textDecoration: "none" }}>
              <Box boxShadow="7">
                <Button
                  sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.tanAccent[500],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                  }}
                >
                  <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                  Download Reports
                </Button>
              </Box>
            </Link>
          </Box>

          {/* GRID */}
          <Box
            display="grid"
            gridTemplateColumns="repeat(4,1fr)"
            gridAutoRows="140px"
            gap="20px"
            marginBottom="20px"
          >
            {/* Row 1 */}

            {/* Total Posts */}

            <Box
              gridColumn="span 4"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
              boxShadow="7"
            >
              <Metric query="totalUniquePosts" />
            </Box>

            {/* New Posts */}

            <Box
              gridColumn="span 4"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
              boxShadow="7"
            >
              <Metric query="avgNewPosts" />
            </Box>

            {/* Total Users */}

            <Box
              gridColumn="span 4"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
              boxShadow="7"
            >
              <Metric query="totalUniqueUsers" />
            </Box>

            {/* New Users */}

            <Box
              gridColumn="span 4"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
              boxShadow="7"
            >
              <Metric query="avgNewUsers" />
            </Box>

            {/* AvgDescriptionLength */}

            <Box
              gridColumn="span 4"
              gridRow="span 1"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
              boxShadow="7"
            >
              <Metric query="avgDescriptionLength" />
            </Box>

            {/* AvgVideoLength */}
            <Box
              gridColumn="span 4"
              gridRow="span 1"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
              boxShadow="7"
            >
              <Metric query="avgVideoLengths" />
            </Box>

            {/* Post Times BarChart */}
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
              boxShadow="7"
            >
              <BarChart />
            </Box>

            {/* GeoData map*/}
            <Box
              gridColumn="span 4"
              gridRow="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
              boxShadow="7"
            >
              <GeoGraph />
            </Box>

            {/* Hashtag Pie Chart */}
            <Box
              gridColumn="span 4"
              gridRow="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
              boxShadow="7"
            >
              <PieChart />
            </Box>

            {/* Engaging Users Table */}
            <Box
              gridColumn="span 4"
              gridRow="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
              boxShadow="7"
            >
              <UserTable />
            </Box>

            {/* Post Table*/}
            <Box
              gridColumn="span 4"
              gridRow="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
              boxShadow="7"
            >
              <PostTable />
            </Box>

            {/* Footer */}
            <Box
              gridColumn="span 4"
              gridRow="span .1"
              backgroundColor={colors.backgroundColor}
              display="flex"
              alignItems="center"
              justifyContent="center"
            ></Box>
          </Box>
        </Box>
      </MobileView>
    </>
  );
};

export default Dashboard;
