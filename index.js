console.log('1');

var 
  canv = document.querySelector('canvas'),
  ctx  = canv.getContext('2d');

canv.width = window.innerWidth;
canv.height = window.innerHeight;

// Code
ctx.fillStyle = 'magenta';
ctx.fillRect(50, 50, 300, 200);
