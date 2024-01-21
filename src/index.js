import React from "react";
import ReactDOM from "react-dom/client";
import audio from './shared/assets/audio.ogg';
import { AppProvider } from "./shared/ui/AppContext/AppContext.ui";

import { App } from "./app";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider audioSrc={audio}>
      <App />
    </AppProvider>
  </React.StrictMode>
);
