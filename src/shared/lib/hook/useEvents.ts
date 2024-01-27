import { useAppContext } from "../../ui/AppContext/AppContext.ui";
import { _drawBuffer } from "../utils/utils";

export function useEvents(canvas: React.MutableRefObject<HTMLCanvasElement>) {
  const { audio, audioBuffer } = useAppContext();

  function getChannelData(currentTime) {
    return new Float32Array(Math.round(audioBuffer.sampleRate * currentTime));
  }

  function onTimeUpdate() {
    const currentCanvasWidth =
      (canvas.current.width * audio.currentTime) / audio.duration;
    const chanelData = getChannelData(audio.currentTime);
    audioBuffer.copyFromChannel(chanelData, 0, 0);
    _drawBuffer({
      canvas,
      width: currentCanvasWidth,
      chanelData,
      color: "000",
    });
  }

  function updateAudioRewind(e) {
    // canvasContext.clearRect(0, 0, canvas.current.width, canvas.current.height);

    // _fillInitialColor(canvas.current.width, canvasContext, "000");
    // canvasContext.restore();

    // canvasContext.strokeStyle = "blue";
    // canvasContext.strokeRect(10, 10, 100, 100);
    // canvasContext.fillStyle = "black";
    _drawBuffer({
      canvas,
      width: canvas.current.width,
      chanelData: audioBuffer.getChannelData(0),
      color: "black",
    });
    // console.log(canvasContext);

    const currentCanvasWidth = e.offsetX;
    const currentTime = Math.ceil(
      (audio.duration * currentCanvasWidth) / canvas.current.width
    );

    audio.currentTime = currentTime;
    const chanelData = getChannelData(currentTime);

    audioBuffer.copyFromChannel(chanelData, 0, 0);

    _drawBuffer({
      canvas,
      width: currentCanvasWidth,
      chanelData,
      color: "green",
    });
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
