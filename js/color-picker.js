window.picker = {}
window.usedColors = []

export function getBackgroundColor(element) {
  return window.getComputedStyle(element)["background-color"]
}

// Picker is a global
export function createPalettePicker(element) {
    window.picker = new Picker(element); // eslint-disable-line no-undef
    const picker = window.picker
    picker.setOptions({ popup: false })
    picker.show()
    element.style.background = picker.color.rgbaString

    picker.onChange = function(color) {
      element.style.background = color.rgbaString;
    };
}

export function color(event) {
  if (window.paintActivated) { return }

  const color = window.picker.color
  const rgba = color.rgbaString
  event.target.style.fill = rgba
  event.target.style.stroke = rgba
  window.usedColors.push(color)
}
