import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <Toaster 
       position="top-right"
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#2b3a4b",
            color: "#fff",
            borderRadius: "10px",
            padding: "12px 16px",
          },
          success: { iconTheme: { primary: "#CBA75E", secondary: "#1E2A38" } },
        }}
      />
    </AuthProvider>
  </BrowserRouter>
);
