export function formatAsset(value) {
  console.log("value", value);
  if (value >= 1e3) {
    return Math.floor(value / 1e3) + " Billion";
  }
  return Math.floor(value);
}

export function formatWithCommas(value) {
  return value.toLocaleString('en-US');
}

