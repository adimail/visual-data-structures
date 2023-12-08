export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const range = (start: number, end: number) =>
  [...Array(end - start).keys()].map((i) => i + start);

export const normalize = (value: number, min: number, max: number) =>
  ((value - min) * 100) / (max - min);

export const generateRandomArray = (length: number, min: number, max: number) =>
  [...Array(length).keys()].map(() => randomInt(min, max));

export const scaleValue = (
  value: number,
  from: [number, number],
  to: [number, number]
) => {
  var scale = (to[1] - to[0]) / (from[1] - from[0]);
  var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
  return ~~(capped * scale + to[0]);
};

export const swap = <T>(array: Array<T>, a: number, b: number) =>
  ([array[a], array[b]] = [array[b], array[a]]);

export const insertAt = <T>(array: Array<T>, index: number, item: T) => [
  ...array.slice(0, index),
  item,
  ...array.slice(index),
];
