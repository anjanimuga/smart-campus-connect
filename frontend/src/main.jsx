import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { CartProvider } from "./context/CartContext";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <CartProvider>

      <App />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#111111",
            color: "#ffffff",
            borderRadius: "18px",
            padding: "16px",
            border:
              "1px solid rgba(255,255,255,0.08)",
          },
        }}
      />

    </CartProvider>

  </React.StrictMode>

);