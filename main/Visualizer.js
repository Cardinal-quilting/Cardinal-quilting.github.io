"use strict";

var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');
ctx.canvas.width  = 0.78*document.body.clientWidth*window.devicePixelRatio;
ctx.canvas.height = ctx.canvas.width/aspectRatio;
document.body.appendChild(canvas);

// save relevant information about shapes drawn on the canvas
var shapes=[];

// used to calc canvas position relative to window
function reOffset(){
    var BB=canvas.getBoundingClientRect();
    offsetX=BB.left;
    offsetY=BB.top;
}
var offsetX, offsetY;
reOffset();

var img = new Image();

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        img.onload = function(){

            ctx.drawImage(img, 0, 0);
            console.log("load image 2");
            canvas.onmousedown = handleMouseDown;
            canvas.onmouseup = handleMouseUp;
            canvas.onmousemove = handleMouseMove;
            canvas.onmouseout = handleMouseOut;

            // define one image and save it in the shapes[] array
            shapes.push( {x:0, y:0, width:img.width, height:img.height, image:img} );
        }
        console.log(event.target.result)
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

// drag related vars
var isDragging=false;
var startX,startY;

// hold the index of the shape being dragged (if any)
var selectedShapeIndex;

// given mouse X & Y (mx & my) and shape object
// return true/false whether mouse is inside the shape
function isMouseInShape(mx, my, shape){
    // is this shape an image?
    if(shape.image){
        // this is a rectangle
        var rLeft=shape.x;
        var rRight=shape.x+shape.width;
        var rTop=shape.y;
        var rBott=shape.y+shape.height;
        // math test to see if mouse is inside image
        if( mx>rLeft && mx<rRight && my>rTop && my<rBott){
            return(true);
        }
    }
    // the mouse isn't in any of this shapes
    return(false);
}

function handleMouseOut(e){
  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();

  console.log("mouse out");
}

function handleMouseMove(e){
  // return if we're not dragging
    if(!isDragging){return;}
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();
    // calculate the current mouse position
    var mouseX=parseInt(e.clientX-offsetX);
    var mouseY=parseInt(e.clientY-offsetY);
    // how far has the mouse dragged from its previous mousemove position?
    var dx=mouseX-startX;
    var dy=mouseY-startY;
    // move the selected shape by the drag distance
    var selectedShape=shapes[selectedShapeIndex];
    selectedShape.x+=dx;
    selectedShape.y+=dy;
    // clear the canvas and redraw all shapes
    //drawAll();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(img, selectedShape.x, selectedShape.y);

    // update the starting drag position (== the current mouse position)
    startX=mouseX;
    startY=mouseY;

  console.log("mouse move: ("+mouseX+","+mouseY+")");
}

function handleMouseDown(e){
  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();

  // calculate the current mouse position
  startX = parseInt(e.clientX-offsetX);
  startY = parseInt(e.clientY-offsetY);

  // test mouse position against all shapes
    // post result if mouse is in a shape
    for(var i=0;i<shapes.length;i++){
        if(isMouseInShape(startX,startY,shapes[i])){
            // the mouse is inside this shape
            // select this shape
            selectedShapeIndex=i;
            // set the isDragging flag
            isDragging=true;
            // and return (==stop looking for
            //     further shapes under the mouse)
            return;
        }
    }

  console.log("mouse down: ("+startX+","+startY+")");
}

function handleMouseUp(e){
  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();

  isDragging = false;

  console.log("mouse up");
}

img.addEventListener("mouseover", mouseOver);
img.addEventListener("mouseout", mouseOut);

function mouseOver() {
  console.log("hi");
}

function mouseOut() {
  console.log("hi");
}

//ctx.moveTo(0,0);
//ctx.lineTo(200,100);
//ctx.stroke();
