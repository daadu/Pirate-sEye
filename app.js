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
	}
	function videoClicked(){
		context.drawImage(video,0,0);
		var link = document.createElement("a");
		var img = new Image();
		img.onload = function(){
			link.href = img.src;
			link.appendChild(img)
			imglist.appendChild(link);
		};
		img.src = canvas.toDataURL();
	}
	function fail(){
		alert("App not supported. Sorry!");
	}
}
