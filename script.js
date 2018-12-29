 // Arrows
let leftArrow = document.getElementById('left-arrow');
let rightArrow = document.getElementById('right-arrow');
// will use counter to keep track of what image to show next/previous
let count = 0;

let images = document.querySelectorAll('.images'); 

 //Thumbnials  underneath slidecontainer turned into a real array
let thumbNailButtons = Array.prototype.slice.call( document.getElementById('thumbnail-holder').children );



/*this function will be used on each function to wipe our image wrapper clean before displaying next image
and also remove class 'selected' which gives it an opacity of .4 again from the thumbnail button that is being viewed*/
let reset = function(){
	for(let i = 0; i < images.length; i++){
		images[i].style.display = 'none';
		thumbNailButtons[i].classList.remove('selected');
	}
}


// When page is loaded it will give the first thumbnail no opacity to indicate that this is the image user is now viewing
let initThumbnail = function(){
	let thumbnailButton =  document.querySelector('.thumbnails')
	thumbnailButton.classList.add('selected');
}


// Shows first image and gives the first thumbnail no opacity to indicate image being viewed to user 

let startCarousal = function(){
	reset();
	images[0].style.display = 'block';
	initThumbnail();
};

startCarousal();

//Right arrow show next slide
let rightClick = function(){

reset();
	if(count === images.length - 1){
		count = -1;
	}	
	++count;
	images[count].style.display = 'block';
	thumbNailButtons[count].classList.add('selected');
};


//Left arrow to show previous slide
let leftClick = function(){
reset()
	if(count === 0){
		count = images.length;
	}	
	--count;
	images[count].style.display = 'block';
	thumbNailButtons[count].classList.add('selected');
};


if (screen.width < 400) {
	alert("Please use thumbnails to toggle through carousal");
    // auto();
}

//keypad functionality for left', 'right'
let checkKey = function(e) {

    e = e || window.event;

    if(e.keyCode == '37' ) {
       // left arrow
  return leftClick();
    }
    else if (e.keyCode == '39') {
       // right arrow
       rightClick();
    }

    else if (e.keyCode == '32') {
    	//space bar for play/pause carousel
    	autoPlay();
    }
}


// keypad eventlistener
document.addEventListener('keydown', checkKey);
leftArrow.addEventListener('click', leftClick);
rightArrow.addEventListener('click', rightClick);

// giving thumbnails underneath images ability to listen for click
let addEvent = function(index){
	thumbNailButtons[index].addEventListener('click', function(){
	reset();
	thumbNailButtons[index].classList.add('selected');
	images[index].style.display = 'block';
	count=index;});
}

// iterate through thumbnail-holder to fire add event function
thumbNailButtons.forEach(function(slideButton){
    addEvent(thumbNailButtons.indexOf(slideButton));
});

// Carousel button function

let playPause = document.getElementById('play-pause');

let play = true;

let autoPlay = function(){

	if(play === true){
		play = false;
		carouselPlay = setInterval(rightClick, 3000);
		document.getElementById('play-pause').innerHTML = 'Pause Me';
	}

	else{
		play = true;
		clearInterval(carouselPlay);
		document.getElementById('play-pause').innerHTML = 'Play Me';
	}

}

playPause.addEventListener('click', autoPlay);

window.onload = autoPlay;
