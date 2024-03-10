import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import DetailPage from "./pages/DetailPage";
import Footer from "./components/Footer";

function App() {
  return (
    <main>
      <Navbar />
      <div className="max-w-7xl mx-auto p-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<DetailPage />} />
        </Routes>
      </div>
      <Footer />
    </main>
  );
}

export default App;
