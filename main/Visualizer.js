"use strict";

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

ctx.canvas.width  = 0.78*document.body.clientWidth*window.devicePixelRatio;
ctx.canvas.height = 100;

ctx.moveTo(0,0);
ctx.lineTo(200,100);
ctx.stroke();
