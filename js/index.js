import { uploadToSvg } from './upload.js'
import { getBackgroundColor, createPalettePicker } from './color-picker.js'
import { moveSpriteInline, moveTemplate } from './sprite-support.js'
import { changeTheme, magnifySvg, minifySvg, downloadSvg, downloadSvgElementAsType } from './helpers.js'
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
  document.querySelector('#download-png').addEventListener('click', downloadSvgElementAsType.bind(this, svgWrapper, "image/png"))
  document.querySelector('#download-jpg').addEventListener('click', downloadSvgElementAsType.bind(this, svgWrapper, "image/jpeg"))

  // tasks
  moveSpriteInline(spriteSheet)
  moveTemplate(document.querySelector(".split-button"))
  createPalettePicker(palette)

  // Split button setup
  const templateSelector = "template#split-button"
  const buttonOnClick = downloadSvg.bind(this, svgWrapper)
  splitButtonSetup(templateSelector, buttonOnClick)
}