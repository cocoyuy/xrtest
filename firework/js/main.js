const WORLD_SIZE = 2000;
let fireworks = [];
let gravity;
let fire = false;
let room;
let fireworkSound;
// let particles = [];
const MAX_PARTICLE_NUMBER = 6;

function setupThree() {
  // WebXR
  setupWebXR();
  gravity = createVector(0, -0.07, 0);
  getFireworkSound('assets/firework.mp3');
  room = getSphere();
  scene.add(room);
  // Points
  pointCloud = getPoints(MAX_PARTICLE_NUMBER);
  scene.add(pointCloud);
}

function updateThree() {
  // user interaction
  if (fire) {
    // for (let i = 0; i < 2; i++) {
    //   fireworks.push(new Firework(true));
    // }
    for (let i = 0; i < 2; i++) {
      let tParticle = new Firework(false);
      fireworks.push(tParticle);
    }
  }

  // generate more particles
  // if (random(1) < 0.02) {
  //   fireworks.push(new Firework(false));
  // }
  if (fireworks.length < MAX_PARTICLE_NUMBER) {
    let tParticle = new Firework(false);
    fireworks.push(tParticle);
  }

  // update the firework
  for (let i = 0; i < fireworks.length; i++) {
    let f = fireworks[i];
    f.update();
  }
  // for (let f of fireworks) {
  //   f.update();
  //   // f.show();
  // }

  // then update the points
  let positionArray = pointCloud.geometry.attributes.position.array;
  let colorArray = pointCloud.geometry.attributes.color.array;
  for (let i = 0; i < fireworks.length; i++) {
    let p = fireworks[i];
    let ptIndex = i * 3;
    // position
    positionArray[ptIndex + 0] = p.pos.x;
    positionArray[ptIndex + 1] = p.pos.y;
    positionArray[ptIndex + 2] = p.pos.z;
    //color
    colorArray[ptIndex + 0] = 1.0 * p.lifespan;
    colorArray[ptIndex + 1] = 0.5 * p.lifespan;
    colorArray[ptIndex + 2] = 0.1 * p.lifespan;
  }
  pointCloud.geometry.setDrawRange(0, fireworks.length); // ***
  pointCloud.geometry.attributes.position.needsUpdate = true;
  pointCloud.geometry.attributes.color.needsUpdate = true;
}

// event listeners
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

function onKeyDown(event) {
  // controls.lock(); // *** this should be triggered by user interaction
  switch (event.code) {
    case 'Space':
      fire = true;
      console.log("user firework");
      break;
  }
};

function onKeyUp(event) {
  switch (event.code) {
    case 'Space':
      fire = false;
      break;
  }
};

function getPoints(number) {
  const vertices = new Float32Array(number * 3);
  const colors = new Float32Array(number * 3);

  // geometry
  const geometry = new THREE.BufferGeometry();
  // attributes
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  // draw range
  const drawCount = number; // draw the whole objects
  geometry.setDrawRange(0, drawCount);
  // geometry
  // const texture = new THREE.TextureLoader().load('assets/particle_texture.jpg');
  const material = new THREE.PointsMaterial({
    //color: 0xFF9911,
    vertexColors: true,
    size: 0.1,
    sizeAttenuation: true, // default
    opacity: 0.9,
    transparent: true,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    // map: texture
  });
  // Points
  const points = new THREE.Points(geometry, material);
  return points;
}

function getFireworkSound(path) {
  const audioListener = new THREE.AudioListener();
  camera.add(audioListener);
  fireworkSound = new THREE.Audio(audioListener);
  scene.add(fireworkSound);
  const sloader = new THREE.AudioLoader();
  sloader.load(
    path,
    function (audioBuffer) {
      fireworkSound.setBuffer(audioBuffer);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (err) {
      console.log('An error happened');
    }
  );
}

function getSphere() {
  const geometry = new THREE.SphereGeometry(1000, 32, 32); // 6
  const material = new THREE.MeshBasicMaterial({
    color: 0x575757,
    side: THREE.DoubleSide
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
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
      .setPosition(random(-300, 300), -200, -600)
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
    // fireworkSound.play();
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
  // show() {
  //   if (!this.exploded) {
  //     this.firework.show();
  //   }
  //   for (let f of this.particles) {
  //     f.show();
  //   }
  // }
}

class fParticle {
  constructor() {
    this.pos = createVector();
    this.vel = createVector();
    this.acc = createVector();
    this.scl = createVector(1, 1, 1);
    this.mass = this.scl.x * this.scl.y * this.scl.z;
    this.mesh = getPoints();
    this.exploded = false;
    this.particles = [];
    this.lifespan = 1.0;
    this.lifeReduction = random(0.001, 0.005);
    this.isDone = false;
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
  // show() {
  //   this.mesh.position.set(this.pos.x, this.pos.y, this.pos.z);
  // }
}

