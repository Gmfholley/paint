import { myFunction } from './download.js'
import { loadFromCanvas } from '../vendor/potrace.js'
window.onload = function() {
  let imageSelect = document.getElementById("imageSelect"),
    imageInput = document.getElementById("imageInput"),
    imgElement = document.createElement("img"),
    svgElement = document.getElementById("svg-canvas");

  imgElement.onload = imgOnload;

  imageSelect.addEventListener(
    "click",
    function(e) {
      imageInput.click();
      e.preventDefault();
    },
    false
  );

  imageInput.addEventListener(
    "change",
    function(e) {
      handleFiles(this.files);
    },
    false
  );

  function handleFiles(files) {
    let fr = new FileReader();
    let file = files[0];
    fr.onload = function () {
      imgElement.src = fr.result;
    }
    fr.readAsDataURL(files[0]);
  }

  function drawSVG(svg) {
    var parser = new DOMParser();
    var dom = parser.parseFromString(svg, "text/xml");
    svgElement.innerHTML = '';
    svgElement.appendChild(dom.documentElement);
    document.querySelector('body').classList.add("uploaded")
  }

  function imgOnload() {

    // fetch($('#imgele').src).then(data => data.text()).then((data) => const parser = new DOMParser(); const svg = parser.parseFromSt)

    let imgCanvas = document.createElement("canvas")
    imgCanvas.width = imgElement.width;
    imgCanvas.height = imgElement.height;
    let ctx = imgCanvas.getContext("2d");
    ctx.drawImage(imgElement, 0, 0);


    loadFromCanvas(imgCanvas)
      .then(svg => drawSVG(svg))
      .catch(err => console.log(err));
  }
}

// https://dev.to/luisaugusto/how-to-convert-image-tags-with-svg-files-into-inline-svg-tags-3jfl