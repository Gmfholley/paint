import { getGlobal, setGlobal } from './color-me-mine.js'

export function paintOnSvg(svg, event) {
  if (getGlobal("activeTool") !== "paint") { return }

  const color = getGlobal("picker").color
  const rgba = color.rgbaString

  // Create
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  const [x, y] = getCoordinatesRelativeToElement(event, svg)
  circle.setAttribute("fill", rgba)
  circle.setAttribute("stroke", rgba)
  circle.setAttribute("r", "30")
  circle.setAttribute("cx", x)
  circle.setAttribute("cy", y)

  svg.appendChild(circle);
}

export function getCoordinatesRelativeToElement(event, element) {
  const rect = element.getBoundingClientRect()

  const [width, height] = getSvgViewingWidth(element)

  // console.log(
  //   event.pageX,
  //   event.pageY,
  //   event.clientX,
  //   event.clientY,
  //   event.screenX,
  //   event.screenY,
  //   window.getComputedStyle(element)["width"], // same as rect.width
  //   window.getComputedStyle(element)["height"], // same as rect.height
  //   rect.x,                                     // x upper left coordinate
  //   rect.y                                      // y upper left coordinate
  //  )

  // For ordinary screens, no need to do anything but clientX, clientY
  // But SVGs are manipulated both by CSS and their internal paths to be certain dimensions
  // So compute relative to inner dimensions, since we are painting inside SVG

  //  Get relative positions, per the changed dimensions of the svg
  const relXPos = event.clientX - rect.x
  const relYPos = event.clientY - rect.y

  const equivalentPosX = relXPos * (width / rect.width)
  const equivalentPosY = relYPos * (height / rect.height)

  return [equivalentPosX, equivalentPosY]
}

function getSvgViewingWidth(element) {
  // If width/height set directly, send those
  const width = element.getAttribute("width")
  const height = element.getAttribute("height")

  if (width && height) { return [width, height] }

  // if viewBox set directly, send that
  const viewBox = element.getAttribute("viewBox")
  if (!viewBox) { return getComputedHeightWidth(element) }

  const viewBoxDimensions = viewBox.split(" ").map((i) => parseInt(i))
  return [viewBoxDimensions[2] - viewBoxDimensions[0], viewBoxDimensions[3] - viewBoxDimensions[1]];
}

function getComputedHeightWidth(element) {
  const width = window.getComputedStyle(element)["width"]
  const height = window.getComputedStyle(element)["height"]

  return [width, height]
}

export function activateTool(element, toolbarSelector) {
  const tool = element.getAttribute("id")
  const body = document.querySelector("body")

  setGlobal("activeTool", tool)

  const toolItems = document.querySelectorAll(toolbarSelector);
  Array.from(toolItems).forEach((el) => {
    const elementTool = el.getAttribute("id")
    if (elementTool === tool) {
      el.classList.add("active")
      body.classList.add(elementTool)
    } else {
      el.classList.remove("active")
      body.classList.remove(elementTool)
    }
  });
}
