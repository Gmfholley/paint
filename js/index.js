import { myFunction } from './download.js'
import { uploadToSvg } from './upload.js'
import { getBackgroundColor, createPalettePicker } from './color-picker.js'
import { moveSpriteInline } from './sprite-support.js'
import { changeTheme } from './helpers.js'

window.onload = function() {
  let imageSelect = document.getElementById("imageSelect"),
    imageInput = document.getElementById("imageInput"),
    svgElement = document.getElementById("svg-canvas"),
    palette = document.getElementById("palette"),
    svgObj = document.querySelector('object');

  imageSelect.addEventListener(
    "click",
    (e) => {
      imageInput.click();
      e.preventDefault();
    },
    false
  );

  imageInput.addEventListener("change", (e) => uploadToSvg(this.files, svgElement), false);

  document.querySelector('body').addEventListener(
    "click",
    function(e) {
      const bg = getBackgroundColor(e.target);
      console.log(bg)
      if (bg) {
        // picker.setColor(bg)
      }
    },
    false
  );

  moveSpriteInline(svgObj)
  createPalettePicker(palette)
  document.querySelector('#change-theme').addEventListener('click', changeTheme)

}