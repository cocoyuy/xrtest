let mirror;
let textureCube;
let texture;

const WORLD_HALF = 1000;
const MOUNTAIN = 600;
let plane;
let lights = [];
let room;

let textGroup;
let texts = ['equivocal', 'lucid', 'precipitate', 'assuage', 'erudite', 'enigma', 'placate', 'zeal', 'audacious', 'gullible', 'pedant',
  'vacillate', 'capricious', 'loquacious', 'pragmatic', 'volatile', 'ephemeral', 'laconic', 'cacophony', 'enervate', 'ingenuous',
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

let params = {
  // (add)
  drawCount: 0
};

const MAX_PARTICLE_NUMBER = 600;
let pointCloud;
let particles = [];
let color7;

const WORLD_SIZE = 2000;
let fireworks = [];
let gravity;
let fire = false;

const FB_SIZE = 8.0;
let football;
let objects = [];

var clock = new THREE.Clock(); var duration = 5; var currentTime = 0;
const TRANS1 = 7; const TRANS2 = TRANS1 + 3; const TRANS3 = TRANS2 + 26; const TRANS4 = TRANS3 + 40;
const TRANS5 = TRANS4 + 40;

function setupThree() {
  // WebXR
  setupWebXR();

  room = getSphere();
  scene.add(room);

  // enable shadow
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

  gravity = createVector(0, -0.07, 0);

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
  mirror.position.y = -200;

  getFootballModel("assets/football/scene.gltf");

}

function updateThree() {
  // Update time
  var delta = clock.getDelta();
  currentTime += delta;

  // football.visible = false;
  textGroup.visible = false;
  mirror.visible = false;

  if (currentTime < TRANS1) {
    // football.visible = true;

    let R_offset = map(currentTime, 0, TRANS1, 250, 137);
    let G_offset = map(currentTime, 0, TRANS1, 207, 242);
    let B_offset = map(currentTime, 0, TRANS1, 137, 250);
    const roomColor = new THREE.Color(R_offset / 250, G_offset / 250, B_offset / 250);
    room.material.color = roomColor;

    if (football !== undefined) {
      football.scale.x = FB_SIZE;
      football.scale.y = FB_SIZE;
      football.scale.z = FB_SIZE;
      // if (play1) {
      //   model.rotation.y += 0.005;
      // }
    }

    // generate cubes by controller
    if (controller.userData.isSelecting === true) {
      // controller's position and direction
      const position = controller.position;
      const direction = new THREE.Vector3(0, 0, -1); // default direction
      direction.applyQuaternion(controller.quaternion); // apply the rotation of the controller 

      // generate a cube using the position and direction      
      let object = new RandomObj()
        .setPosition(position.x, position.y, position.z)
        .setVelocity(direction.x, direction.y, direction.z)
        .setRotationVelocity(random(-0.05, 0.05), random(-0.05, 0.05), random(-0.05, 0.05))
        .setScale(random(0.5, 1.0));
      objects.push(object);
    }
  }

  if (text_rotate) {
    // console.log("rotate");
    textGroup.rotation.y += 0.004; // rotate around the world center
  }

  if (fire) {
    for (let i = 0; i < 2; i++) {
      fireworks.push(new Firework(true));
    }
  }
  if (random(1) < 0.02) {
    fireworks.push(new Firework(false));
  }
  for (let f of fireworks) {
    f.update();
    f.show();
  }

}

function updateCamera() {
  camera.updateProjectionMatrix();
}

function getSphere() {
  const geometry = new THREE.SphereGeometry(1000, 32, 32); // 6
  const material = new THREE.MeshBasicMaterial({
    color: 0xfa9bdf, //color7
    side: THREE.DoubleSide
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

function getFootballModel(filepath) {
  const loader = new GLTFLoader();
  loader.load(
    filepath,
    function (gltfData) {
      football = gltfData.scene.children[0].children[0].children[1].children[0];
      console.log(football);
      football.material = new THREE.MeshMatcapMaterial({ //
      });
      // scene.add(football);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (err) {
      console.error('An error happened');
    }
  );
}

function getFootball() {
  let footballGroup = new THREE.Group();
  const ballColor = new THREE.Color(random(0, 1), random(0, 1), random(0, 1));
  let geometry = new THREE.SphereGeometry(FB_SIZE - 0.1);
  let material = new THREE.MeshBasicMaterial({
    // wireframe: true
    color: ballColor
  });
  let mesh = new THREE.Mesh(geometry, material);
  footballGroup.add(football);
  footballGroup.add(mesh);
  return footballGroup;
}

function getFirework() {
  let geometry = new THREE.SphereGeometry(1);
  let material = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 1.0
  });
  let mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  return mesh;
}

class Firework {
  constructor(user) {
    this.firework = new fParticle()
      .setPosition(random(-600, 600), 0, 600)
      .setVelocity(0, random(7, 9), 0)
      .setScale(5);
    this.exploded = false;
    this.particles = [];
    this.isUser = user;
  }
  update() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();
      if (this.firework.vel.y <= 0) {
        this.exploded = true;
        scene.remove(this.firework.mesh);
        this.explode();
      }
    }
    for (let f of this.particles) {
      f.applyForce(gravity);
      f.update();
      f.lifespan -= 0.008;
      f.mesh.material.opacity = f.lifespan;
      if (f.lifespan <= 0) {
        scene.remove(f.mesh);
      }
    }
  }
  explode() {
    let pc;
    if (this.isUser) { pc = new THREE.Color(random(1), random(1), random(1)); }
    else { pc = new THREE.Color(1, 1, 1); }
    for (let i = 0; i < 300; i++) {
      let p = new fParticle()
        .setPosition(this.firework.pos.x, this.firework.pos.y, this.firework.pos.z)
        .setVelocity(0, random(5, 9), 0)
        .setScale(5);
      p.mesh.material.color = pc;
      p.vel = p5.Vector.random3D();
      p.vel.mult(0.85); //random(1, 6)
      this.particles.push(p);
    }
  }
  show() {
    if (!this.exploded) {
      this.firework.show();
    }
    for (let f of this.particles) {
      f.show();
    }
  }
}

class fParticle {
  constructor() {
    this.pos = createVector();
    this.vel = createVector();
    this.acc = createVector();
    this.scl = createVector(1, 1, 1);
    this.mass = this.scl.x * this.scl.y * this.scl.z;
    this.mesh = getFirework();
    this.exploded = false;
    this.particles = [];
    this.lifespan = 1.0;
  }
  setPosition(x, y, z) {
    this.pos = createVector(x, y, z);
    return this;
  }
  setVelocity(x, y, z) {
    this.vel = createVector(x, y, z);
    return this;
  }
  setScale(w, h = w, d = w) {
    const minScale = 0.01;
    if (w < minScale) w = minScale;
    if (h < minScale) h = minScale;
    if (d < minScale) d = minScale;
    this.scl = createVector(w, h, d);
    this.mass = this.scl.x * this.scl.y * this.scl.z;
    return this;
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  applyForce(f) {
    // let force = f.copy();
    // force.div(this.mass);
    this.acc.add(f);
  }
  show() {
    this.mesh.position.set(this.pos.x, this.pos.y, this.pos.z);
  }
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

class RandomObj {
  constructor() {
    this.pos = createVector();
    this.vel = createVector();
    this.acc = createVector();

    this.scl = createVector(1, 1, 1);
    this.mass = this.scl.x * this.scl.y * this.scl.z;

    this.rot = createVector();
    this.rotVel = createVector();
    this.rotAcc = createVector();

    this.lifespan = 1.0;
    this.lifeReduction = random(0.005, 0.010);
    this.isDone = false;
    //

    this.mesh = getFootball();
    scene.add(this.mesh);
  }
  setPosition(x, y, z) {
    this.pos = createVector(x, y, z);
    return this;
  }
  setVelocity(x, y, z) {
    this.vel = createVector(x, y, z);
    return this;
  }
  setRotationAngle(x, y, z) {
    this.rot = createVector(x, y, z);
    return this;
  }
  setRotationVelocity(x, y, z) {
    this.rotVel = createVector(x, y, z);
    return this;
  }
  setScale(w, h = w, d = w) {
    const minScale = 0.01;
    if (w < minScale) w = minScale;
    if (h < minScale) h = minScale;
    if (d < minScale) d = minScale;
    this.scl = createVector(w, h, d);
    this.mass = this.scl.x * this.scl.y * this.scl.z;
    return this;
  }
  move() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  rotate() {
    this.rotVel.add(this.rotAcc);
    this.rot.add(this.rotVel);
    this.rotAcc.mult(0);
  }
  applyForce(f) {
    let force = f.copy();
    force.div(this.mass);
    this.acc.add(force);
  }
  reappear() {
    if (this.pos.z > WORLD_SIZE / 2) {
      this.pos.z = -WORLD_SIZE / 2;
    }
  }
  disappear() {
    if (this.pos.z > WORLD_SIZE / 2) {
      this.isDone = true;
    }
  }
  age() {
    this.lifespan -= this.lifeReduction;
    if (this.lifespan <= 0) {
      this.lifespan = 0;
      this.isDone = true;
    }
  }
  update() {
    this.mesh.position.set(this.pos.x, this.pos.y, this.pos.z);
    this.mesh.rotation.set(this.rot.x, this.rot.y, this.rot.z);

    let newScale = p5.Vector.mult(this.scl, this.lifespan);
    this.mesh.scale.set(newScale.x, newScale.y, newScale.z);
  }
}