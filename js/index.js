import { myFunction } from './download.js'
import { uploadToSvg } from './upload.js'
import { getBackgroundColor, createPalettePicker } from './color-picker.js'
import { moveSpriteInline, moveTemplate } from './sprite-support.js'
import { changeTheme, magnifySvg, minifySvg, downloadSvg } from './helpers.js'
import { splitButtonSetup } from './split-button.js'

window.onload = function() {
  let imageLink = document.querySelector("#image-link"),
    imageInput = document.querySelector("#image-input"),
    svgWrapper = document.querySelector("#svg-wrapper"),
    palette = document.querySelector("#palette"),
    spriteSheet = document.querySelector('object');

  imageLink.addEventListener(
    "click",
    (e) => {
      imageInput.click();
      e.preventDefault();
    },
    false
  );

  imageInput.addEventListener("change", function(e) { uploadToSvg(this.files, svgWrapper) }, false);

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
  document.querySelector('#change-theme').addEventListener('click', changeTheme)
  document.querySelector('#plus').addEventListener('click', magnifySvg.bind(this, svgWrapper))
  document.querySelector('#minus').addEventListener('click', minifySvg.bind(this, svgWrapper))
  // document.querySelector('#download').addEventListener('click', downloadSvg.bind(this, svgWrapper))

  // tasks
  moveSpriteInline(spriteSheet)
  moveTemplate(document.querySelector(".split-button"))
  createPalettePicker(palette)
  splitButtonSetup("template#split-button", downloadSvg.bind(this, svgWrapper))
}