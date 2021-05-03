
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
  console.log(btn);
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
    gsap.to(container, .3, {
      x: () => -(section.offsetWidth*i) + "px",
    })
    gsap.set(buttons, {borderBottom:"0px solid #FFFFFF"})
    gsap.set(buttons[i], {borderBottom:"3px solid #FFFFFF"})
  })
});
