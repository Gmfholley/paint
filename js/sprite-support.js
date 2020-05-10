export function moveSpriteInline(element) {
  let svg = element.contentDocument.querySelector('svg')
  svg.style.display = 'none'

  document.body.appendChild(svg.cloneNode(true));
}
