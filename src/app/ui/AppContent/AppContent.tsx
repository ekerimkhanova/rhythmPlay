import React, { useEffect, useRef, useState } from "react";
import cn from "./AppContent.module.scss";
import axios from "axios";

// url: string | HTMLMediaElement
export const AppContent = ({ audioSrc }: { audioSrc: string }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const [buffer, setBuffer] = useState<AudioBuffer>();

  const audio = new Audio(audioSrc);

  async function visualizeAudio() {
    const context = new AudioContext();
    const audio = new Audio(audioSrc);
    const analyser = context.createAnalyser();

    const response = await axios.get(audioSrc, { responseType: "arraybuffer" });

    const audioBuffer = await context.decodeAudioData(response.data); // create audio source
    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    // source.start();

    // const source = context.createMediaElementSource(audio);

    console.log(audioBuffer);

    source.connect(analyser);
    analyser.connect(context.destination);

    const frequencyArray = new Uint8Array(analyser.frequencyBinCount);
    const sampleRate = context.sampleRate;

    // audio.onloadedmetadata = function () {
    //   const audioBuffer = context.createBuffer(2, audio.duration * sampleRate, sampleRate);
    //   buffer = audioBuffer;
    // };
    // const audioBuffer = context.createBuffer(2, audio.duration * sampleRate, sampleRate);

    // console.log(buffer);

    // audio.loop = true;

    //   startAnimation();
  }

  useEffect(() => {
    if (canvasRef.current) {
      visualizeAudio();
    }
  }, []);

  return (
    <div>
      <button onClick={() => audio.play()}>play</button>
      <div className={cn.canvas} ref={canvasRef} />
    </div>
  );
};
