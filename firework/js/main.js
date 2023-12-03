const WORLD_SIZE = 2000;
let fireworks = [];
let gravity;
let fire = false;
let room;
let fireworkSound;

function setupThree() {
  // WebXR
  setupWebXR();
  gravity = createVector(0, -0.07, 0);
  getFireworkSound('assets/firework.mp3');
  room = getSphere();
  scene.add(room);
}

function updateThree() {
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
  const geometry = new THREE.SphereGeometry(800, 32, 32); // 6
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
    fireworkSound.play();
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

