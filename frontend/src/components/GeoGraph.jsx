import { ResponsiveChoropleth } from "@nivo/geo";
import { tokens } from "../theme";
import { Box, Typography } from "@mui/material";
import { geoFeatures } from "../data/geoFeatures";
import { useQuery } from "@tanstack/react-query";
import { geoData } from "../data/data";

const GeoGraph = () => {
  const colors = tokens;

  const setStyles = () => {
    // const height = window.screen.availHeight;
    const width = window.screen.availWidth;
    let zoom;
    let legendHeight;
    let legendWidth;
    let translate;

    if (width < 1920) {
      zoom = 60;
      legendWidth = 80;
      legendHeight = 14;
    } else {
      zoom = 100;
      legendWidth = 94;
      legendHeight = 18;
    }

    return {
      zoom: zoom,
      legendHeight: legendHeight,
      legendWidth: legendWidth,
      translate: translate,
    };
  };

  const styles = setStyles();
  console.log(styles);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["geoData"],
    queryFn: geoData,
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
        Views by Region
      </h2>

      <ResponsiveChoropleth
        translateY={styles.tr}
        data={data}
        features={geoFeatures.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="YlGnBu"
        domain={[0, 1000000]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionTranslation={[0.5, 0.6]}
        projectionRotation={[0, 0, 0]}
        projectionScale={styles.zoom}
        enableGraticule={false}
        graticuleLineColor="#dddddd"
        borderWidth={1}
        borderColor={colors.tanAccent[700]}
        legends={[
          {
            anchor: "bottom-left",
            direction: "column",
            justify: true,
            translateX: 0,
            translateY: -50,
            itemsSpacing: 0,
            itemWidth: styles.legendWidth,
            itemHeight: styles.legendHeight,
            itemDirection: "left-to-right",
            itemTextColor: colors.tanAccent[500],
            itemOpacity: 0.85,
            symbolSize: 18,
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000000",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </Box>
  );
};

export default GeoGraph;
