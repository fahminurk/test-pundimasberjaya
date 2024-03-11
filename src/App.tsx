import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import DetailPage from "./pages/DetailPage";
import Footer from "./components/Footer";
import { Toaster } from "sonner";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <main>
      <Toaster />
      <Navbar />
      <div className="max-w-7xl mx-auto p-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<DetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </div>
      <Footer />
    </main>
  );
}

export default App;
