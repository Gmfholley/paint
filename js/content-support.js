export function moveContentInline(element) {
  if (element.tagName !== "OBJECT") return

  const content = element.contentDocument
  if (!content) {
    // Make sure object is visible, so it will load
    element.onload = moveContentInline.bind(this, element)
    element.style.display = 'block'
  } else {
    const contentBody = content.body || content
    const childContent = contentBody.children

    Array.from(childContent).forEach((child) => {
      child.style.display = 'none'
      document.body.appendChild(child.cloneNode(true));
    })
  }
}
