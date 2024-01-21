import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { AppContextProps } from "../../types/AppContext.types";

const AppContext = createContext<AppContextProps>({
  audioBuffer: null,
  audio: null,
  audioContext: null,
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({
  children,
  audioSrc,
}: {
  children: React.ReactNode;
  audioSrc: string;
}) => {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer>();

  const audioContext = new AudioContext();

  async function _initAudio() {
    const response = await axios.get(audioSrc, { responseType: "arraybuffer" });
    const buffer = await audioContext.decodeAudioData(response.data);
    setAudioBuffer(buffer);
  }

  useEffect(() => {
    _initAudio();
  }, []);

  const contextValue = useMemo(
    () => ({
      audioBuffer,
      audio: new Audio(audioSrc),
      audioContext,
    }),
    [audioBuffer, audioSrc, audioContext]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
