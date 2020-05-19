import { getCurrentDimensions } from './helpers.js'

export function downloadSvgElement(element) {
  const svgData = `data:image/svg+xml;utf8,${encodeURIComponent(element.outerHTML)}`
  const downloadName = getFileName(getStoredFilename(element), "svg")
  download(svgData, downloadName)
}

export function downloadSvgAsType(svgElement, downloadType = "image/png") {
  const extension = downloadType.split("/")[1]
  const asFileName = getFileName(getStoredFilename(svgElement), extension)
  const img = new Image()
  img.onload = convertAndDownloadImg.bind(this, img, downloadType, asFileName, getCurrentDimensions(svgElement))
  img.src = convertToObjectUrl(svgElement);
}

function getStoredFilename(element) {
  return element.dataset.fileName
}

function getFileName(originalName, extension) {
  if (!originalName) { return `output.${extension}` }

  return `${originalName}.${extension}`
}

function convertToObjectUrl(svgElement) {
  const svgContent = (new XMLSerializer()).serializeToString(svgElement);
  const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  return window.URL.createObjectURL(svgBlob);
}

function createCanvasForSvg(dimensions) {
  const canvas = document.createElement('canvas');
  canvas.width = dimensions.width;
  canvas.height = dimensions.height;
  return canvas
}

function convertAndDownloadImg(img, downloadType, filename, dimensions) {
  const canvas = createCanvasForSvg(dimensions)
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  window.URL.revokeObjectURL(img.src);

  var data = canvas.toDataURL(downloadType)
                   .replace(downloadType, 'image/octet-stream');

  download(data, filename);
}

function download(data, downloadName) {
  let a = document.createElement('a');
  a.href = data
  a.download = downloadName
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
