
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

// gsap.set('nav', {autoAlpha:1, xPercent:-50})
//
// var container = document.querySelector("#container");
// var sections = gsap.utils.toArray("section");
// var section = document.querySelector("section");
// var buttons = gsap.utils.toArray("button");
//
//
// buttons.forEach(function(elem,i) {
//   elem.addEventListener("click", function() {
//     gsap.to(container, {
//       x: () => -(section.offsetWidth*i) + "px",
//     })
//     gsap.set(buttons, {borderBottom:"0px solid #FFFFFF"})
//     gsap.set(buttons[i], {borderBottom:"3px solid #FFFFFF"})
//   })
// });



// horizontal scroll left

var controller = new ScrollMagic.Controller();

		var wipeAnimation = new TimelineMax()
			// animate to second panel
			.to("#slideContainer", 0.5, {z: -50})		// move back in 3D space
			.to("#slideContainer", 1,   {x: "-33.33%"})	// move in to first panel
			.to("#slideContainer", 0.5, {z: 0})				// move back to origin in 3D space
			// animate to third panel
			.to("#slideContainer", 0.5, {z: -50, delay: 1})
			.to("#slideContainer", 1,   {x: "-66.66%"})
			.to("#slideContainer", 0.5, {z: 0})


		// create scene to pin and link animation
		new ScrollMagic.Scene({
				triggerElement: "#pinContainer",
				triggerHook: "onLeave",
				duration: "500%"
			})
			.setPin("#pinContainer")
			.setTween(wipeAnimation)
			.addTo(controller);


// horizontal scroll right
      var controllerTwo = new ScrollMagic.Controller();

      		var wipeAnimationTwo = new TimelineMax()
      			// animate to second panel
      			.to("#slideContainerTwo", 0.5, {z: -50})		// move back in 3D space
      			.to("#slideContainerTwo", 1,   {x: "-33.33%"})	// move in to first panel
      			.to("#slideContainerTwo", 0.5, {z: 0})				// move back to origin in 3D space
      			// animate to third panel
      			.to("#slideContainerTwo", 0.5, {z: -50, delay: 1})
      			.to("#slideContainerTwo", 1,   {x: "-66.66%"})
      			.to("#slideContainerTwo", 0.5, {z: 0})


      		// create scene to pin and link animation
      		new ScrollMagic.Scene({
      				triggerElement: "#pinContainerTwo",
      				triggerHook: "onLeave",
      				duration: "500%"
      			})
      			.setPin("#pinContainerTwo")
      			.setTween(wipeAnimationTwo)
      			.addTo(controllerTwo);



// variation
// init Isotope

var iso = new Isotope( '.grid', {
  itemSelector: '.element-item',
  layoutMode: 'fitRows'
});


var filtersElem = document.querySelector('.filters-button-group');
filtersElem.addEventListener( 'click', function( event ) {
  if ( !matchesSelector( event.target, 'button' ) ) {
    return;
  }
  var filterValue = event.target.getAttribute('data-filter');
  iso.arrange({ filter: filterValue });
});

var buttonGroups = document.querySelectorAll('.button-group');
for ( var i=0, len = buttonGroups.length; i < len; i++ ) {
  var buttonGroup = buttonGroups[i];
  radioButtonGroup( buttonGroup );
}

function radioButtonGroup( buttonGroup ) {
  buttonGroup.addEventListener( 'click', function( event ) {
    if ( !matchesSelector( event.target, 'button' ) ) {
      return;
    }
    buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
    event.target.classList.add('is-checked');
  });
}
