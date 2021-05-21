
// header

const body = document.body;
const triggerMenu = document.querySelector(".page-header .trigger-menu");
const menu = document.querySelector("header");
const scrollUp = "scroll-up";
const scrollDown = "scroll-down";
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    body.classList.remove(scrollUp);
    return;
  }

  if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
    // down
    body.classList.remove(scrollUp);
    body.classList.add(scrollDown);
  } else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
    // up
    body.classList.remove(scrollDown);
    body.classList.add(scrollUp);
  }
  lastScroll = currentScroll;
});


const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}
const navLink = document.querySelectorAll(".nav-item");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}



// scrollTo

document.querySelectorAll(".link").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    gsap.to(window, {duration: 1, scrollTo:{y:"#section" + (index + 1), offsetY:70}});
  });
});

let arrow = document.getElementById("arrow");
arrow.addEventListener("click", () => {
  gsap.to(window, {duration: 1, scrollTo:{y:"#section1", offsetY:70}});
});



// tabs

gsap.set('#tab-nav', {autoAlpha:1})

var container = document.querySelector("#container");
var sections = gsap.utils.toArray(".tab-section");
var section = document.querySelector(".tab-section");
var buttons = gsap.utils.toArray(".tab-button");


buttons.forEach(function(elem,i) {
  elem.addEventListener("click", function() {
    gsap.to(container, 0, {
      x: () => -(section.offsetWidth*i) + "px",
    })
    gsap.set(buttons, {borderBottom:"0px solid #FFFFFF"})
    gsap.set(buttons[i], {borderBottom:"3px solid #FFFFFF"})
  })
});


//lottiefile


let animData = {
  container: document.getElementById('svg'),
  renderer: "svg",
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid meet",
    imagePreserveAspectRatio: "xMidYMid meet"
  },
  path: "https://assets1.lottiefiles.com/packages/lf20_eoqh92fl/Hero/data.json"
};

let anim;
anim = lottie.loadAnimation(animData);

let animSlideOne = {
  container: document.getElementById('anim-slide-1'),
  renderer: "svg",
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid meet",
    imagePreserveAspectRatio: "xMidYMid meet"
  },
  path: "https://assets2.lottiefiles.com/packages/lf20_fysbxhxg/1 - What is ABSA/data.json"
};


let anim_slide_1;
anim_slide_1 = lottie.loadAnimation(animSlideOne);


let animSlideTwo = {
  container: document.getElementById('anim-slide-2'),
  renderer: "svg",
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid meet",
    imagePreserveAspectRatio: "xMidYMid meet"
  },
  path: "https://assets6.lottiefiles.com/packages/lf20_tqhdmo0k/2 - Why aspects are important/data.json"
};

let anim_slide_2;
anim_slide_2 = lottie.loadAnimation(animSlideTwo);

let animSlideThree = {
  container: document.getElementById('anim-slide-3'),
  renderer: "svg",
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid meet",
    imagePreserveAspectRatio: "xMidYMid meet"
  },
  path: "https://assets5.lottiefiles.com/packages/lf20_kkphudl2/3 - The project/data.json"
};

let anim_slide_3;
anim_slide_3 = lottie.loadAnimation(animSlideThree);

let animSlideFour = {
  container: document.getElementById('anim-slide-4'),
  renderer: "svg",
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid meet",
    imagePreserveAspectRatio: "xMidYMid meet"
  },
  path: "https://assets1.lottiefiles.com/packages/lf20_msvwswvy/4 - From aspects to topics/data.json"
};

let anim_slide_4;
anim_slide_4 = lottie.loadAnimation(animSlideFour);


anim.addEventListener('DOMLoaded', setHeight);


function setHeight(){
  let animWrap = document.getElementById('svg');
  let anim = animWrap.getElementsByTagName('svg');
  anim[0].setAttribute("viewBox", "");
  // anim[0].style.width = "100vw";
  // anim[0].style.height = "100vh";
  // anim[0].style.minHeight = "100vh";
}






// horizontal drag on bumpcharts

const slider = document.querySelectorAll('.bump-overflow');
let isDown = false;
let startX;
let scrollLeft;

slider.forEach((item, i) => {
  item.addEventListener('mousedown', (e) => {
    isDown = true;
    item.classList.add('active');
    startX = e.pageX - item.offsetLeft;
    scrollLeft = item.scrollLeft;
  });
  item.addEventListener('mouseleave', () => {
    isDown = false;
    item.classList.remove('active');
  });
  item.addEventListener('mouseup', () => {
    isDown = false;
    item.classList.remove('active');
  });
  item.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - item.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    item.scrollLeft = scrollLeft - walk;
  });
});
