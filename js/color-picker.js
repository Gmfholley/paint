export function getBackgroundColor(element) {
  return window.getComputedStyle(element)["background-color"]
}


// Picker is a global
export function createPalettePicker(element) {
    let picker = new Picker(element);

    picker.onChange = function(color) {
      element.style.background = color.rgbaString;
    };
}