export const initGlobals = () => {
   window.colorMeMine = {
    usedColors: [],
    picker: null,
    activeTool: null,
    brushSize: 'medium',
  }
}

export const getGlobal = (attribute) => {
  return window.colorMeMine[attribute];
}

export const setGlobal = (attribute, value) => {
  window.colorMeMine[attribute] = value
}
