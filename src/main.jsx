import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { DataProvider } from "./context/DataContext.jsx";
import CartProvider from "./context/cartProvider.jsx";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "react-scroll-to-top";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <CartProvider>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <App />
          <ScrollToTop smooth  color="white" style={{backgroundColor:`#fa2d37`,display:`flex`,alignItems:`center`,justifyContent:`center` }}/>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </ClerkProvider>
      </CartProvider>
    </DataProvider>
  </StrictMode>
);
