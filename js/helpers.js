import { downloadSvgElement, downloadSvgAsType } from "./download.js"

export function changeTheme() {
  document.querySelector('body').classList.toggle("dark-theme")
}

// At the time we set this, our element is not uploaded, so create wrapper function
export function magnifySvg(parent) {
  magnify(parent.querySelector('svg'))
}

export function minifySvg(parent) {
  minify(parent.querySelector('svg'))
}

export function downloadSvg(parent) {
  downloadSvgElement(parent.querySelector('svg'))
}

export function downloadSvgElementAsType(parent, type) {
  downloadSvgAsType(parent.querySelector('svg'), type)
}

export function getCurrentDimensions(element) {
  const styles = window.getComputedStyle(element)
  return { width: parseInt(styles["width"]), height: parseInt(styles["height"]) }
}

function setCurrentDimensions(element, width, height) {
  element.style.width = width + "px"
  element.style.height = height + "px"
}

function setElementDimensions(element) {
  let styles = getCurrentDimensions(element)
  element.dataset.width = styles["width"]
  element.dataset.height = styles["height"]
  return element.dataset
}

function getElementDimensions(element) {
  let set = element.dataset
  return { width: parseInt(set.width), height: parseInt(set.height) }
}

function getCurrentMagnification(element) {
  let { width, height } = getElementDimensions(element)
  if (!width || !height) {
    let set = setElementDimensions(element)
    width = set.width
    height = set.height
  }

  let currentDimensions = getCurrentDimensions(element)

  let magnification = (parseInt(currentDimensions.width) / width)

  return { width, height, magnification }
}

function magnify(element) {
  let { magnification, width, height } = getCurrentMagnification(element)

  if (magnification < 10) {
    magnification += .10
    setCurrentDimensions(element, (width * magnification), height * magnification)
  }
}

function minify(element) {
  let { magnification, width, height } = getCurrentMagnification(element)

  if (magnification > 0.2) {
    magnification -= .10
    setCurrentDimensions(element, (width * magnification), height * magnification)
  }
}


