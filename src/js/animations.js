
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



gsap.defaults({ overwrite: "auto" });

gsap.set(".vert-timeline__img-wrap > *", { xPercent: -50, yPercent: -50 });

const contentMarkers = gsap.utils.toArray(".vert-timeline__text");

// Set up our scroll trigger
const ST = ScrollTrigger.create({
  trigger: ".vert-timeline__wrap",
  start: "top top",
  end: "bottom bottom",
  onUpdate: getCurrentSection,
  pin: ".vert-timeline__img-wrap",
  pinSpacing: false
});

//sets up the class toggle on each scrolling text box
//so that it becomes opaque when in view and transparent when exiting
gsap.utils.toArray('.vert-timeline__text').forEach(step => {
  ScrollTrigger.create({
    trigger: step,
    start: 'top 60%',
    end: 'center top',
    toggleClass: 'active',
    markers: false,
    id: 'toggle-active-class'
  });
});

// Set up our content behaviors
contentMarkers.forEach((marker) => {
  marker.content = document.querySelector(`#${marker.dataset.markerContent}`);
  marker.content.enter = function () {
    gsap.fromTo(
      marker.content,
      { autoAlpha: 0 },
      { duration: 0, autoAlpha: 1 }
    );
  };

  marker.content.leave = function () {
    gsap.to(marker.content, { duration: 0.1, autoAlpha: 0 });
  };

});


// Handle the updated position
let lastContent;
function getCurrentSection() {
  let newContent;
  const currScroll = scrollY;

  // Find the current section
  contentMarkers.forEach((marker) => {
    if (currScroll > marker.y) {
      newContent = marker.content;
    }
  });

  // If the current section is different than that last, animate in
  if (
    newContent &&
    (lastContent == null || !newContent.isSameNode(lastContent))
  ) {
    // Fade out last section
    if (lastContent) {
      lastContent.leave();
    }

    // Animate in new section
    newContent.enter();

    lastContent = newContent;
  }
}

const media = window.matchMedia("screen and (max-width: 600px)");
ScrollTrigger.addEventListener("refreshInit", checkSTState);
checkSTState();

function checkSTState() {
  contentMarkers.forEach((marker) => {
    marker.y = marker.getBoundingClientRect().top;
  });

  if (media.matches) {
    ST.disable();
  } else {
    ST.enable();
  }
}

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



// horizontal scroll

gsap.set('nav', {autoAlpha:1, xPercent:-50})

var container = document.querySelector("#container");
var sections = gsap.utils.toArray("section");
var section = document.querySelector("section");
var buttons = gsap.utils.toArray("button");

gsap.timeline({
  scrollTrigger: {
    scroller: "main",
    trigger: "#container",
    start: "top top",
    pin: true,
    scrub: true,
    invalidateOnRefresh: true,
    end: () => "+=" + (container.offsetWidth - innerWidth + 1)
  },
  defaults:{duration:1, ease:'none'}
})
  .to(container, {
  x: () => -(container.offsetWidth - innerWidth) + "px"
})

  .to(buttons, {borderBottom:"3px solid #FFFFFF", duration:0, stagger:0.33},0) //stagger = 1 / number of sections
  .to(buttons, {borderBottom:"0px solid #FFFFFF", duration:0, stagger:0.33},0.33)


buttons.forEach(function(elem,i) {
  elem.addEventListener("click", function() {
    gsap.to(container, {
      x: () => -(section.offsetWidth*i) + "px",
    })
    gsap.set(buttons, {borderBottom:"0px solid #FFFFFF"})
    gsap.set(buttons[i], {borderBottom:"3px solid #FFFFFF"})
  })
});
