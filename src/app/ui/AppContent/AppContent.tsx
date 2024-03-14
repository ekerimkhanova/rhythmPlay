import { useEffect, useMemo, useRef, useState } from "react";
import { useAppContext } from "../../../shared/ui/AppContext/AppContext.ui";
import { _drawBuffer } from "../../../shared/lib/utils/utils";
import { useEvents } from "../../../shared/lib/hook/useEvents";

// url: string | HTMLMediaElement
export const AppContent = () => {
  const canvas = useRef<HTMLCanvasElement>(null);

  const { audio, audioBuffer } = useAppContext();

  const {
    onTimeUpdate,
    playAudio,
    pauseAudio,
    toggleAudio,
    rewindToBeginning,
    rewind,
    updateAudioRewind,
  } = useEvents(canvas);

  useEffect(() => {
    if (canvas.current && audioBuffer) {
      _drawBuffer({
        canvas,
        width: 750,
        chanelData: audioBuffer.getChannelData(0),
        color: "000",
      });
    }
  }, [canvas.current, audioBuffer]);

  useEffect(() => {
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  });

  useEffect(() => {
    canvas.current.addEventListener("click", updateAudioRewind);

    return () => {
      canvas.current.removeEventListener("click", updateAudioRewind);
    };
  });

  return (
    <div>
      <button onClick={playAudio}>play</button>
      <button onClick={pauseAudio}>pause</button>
      <button onClick={toggleAudio}>toggle</button>
      <canvas width="750" height="200" ref={canvas} />
    </div>
  );
};
