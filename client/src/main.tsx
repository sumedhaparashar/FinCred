import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { init as firebaseInit } from "./lib/firebase";

// Initialize Firebase
firebaseInit();

createRoot(document.getElementById("root")!).render(<App />);
