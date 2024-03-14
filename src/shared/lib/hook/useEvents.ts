import { useAppContext } from "../../ui/AppContext/AppContext.ui";
import { _drawBuffer } from "../utils/utils";

export function useEvents(canvas: React.MutableRefObject<HTMLCanvasElement>) {
  const { audio } = useAppContext();

  function onTimeUpdate() {
    const currentCanvasWidth =
      (canvas.current.width * audio.currentTime) / audio.duration;

    if (currentCanvasWidth <= 1) return;

    const ctx = canvas.current.getContext("2d");

    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, currentCanvasWidth, canvas.current.height);
  }

  function updateAudioRewind(e) {
    const ctx = canvas.current.getContext("2d");

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);
    const currentCanvasWidth = e.offsetX;
    const currentTime = Math.round(
      (audio.duration * currentCanvasWidth) / canvas.current.width
    );
    audio.currentTime = currentTime;
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, currentCanvasWidth, canvas.current.height);
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
    updateAudioRewind,
  };
}
