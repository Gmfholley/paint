window.picker = {}
window.usedColors = []

export function getBackgroundColor(element) {
  return window.getComputedStyle(element)["background-color"]
}

export function getFillColor(element) {
  return window.getComputedStyle(element)["fill"]
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

  const transparent = "rgba(0, 0, 0, 0)"
  const bgColor = getBackgroundColor(event.target);
  const fillColor = getFillColor(event.target);
  const observedColor = bgColor === transparent ? fillColor : bgColor;

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
