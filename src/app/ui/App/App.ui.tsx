import React from "react";
import { AppContent } from "../AppContent/AppContent";
import audio from "../../../assets/audio.ogg";

export const App = () => {
  return (
    <div className="App">
      <AppContent audioSrc={audio} />
    </div>
  );
};
