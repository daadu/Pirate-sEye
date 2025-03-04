var canvas = document.getElementById("canvas");
canvas.width=600;canvas.height=480;
var context = canvas.getContext("2d");
var imglist = document.getElementById("imglist");
//var img = document.getElementById("image");
var video = document.getElementById("video");

navigator.getUserMedia = navigator.getUserMedia ||navigator.webkitGetUserMedia ||navigator.mozGetUserMedia || navigator.msGetUserMedia;

window.addEventListener("load",windowLoaded,false);
function windowLoaded(){
	if(!!navigator.getUserMedia){
		init();
	}else{
		fail();
	}

	function init(){
		navigator.getUserMedia({video: true, audio: false}, camfeed, fail);
		video.addEventListener("click",videoClicked,false)
	}
	function camfeed(userMedia){
		video.srcObject = userMedia;
		video.style.transform = "scaleX(-1)";
    	video.style.webkitTransform = "scaleX(-1)"; // For older browsers
    	video.style.mozTransform = "scaleX(-1)"; // For Firefox
	}
	function videoClicked(){
		// Flip the canvas context
		context.save(); // Save current context state
		context.translate(canvas.width, 0); // Move context to the right
		context.scale(-1, 1); // Mirror horizontally
		// Draw the video frame
		context.drawImage(video, 0, 0, canvas.width, canvas.height);
		// Restore the context to avoid affecting future drawings
		context.restore();

		// Convert canvas to image
		var link = document.createElement("a");
		var img = new Image();
		img.onload = function() {
			link.href = img.src;
			link.appendChild(img);
			imglist.appendChild(link);
		};
		img.src = canvas.toDataURL();
	}
	function fail(){
		alert("App not supported. Sorry!");
	}
}
