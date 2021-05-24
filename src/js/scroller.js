document.addEventListener("DOMContentLoaded", function(){
  // horizontal scroll left
  let desktop = false;
  if(window.innerWidth > 1080){
    desktop = true;
  }
  window.addEventListener('resize', function(){
    if(window.innerWidth > 1080){
      desktop = true;
    }
  });


  var controller = new ScrollMagic.Controller();
      var wipeAnimation = new TimelineMax()
        // animate to second panel
        .to("#slideContainer", 0.5, {z: -150})		// move back in 3D space
        			.to("#slideContainer", 1,   {x: "-25%"})	// move in to first panel
        			.to("#slideContainer", 0.5, {z: 0})				// move back to origin in 3D space
        			// animate to third panel
        			.to("#slideContainer", 0.5, {z: -150, delay: 1})
        			.to("#slideContainer", 1,   {x: "-50%"})
        			.to("#slideContainer", 0.5, {z: 0})
        			// animate to forth panel
        			.to("#slideContainer", 0.5, {z: -150, delay: 1})
        			.to("#slideContainer", 1,   {x: "-75%"})
        			.to("#slideContainer", 0.5, {z: 0});


      // create scene to pin and link animation
      new ScrollMagic.Scene({
          triggerElement: "#pinContainer",
          triggerHook: "onLeave",
          duration: "600%"
        })
        .setPin("#pinContainer")
        .setTween(wipeAnimation)
        .addTo(controller);


  function detectmob() {
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}

    if(desktop){
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
    }


});
