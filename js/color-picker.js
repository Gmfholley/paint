import { getGlobal, setGlobal } from './color-me-mine.js'

export function realColorAttribute(element, attribute = "background-color") {
  const transparent = 'rgba(0, 0, 0, 0)'
  if (!element) return transparent;

  const bgColor = window.getComputedStyle(element)[attribute];
  if (bgColor === transparent) {
    return realColorAttribute(element.parentElement, attribute);
  } else {
    return bgColor;
  }
}

// Picker is a global
export function createPalettePicker(paletteElement) {
  const picker = new Picker(paletteElement) // eslint-disable-line no-undef
  picker.setOptions({ popup: false })
  picker.show()
  paletteElement.style.background = picker.color.rgbaString

  picker.onChange = function(color) {
    paletteElement.style.background = color.rgbaString;
  };

  setGlobal("picker", picker);
}

export function colorPicker(event) {
  if (getGlobal("activeTool") !== "picker") { return }

  let attribute = "background-color"
  if (event.target instanceof SVGElement) {
    attribute = "fill"
  }

  const observedColor = realColorAttribute(event.target, attribute)

  const picker = getGlobal("picker")
  picker.setColor(observedColor);
}

export function color(event) {
  if (getGlobal("activeTool") !== "bucket") { return }

  const color = getGlobal("picker").color
  const rgba = color.rgbaString
  event.target.style.fill = rgba
  event.target.style.stroke = rgba

  getGlobal("usedColors").push(color)
}
