var text = {
  message: 'dat.gui',
  speed: 0.8,
  displayOutline: false,
};

var gui = new dat.GUI({
  autoPlace: false,
  width: 0.18*document.body.clientWidth
});
var menu = gui.addFolder('folder');
menu.add(text, 'message');
menu.add(text, 'speed', -5, 5);
menu.add(text, 'displayOutline');

var customContainer = document.getElementById('menu-gui-container');
customContainer.appendChild(gui.domElement);
