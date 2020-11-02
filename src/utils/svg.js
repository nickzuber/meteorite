export function inlineSvg(svg) {
  const b64 = btoa(svg);
  return `"data:image/svg+xml;base64,${b64}"`;
}
