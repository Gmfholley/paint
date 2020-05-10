import { loadFromCanvas } from '../vendor/potrace.js'

export function uploadToSvg(files, displayElement) {
  let tempImg = document.createElement("img");
  let fr = new FileReader();
  let file = files[0];
  if (file.type === "image/svg+xml") {
    tempImg.onload = displaySvg.bind(this, tempImg, displayElement)
  } else {
    tempImg.onload = convertToSvg.bind(this, tempImg, displayElement)
  }
  fr.onload = function () {
    tempImg.src = fr.result;
  }
  fr.readAsDataURL(files[0]);
}

function displaySvg(tempImg, displayElement) {
  fetch(tempImg.src)
  .then(data => data.text())
  .then((data) => drawSvg(data, 'image/svg+xml', displayElement))
}

function convertToSvg(tempImg, displayElement) {
  loadFromCanvas(canvasWithImg(tempImg))
    .then(svg => drawSvg(svg, "text/xml", displayElement))
}


function svgElement(svgString, type) {
  var parser = new DOMParser();
  return parser.parseFromString(svgString, type).documentElement
}

function drawSvg(svgData, dataType, displayElement) {
  addSvg(svgElement(svgData, dataType), displayElement)
}

function addSvg(svg, displayElement) {
  displayElement.innerHTML = '';
  displayElement.appendChild(svg);
  document.querySelector('body').classList.add("uploaded")
}

function canvasWithImg(img) {
  let imgCanvas = document.createElement("canvas")
  imgCanvas.width = img.width;
  imgCanvas.height = img.height;
  let ctx = imgCanvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  return imgCanvas;
}
