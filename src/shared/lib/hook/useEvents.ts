import { useAppContext } from "../../ui/AppContext/AppContext.ui";
import { _drawBuffer } from "../utils/utils";

export function useEvents(canvas: React.MutableRefObject<HTMLCanvasElement>) {
  const { audio, audioBuffer } = useAppContext();

  function getChannelData(currentTime) {
    return new Float32Array(Math.round(audioBuffer.sampleRate * currentTime));
  }

  function onTimeUpdate() {
    // посмотреть в сторону canvas background color

    const currentCanvasWidth =
      (canvas.current.width * audio.currentTime) / audio.duration;

    if (currentCanvasWidth <= 1) return;

    const ctx = canvas.current.getContext("2d");

    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, currentCanvasWidth, canvas.current.height);
    // ============================================

    // const ctx = canvas.current.getContext("2d");

    // const imageData = ctx.getImageData(
    //   0,
    //   0,
    //   currentCanvasWidth,
    //   canvas.current.height
    // );
    // const data = imageData.data;
    // console.log(data);
    // for (let i = 0; i < data.length; i += 4) {

    //   data[i] = 255; // red
    //   data[i + 1] = 0; // green
    //   data[i + 2] = 0; // blue
    // }
    // ctx.putImageData(imageData, 0, 0);

    // ============================================

    // canvasContext.clearRect(0, 0, currentCanvasWidth, canvas.current.height);
    // console.log(canvasContext);

    // canvasContext.beginPath();
    // canvasContext.moveTo(canvas.current.height, currentCanvasWidth);
    // canvasContext.quadraticCurveTo(150, 20, 250, 30);
    // canvasContext.fillStyle = "green";
    // canvasContext.fillRect(0, 0, currentCanvasWidth, canvas.current.height);
    // canvasContext.fill();

    // ====================================
    // const currentCanvasWidth =
    // (canvas.current.width * audio.currentTime) / audio.duration;
    // const chanelData = getChannelData(audio.currentTime);
    // audioBuffer.copyFromChannel(chanelData, 0, 0);

    // _drawBuffer({
    //   canvas,
    //   width: currentCanvasWidth,
    //   chanelData,
    //   color: "green",
    // });
  }

  function updateAudioRewind(e) {
    // _drawBuffer({
    //   canvas,
    //   width: canvas.current.width,
    //   chanelData: audioBuffer.getChannelData(0),
    //   color: "black",
    // });
    // const currentCanvasWidth = e.offsetX;
    // const currentTime = Math.round(
    //   (audio.duration * currentCanvasWidth) / canvas.current.width
    // );
    // audio.currentTime = currentTime;
    // const chanelData = getChannelData(currentTime);
    // audioBuffer.copyFromChannel(chanelData, 0, 0);
    // _drawBuffer({
    //   canvas,
    //   width: currentCanvasWidth,
    //   chanelData,
    //   color: "green",
    // });
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
