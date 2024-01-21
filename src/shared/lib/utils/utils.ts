export function _drawBuffer(
  canvas: React.MutableRefObject<HTMLCanvasElement>,
  width: number,
  chanelData: Float32Array,
  color = "000"
) {
  const height = canvas.current.height; // высота canvas
  const canvasContext = canvas.current.getContext("2d"); // контекст canvas
  const step = Math.ceil(chanelData.length / width); // 46599           // buffer.getChannelData(0) - возвращается Float32Array. Каждые 32 бита это 1 sample (маленький закодированный кусок аудио). В скобках 0 это моноканал, т е в каждом наушнике будет одинаковый звук
  const amp = height / 2; // амплитуда звуковой волны

  for (let i = 0; i < width; i++) {
    let min = 1.0;
    let max = -1.0;
    for (let j = 0; j < step; j++) {
      // from 0 to 46599
      const datum = chanelData[i * step + j];
      if (datum < min) {
        min = datum;
      }
      if (datum > max) {
        max = datum;
      }
    }
    canvasContext.fillStyle = color;
    canvasContext.fillRect(
      i, // отступ по оси х
      (1 + min) * amp,
      1,
      Math.max(1, (max - min) * amp)
    );
  }
  // for (let i = 0; i < width; i++) {
  //   const datum = chanelData[i * step];
  //   console.log(datum);
  //   // 0.002914868528023362
  //   // 0.043986424803733826   4px
  //   // 0.039256900548934937   3px
  //   const waveAmp = Math.abs(datum) * amp;
  //   canvasContext.fillRect(i, amp - waveAmp, 1, 2 * waveAmp);
  //   canvasContext.fillStyle = color;
  // }
}
