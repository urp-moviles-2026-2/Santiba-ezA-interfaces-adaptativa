// src/utils/breakpoints.js

// Cortes en dp, por ANCHO de ventana
export const BREAKPOINTS = {
  phoneLandscape: 600,
  tabletPortrait: 768,
  tabletLandscape: 1024,
};

export const DEVICE_CLASSES = [
  {
    key: "phone-portrait",
    label: "Phone Portrait",
    range: "< 600 dp",
    example: "Teléfono en vertical",
  },
  {
    key: "phone-landscape",
    label: "Phone Landscape",
    range: "600 – 768 dp",
    example: "Teléfono pequeño en horizontal",
  },
  {
    key: "tablet-portrait",
    label: "Tablet Portrait",
    range: "768 – 1024 dp",
    example: "Tableta en vertical",
  },
  {
    key: "tablet-landscape",
    label: "Tablet Landscape",
    range: "≥ 1024 dp",
    example: "Tableta en horizontal, ventana web",
  },
];

// Paso 1: clase de dispositivo, comparando en orden
export function getDeviceClass(width) {
  if (width < BREAKPOINTS.phoneLandscape) return "phone-portrait";
  if (width < BREAKPOINTS.tabletPortrait) return "phone-landscape";
  if (width < BREAKPOINTS.tabletLandscape) return "tablet-portrait";
  return "tablet-landscape";
}

// Paso 2: columnas con los mismos cortes
export function getColumns(width) {
  if (width < BREAKPOINTS.phoneLandscape) return 2;
  if (width < BREAKPOINTS.tabletPortrait) return 3;
  if (width < BREAKPOINTS.tabletLandscape) return 4;
  return 6;
}
