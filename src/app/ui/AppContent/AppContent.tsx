import { useEffect, useRef } from "react";
import { useAppContext } from "../../../shared/ui/AppContext/AppContext.ui";
import { _drawBuffer } from "../../../shared/lib/utils/utils";
import { useEvents } from "../../../shared/lib/hook/useEvents";

// add context with params: audioBuffer, updateAudioBuffer, audio, audioContext

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
  } = useEvents(canvas);

  useEffect(() => {
    if (canvas.current && audioBuffer) {
      _drawBuffer(canvas, canvas.current.width, audioBuffer.getChannelData(0));
    }
  }, [canvas.current, audioBuffer]);

  useEffect(() => {
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  });

  // const eventEmitter = useEventEmitter();
  // const onBuyClick = () => {
  //   eventEmitter.emit("eventName", { total });
  // };

  // useEvent("eventName", (data) => {
  //   showTotal(data.total);
  // });

  return (
    <div>
      <button onClick={playAudio}>play</button>
      <button onClick={pauseAudio}>pause</button>
      <button onClick={toggleAudio}>toggle</button>
      <canvas width="750" height="200" ref={canvas} />
    </div>
  );
};
