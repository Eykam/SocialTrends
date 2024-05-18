import { useCustomTheme } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Topbar from "./scenes/global/topbar";
import Dashboard from "./scenes/dashboard/dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Construction from "./scenes/global/construction";

function App() {
  const theme = useCustomTheme();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60, // 1 hour
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <main className="content">
          {/* <Topbar /> */}
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/construction" element={<Construction />} />
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
