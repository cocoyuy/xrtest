let mirror;
let textureCube;
let texture;

const WORLD_HALF = 1000;
const MOUNTAIN = 600;
let plane;
let lights = [];

let textGroup;
let texts = ['equivocal',
  'lucid',
  'precipitate',
  'assuage',
  'erudite',
  'enigma',
  'placate',
  'zeal',
  'audacious',
  'gullible',
  'pedant',
  'vacillate',
  'capricious',
  'loquacious',
  'pragmatic',
  'volatile',
  'ephemeral',
  'laconic',
  'cacophony',
  'enervate',
  'ingenuous',
  'misanthrope',
  'venerate',
  'eulogy',
  'lethargic',
  'obdurate',
  'philanthropic',
  'garrulous',
  'malleable',
  'ostentation',
  'prevaricate',
  'prevaricate',
  'eulogy',
  'laconic',
  'loquacious',
  'cacophony',
  'malleable',
  'ephemeral',
  'pedant',
  'gullible'
];
let text_rotate = false;
let tMeshs = [];

let sphereGroup, smallSphere;
let sofa;

let islands = [];
let showers = [];
// let island;

let model; // shower stand
const SHOWER_SIZE = 10.0; //7

let params = {
  // (add)
  drawCount: 0
};

const MAX_PARTICLE_NUMBER = 600;
let pointCloud;
let particles = [];

function setupThree() {
  // WebXR
  setupWebXR();

  // // controls
  // controls = new PointerLockControls(camera, renderer.domElement);
  // scene.add(controls.getObject());

  // // camera position setup
  // camera.position.x = 0;
  // camera.position.z = 0;
  // camera.position.y = 50;

  // enable shadow
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

  // gui
  gui
    .add(camera, "fov")
    .min(1)
    .max(179)
    .step(1)
    .onChange(updateCamera);

  sofa = getSofa();

  textGroup = new THREE.Group();

  // text 
  for (let t of texts) {
    const loader = new FontLoader();
    loader.load('assets/font/Cinzel_Regular.json', function (font) {
      let tMesh = getText(t, font);
      textGroup.add(tMesh);
      // tMeshs.push(tMesh);
    });
  }

  scene.add(textGroup);


  // plane 
  // plane = getPlane();
  // plane.rotation.x = PI / 2 * 3; // add it or not

  // mirror
  mirror = getMirror();
  mirror.position.y = 45;

}

function updateThree() {
  const color7 = new THREE.Color(1, 179 / 250, 239 / 250);
  scene.background = color7;

  if (text_rotate) {
    // console.log("rotate");
    textGroup.rotation.y += 0.004; // rotate around the world center
  }
}

function updateCamera() {
  camera.updateProjectionMatrix();
}

// event listeners
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

function onKeyDown(event) {
  // controls.lock(); // *** this should be triggered by user interaction
  switch (event.code) {
    case 'ArrowUp':
      text_rotate = true;
      // console.log("start rotate");
      break;
  }
};

function onKeyUp(event) {
  switch (event.code) {
    case 'ArrowUp':
      text_rotate = false;
      // console.log("stop rotate");
      break;
  }
};