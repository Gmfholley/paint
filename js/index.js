import { uploadToSvg } from './upload.js'
import { createPalettePicker, color, colorPicker } from './color-picker.js'
import { moveContentInline } from './content-support.js'
import {
  changeTheme,
  magnifySvg,
  minifySvg,
  downloadSvg,
  downloadSvgElementAsType,
  paintOnSvgIfClicked
} from './helpers.js'
import { activateTool } from './paintbrush.js'
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

  // move object content inline
  moveContentInline(document.querySelector('object.split-button'))
  moveContentInline(document.querySelector('object.logo'))
  // Split button setup
  const templateSelector = "template#split-button"
  const buttonOnClick = downloadSvg.bind(this, svgWrapper)
  splitButtonSetup(templateSelector, buttonOnClick)

  // tasks
  createPalettePicker(palette)
  svgWrapper.addEventListener('click', color)
  document.addEventListener('click', colorPicker)

  svgWrapper.addEventListener('mousemove', paintOnSvgIfClicked.bind(this, svgWrapper))
  svgWrapper.addEventListener('mousedown', paintOnSvgIfClicked.bind(this, svgWrapper))
  // window.activeTool = "bucket";

  document.querySelector('#plus').addEventListener('click', magnifySvg.bind(this, svgWrapper))
  document.querySelector('#minus').addEventListener('click', minifySvg.bind(this, svgWrapper))


  const toolSelectors = '.toolbar .tool';
  Array.from(document.querySelectorAll(toolSelectors)).forEach(element => {
    element.addEventListener('click', activateTool.bind(this, element, toolSelectors), true)
  })

  document.querySelector('#download-svg').addEventListener('click', buttonOnClick)
  document.querySelector('#download-png').addEventListener('click', downloadSvgElementAsType.bind(this, svgWrapper, "image/png"))
  document.querySelector('#download-jpg').addEventListener('click', downloadSvgElementAsType.bind(this, svgWrapper, "image/jpeg"))
}