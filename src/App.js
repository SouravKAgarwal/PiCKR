import Colors from "./components/Colors";
import ColorPalette from "./components/ColorPalette";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ColorsDisplay from "./components/ColorsDisplay";
import Home from "./components/Home";
import ErrorComponent from "./components/ErrorComponent";
import ColorInfo from "./components/ColorInfo";
import ColorShades from "./components/ColorShades";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <div className="relative bg-[#F5F1E8]">
        <div className="absolute inset-0 bg-white/75" />
        <div className="relative">
          <BrowserRouter>
            <Header />
            <Routes>
              <Route exact path="/color/:type/:color" element={<ColorInfo />} />
              <Route exact path="/" element={<Home />} />
              <Route exact path="/color/shades" element={<ColorsDisplay />} />
              <Route exact path="/color" element={<Colors />} />
              <Route
                exact
                path={`/color/shades/:type/:mode/:color`}
                element={<ColorShades />}
              />
              <Route exact path="/color/palette" element={<ColorPalette />} />
              <Route
                path="*"
                element={
                  <ErrorComponent
                    errorCode="404"
                    errorMessage="Page Not Found!"
                  />
                }
              />
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
