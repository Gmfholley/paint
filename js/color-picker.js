var picker
var usedColors = []

export function getBackgroundColor(element) {
  return window.getComputedStyle(element)["background-color"]
}

// Picker is a global
export function createPalettePicker(element) {
    picker = new Picker(element);
    picker.setOptions({ popup: false })
    picker.show()
    element.style.background = picker.color.rgbaString

    picker.onChange = function(color) {
      element.style.background = color.rgbaString;
    };
}

export function color(event) {
  const color = picker.color
  const rgba = color.rgbaString
  event.target.style.fill = rgba
  event.target.style.stroke = rgba
  usedColors.push(color)
}