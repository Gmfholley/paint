export function getBackgroundColor(element) {
  return window.getComputedStyle(element)["background-color"]
}

var picker

// Picker is a global
export function createPalettePicker(element) {
    picker = new Picker(element);
    picker.setOptions({ popup: false })
    picker.show()
    element.style.background = picker.color.rgbaString
    // element.style.background = color.rgbaString;


    picker.onChange = function(color) {
      element.style.background = color.rgbaString;
    };
}

export function color(event) {
  event.target.style.fill = picker.color.rgbaString
  event.target.style.stroke = picker.color.rgbaString
  console.log(event.target)
}