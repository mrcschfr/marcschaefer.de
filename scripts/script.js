var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};

const IMG_URLS = [
  "https://preview.redd.it/9k1j9k0axpi71.png?width=960&crop=smart&auto=webp&s=7f8dd0b0202b708a1a4c1a5acd126af1776ca755",
  "https://preview.redd.it/6x4o8fshhvi71.png?width=960&crop=smart&auto=webp&s=463086bc80f149144d9f1fecd24e4e481149ba1b",
  "https://external-preview.redd.it/eRohIMX0_gZlmiSLTEDyRUVmw7V9WGLbn4I3RPY7cNs.png?width=960&crop=smart&auto=webp&s=a1ef1b0c05101f21ef729e02d04cb174f84ceaea"
];

let currentPos = 0;

document.getElementById("next").addEventListener("click", loadNextImage);
document.getElementById("prev").addEventListener("click", loadPrevImage);
document.getElementById("showcase").addEventListener("animationend", removeClass);

// wie macht man das mit variablen argumenten und this?

hideControls();

function loadNextImage() {
  if (currentPos < IMG_URLS.length - 1) {
    document.getElementById("showcase").style.background = `url(${IMG_URLS[++currentPos]})`;
    document.getElementById("showcase").classList.add("rotate");
    document.getElementById("showcase-description").classList.add("rotate");
  }
 
  hideControls();
}

function loadPrevImage() {
  if (currentPos > 0) {
    document.getElementById("showcase").style.background = `url(${IMG_URLS[--currentPos]})`;
    document.getElementById("showcase").classList.add("rotate");
    document.getElementById("showcase-description").classList.add("rotate");
  }
  
  hideControls();
}

function removeClass() {
  document.getElementById("showcase").classList.remove("rotate");
  document.getElementById("showcase-description").classList.remove("rotate");
}

function hideControls() {
  document.getElementById("next").style.visibility = "visible";
  document.getElementById("prev").style.visibility = "visible";
  
  if (currentPos === IMG_URLS.length - 1) {
    document.getElementById("next").style.visibility = "hidden";
  } 
  
  if (currentPos === 0) {
    document.getElementById("prev").style.visibility = "hidden";
  }
}