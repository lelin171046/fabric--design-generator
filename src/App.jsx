import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import FabricStructure from "./Page/FabricStructure";
import Printer from "./Page/Printer";
import AboutUs from "./Page/AboutUs";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<FabricStructure />} />
        <Route path="/design" element={<Printer />} />
        <Route path="/AboutUs" element={<AboutUs />} />

      </Routes>
    </BrowserRouter>
  );
}