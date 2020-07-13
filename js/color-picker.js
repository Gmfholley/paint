window.picker = {}
window.usedColors = []

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
    window.picker = new Picker(paletteElement); // eslint-disable-line no-undef
    const picker = window.picker
    picker.setOptions({ popup: false })
    picker.show()
    paletteElement.style.background = picker.color.rgbaString

    picker.onChange = function(color) {
      paletteElement.style.background = color.rgbaString;
    };
}

export function colorPicker(event) {
  if (window.activeTool !== "picker") { return }

  let attribute = "background-color"
  if (event.target instanceof SVGElement) {
    attribute = "fill"
  }

  const observedColor = realColorAttribute(event.target, attribute);
  window.picker.setColor(observedColor);
}

export function color(event) {
  if (window.activeTool !== "bucket") { return }

  const color = window.picker.color
  const rgba = color.rgbaString
  event.target.style.fill = rgba
  event.target.style.stroke = rgba
  window.usedColors.push(color)
}
