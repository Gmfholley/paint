
export function paintOnSvg(svg, event) {
  if (window.activeTool !== "paint") { return }

  const color = window.picker.color // eslint-disable-line
  const rgba = color.rgbaString

  // Create
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("fill", rgba)
  circle.setAttribute("stroke", rgba)
  circle.setAttribute("r", "30")
  const [x, y] = getCoordinatesRelativeToElement(event, svg)
  circle.setAttribute("cx", x)
  circle.setAttribute("cy", y)

  svg.appendChild(circle);
}

export function getCoordinatesRelativeToElement(event, element) {
  const rect = element.getBoundingClientRect()
  const width = parseInt(element.getAttribute("width")) || rect.width
  const height = parseInt(element.getAttribute("height")) || rect.height

  const relXPos = event.clientX - rect.x
  const relYPos = event.clientY - rect.y

  const equivalentPosX = relXPos * (width / rect.width)
  const equivalentPosY = relYPos * (height / rect.height)

  return [equivalentPosX, equivalentPosY]
}

export function activateTool(element, toolbarSelector) {
  window.activeTool = element.getAttribute("id");
  const toolItems = document.querySelectorAll(toolbarSelector);

  Array.from(toolItems).forEach((el) => {
    if (el.getAttribute("id") === window.activeTool) {
      el.classList.add("active")
    } else {
      el.classList.remove("active")
    }
  });
}
