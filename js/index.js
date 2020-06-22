import { uploadToSvg } from './upload.js'
import { createPalettePicker, color } from './color-picker.js'
import { moveContentInline } from './content-support.js'
import { changeTheme, magnifySvg, minifySvg, downloadSvg, downloadSvgElementAsType, paintOnSvgIfClicked } from './helpers.js'
import { toggleActivatePaint } from './paintbrush.js'
import { splitButtonSetup } from './split-button.js'

window.onload = function() {
  let imageUpload = document.querySelector("#image-upload"),
    imageInput = document.querySelector("#image-input"),
    svgWrapper = document.querySelector("#svg-wrapper"),
    palette = document.querySelector("#palette");

  imageUpload.addEventListener(
    "click",
    (e) => {
      imageInput.click();
      e.preventDefault();
    },
    false
  );

  imageInput.addEventListener("change", function() { uploadToSvg(this.files, svgWrapper) }, false);

  document.querySelector('#change-theme').addEventListener('click', changeTheme)


  // tasks
  createPalettePicker(palette)
  svgWrapper.addEventListener('click', color)
  moveContentInline(document.querySelector('object.split-button'))
  moveContentInline(document.querySelector('object.logo'))
  svgWrapper.addEventListener('mousemove', paintOnSvgIfClicked.bind(this, svgWrapper))
  svgWrapper.addEventListener('mousedown', paintOnSvgIfClicked.bind(this, svgWrapper))

  document.querySelector('#plus').addEventListener('click', magnifySvg.bind(this, svgWrapper))
  document.querySelector('#minus').addEventListener('click', minifySvg.bind(this, svgWrapper))
  document.querySelector('#paint').addEventListener('click', toggleActivatePaint.bind(this, document.querySelector('#paint'), document.querySelector('#bucket')))
  document.querySelector('#bucket').addEventListener('click', toggleActivatePaint.bind(this, document.querySelector('#paint'), document.querySelector('#bucket')))

  // Split button setup
  const templateSelector = "template#split-button"
  const buttonOnClick = downloadSvg.bind(this, svgWrapper)
  splitButtonSetup(templateSelector, buttonOnClick)
  document.querySelector('#download-svg').addEventListener('click', buttonOnClick)
  document.querySelector('#download-png').addEventListener('click', downloadSvgElementAsType.bind(this, svgWrapper, "image/png"))
  document.querySelector('#download-jpg').addEventListener('click', downloadSvgElementAsType.bind(this, svgWrapper, "image/jpeg"))
}