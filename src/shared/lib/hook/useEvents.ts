import { useAppContext } from "../../ui/AppContext/AppContext.ui";
import { _drawBuffer } from "../utils/utils";

export function useEvents(canvas: React.MutableRefObject<HTMLCanvasElement>) {
  const { audio, audioBuffer } = useAppContext();

  function onTimeUpdate() {
    const currentCanvasWidth =
      (canvas.current.width * audio.currentTime) / audio.duration;

    const channelData = new Float32Array(
      Math.round(audioBuffer.sampleRate * audio.currentTime)
    );

    audioBuffer.copyFromChannel(channelData, 0, 0);

    _drawBuffer(canvas, currentCanvasWidth, channelData, "green");
  }

  function playAudio() {
    if (!audio) return;
    audio.play();
  }

  function pauseAudio() {
    if (!audio) return;
    audio.pause();
  }

  function toggleAudio() {
    if (audio.paused) {
      playAudio();
    } else {
      pauseAudio();
    }
  }

  function rewind(sec: number) {
    if (!audio || audio.duration < sec || sec < 0) return;
    audio.currentTime = sec;
  }

  return {
    onTimeUpdate,
    playAudio,
    pauseAudio,
    rewindToBeginning: () => rewind(0),
    rewind,
    toggleAudio,
  };
}
