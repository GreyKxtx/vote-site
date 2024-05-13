$('.card-container').on('click', function () {
  flipCard();
  resetTimeouts();
  showTab(selectedTab);
});

intervals = [];
initialFlipCard();

var basicTimeline = anime.timeline({
  autoplay: false
});
var pathEls = $(".check");
  for (var i = 0; i < pathEls.length; i++) {
    var pathEl = pathEls[i];
    var offset = anime.setDashoffset(pathEl);
    pathEl.setAttribute("stroke-dashoffset", offset);
  }
  
  basicTimeline
    .add({
      targets: ".text",
      duration: 1,
      opacity: "0"
    })
    .add({
      targets: ".button",
      duration: 1300,
      height: 10,
      width: 300,
      backgroundColor: "#ffffff",
      border: "0",
      borderRadius: 100
    })
    .add({
      targets: ".button-progress-bar",
      duration: 2000,
      width: 300,
      easing: "linear"
    })
    .add({
      targets: ".button",
      width: 0,
      duration: 1
    })
    .add({
      targets: ".button-progress-bar",
      width: 80,
      height: 80,
      delay: 500,
      duration: 750,
      borderRadius: 80,
      backgroundColor: "#66c312"
    })
    .add({
      targets: pathEl,
      strokeDashoffset: [offset, 0],
      duration: 200,
      easing: "easeInOutSine"
    });
  
  $(".button").click(function() {
    basicTimeline.play();
  });
  
  $(".text").click(function() {
    basicTimeline.play();
  });
  
  
  
  $('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    autoplay: true,
    loop: true,
    autoWidth:true,
    responsive:{
        0:{
            items: 3,
        },
        600:{
            items: 3,
        },
        1000:{
            items: 5,
        }
    }
})

function initialFlipCard() {
  intervals.push(setTimeout(() => {
    flipCard();
  }, 600))
  
  intervals.push(setTimeout(() => {
    flipCard();
  }, 1700))
}

function flipCard() {
  $('.flip-card').toggleClass('flipped');
    selectedCardSide = selectedCardSide === 'front' ? 'back' : 'front';
    document.querySelector('#vote-button .text').innerHTML = `Голосовать за ${tabs[selectedTab][selectedCardSide].name}`
}

function resetTimeouts() {
  intervals.map((i) => clearTimeout(i));
}