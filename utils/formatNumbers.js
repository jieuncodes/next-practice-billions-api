export function formatAsset(value) {
  console.log("value", value);
  if (value >= 1e3) {
    return Math.floor(value / 1e3) + " Billion";
  }
  return Math.floor(value);
}

export function formatWithCommas(value) {
  const valueAsString = value.toString();
  let reversedValue = valueAsString.split("").reverse();
  let stringWithCommas = "";

  for (let i = 0; i < reversedValue.length; i++) {
    stringWithCommas += reversedValue[i];
    if ((i + 1) % 3 === 0 && i !== reversedValue.length - 1) {
      stringWithCommas += ",";
    }
  }

  return stringWithCommas.split("").reverse().join("");
}
