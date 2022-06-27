var gui = new dat.GUI({
  autoPlace: false,
  width: 0.18*document.body.clientWidth
});

class ImageHandler {
  Upload() {
    console.log("uploading image")

    var canvas = document.getElementById('imageCanvas');
    var ctx = canvas.getContext('2d');
    //ctx.canvas.width  = 0.78*document.body.clientWidth*window.devicePixelRatio;
    //ctx.canvas.height = ctx.canvas.width/aspectRatio;

  //  console.log(ctx.canvas.width)

  let input = document.createElement('input');
  input.addEventListener('change', handleImage, false);
    input.type = 'file';
    input.click();

    var reader = new FileReader();
    reader.onload = function(event){
      console.log("load image here");
    }
    //reader.readAsDataURL(input.files);

    var img = new Image();
    img.onload = function(){
      ctx.drawImage(img, 0, 0);
    }
    img.src = input.files;

  }

};
handler = new ImageHandler()

var imageMenu = gui.addFolder('Background images');
imageMenu.add(handler, "Upload").name("Upload image");

var text = {
  message: 'dat.gui',
  speed: 0.8,
  displayOutline: false,
};

var menu = gui.addFolder('folder');
menu.add(text, 'message');
menu.add(text, 'speed', -5, 5);
menu.add(text, 'displayOutline');

var customContainer = document.getElementById('menu-gui-container');
customContainer.appendChild(gui.domElement);
