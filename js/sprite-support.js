export function moveSpriteInline(element) {
  let svg = element.contentDocument.querySelector('svg')
  svg.style.display = 'none'

  document.body.appendChild(svg.cloneNode(true));
}

export function moveTemplate(element) {
  let template = element.contentDocument.querySelector('template')
  template.style.display = 'none'

  document.body.appendChild(template.cloneNode(true));
}