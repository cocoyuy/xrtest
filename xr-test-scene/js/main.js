let mirror;
let textureCube;
let texture;

const WORLD_HALF = 1000;
const MOUNTAIN = 600;
let plane;
let lights = [];
let room;

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
  'gullible',
  'equivocal',
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
  'equivocal',
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
  'pedant'
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
let color7;

function setupThree() {
  // WebXR
  setupWebXR();

  room = getSphere();
  scene.add(room);

  // enable shadow
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

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

  // mirror
  mirror = getMirror();
  mirror.position.y = -20;

}

function updateThree() {
  color7 = new THREE.Color(1, 179 / 250, 239 / 250);
  scene.background = color7;

  if (text_rotate) {
    // console.log("rotate");
    textGroup.rotation.y += 0.004; // rotate around the world center
  }
}

function updateCamera() {
  camera.updateProjectionMatrix();
}

function getSphere() {
  const geometry = new THREE.SphereGeometry(600, 32, 32); // 6
  const material = new THREE.MeshBasicMaterial({
    color: 0xfa9bdf, //color7
    side: THREE.DoubleSide
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
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