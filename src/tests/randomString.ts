export default function generateRandomString(leng: number) {
  const randomChar = () => Math.round(Math.random() * 94) + 32;
  const randomArray: number[] = Array(leng).fill(0);
  const randomString = String.fromCharCode(
    ...randomArray.map((it) => randomChar())
  ).replace(/[ { [ ( ]/g, "");
  const numericString = randomString
    .split("")
    .filter((el, id) => Number(el) || (Number(el) === 0 && id !== 0))
    .join("");
  return { randomString, numericString };
}
