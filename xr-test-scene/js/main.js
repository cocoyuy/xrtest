const WORLD_SIZE = 2000;
const WORLD_HALF = 1000;
const MOUNTAIN = 600;
let room;
let mirror;

let textGroup; // gre vocabulary
let texts = ['equivocal', 'lucid', 'precipitate', 'assuage', 'erudite', 'enigma', 'placate', 'zeal', 'audacious', 'gullible', 'pedant', 'vacillate', 'capricious', 'loquacious', 'pragmatic', 'volatile', 'ephemeral', 'laconic', 'cacophony', 'enervate', 'ingenuous', 'misanthrope', 'venerate', 'eulogy', 'lethargic', 'obdurate', 'philanthropic', 'garrulous', 'malleable', 'ostentation', 'prevaricate', 'prevaricate', 'eulogy', 'laconic', 'loquacious', 'cacophony', 'malleable', 'ephemeral', 'pedant', 'gullible', 'equivocal', 'lucid', 'precipitate', 'assuage', 'erudite', 'enigma', 'placate', 'zeal', 'audacious', 'gullible', 'pedant', 'vacillate', 'capricious', 'loquacious',
  'pragmatic', 'volatile', 'ephemeral', 'laconic', 'cacophony', 'enervate', 'ingenuous', 'misanthrope', 'venerate', 'eulogy', 'lethargic', 'obdurate', 'philanthropic', 'garrulous', 'malleable', 'ostentation', 'prevaricate', 'prevaricate', 'eulogy', 'laconic', 'loquacious', 'cacophony', 'malleable', 'ephemeral', 'pedant', 'equivocal', 'lucid', 'precipitate', 'assuage', 'erudite', 'enigma', 'placate', 'zeal', 'audacious', 'gullible', 'pedant', 'vacillate',
  'capricious', 'loquacious', 'pragmatic', 'volatile', 'ephemeral', 'laconic', 'cacophony', 'enervate', 'ingenuous', 'misanthrope', 'venerate', 'eulogy', 'lethargic', 'obdurate', 'philanthropic', 'garrulous', 'malleable', 'ostentation', 'prevaricate', 'prevaricate', 'eulogy', 'laconic', 'loquacious', 'cacophony', 'malleable', 'ephemeral', 'pedant'
];
let text_rotate = false; // not used when drag

let textGroup2; let text_rotate2 = false;
let texts2 = ['zero restrictions', 'surging virus', 'XBB', 'high infection', 'new cases', 'outbreaks', 'tested positive', 'deaths', 'the first wave', 'the second wave', '“bad cold”', 'reopening', 'medical care', 'fatalities', 'avoiding Shanghai', 'death rate', 'protests',
  'policies', 'freedom', 'low vaccination rates', 'zero restrictions', 'surging virus', 'XBB', 'high infection', 'new cases', 'outbreaks', 'tested positive', 'deaths', 'the first wave', 'the second wave', '“bad cold”', 'reopening', 'medical care', 'fatalities', 'avoiding Shanghai', 'death rate', 'protests', 'policies', 'freedom', 'low vaccination rates'
];

let fireworks = []; let gravity; let fire = false;

const FB_SIZE = 8.0; let football; let objects = [];

let sphereGroup; let sphereg_acc = 0; let sphereg_vel = 0.001;

let desert; let mosque; let seagull; let mixer;
let loaded = false; // not used
let shanghai; let buildingGroup;

var clock = new THREE.Clock(); var duration = 5; var currentTime = 0;
const TRANS1 = 7; const TRANS2 = TRANS1 + 3; const TRANS3 = TRANS2 + 26; const TRANS4 = TRANS3 + 30;
const TRANS5 = TRANS4 + 30; const TRANS6 = TRANS5 + 30; const TRANS7 = TRANS6 + 30; const TRANS8 = TRANS7 + 30;

function setupThree() {
  // WebXR
  setupWebXR();

  room = getRoom();
  scene.add(room);

  // enable shadow
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

  gravity = createVector(0, -0.07, 0);

  textGroup = new THREE.Group();
  for (let t of texts) {
    const loader = new FontLoader();
    loader.load('assets/font/Cinzel_Regular.json', function (font) {
      let tMesh = getText(t, font);
      textGroup.add(tMesh);
    });
  }

  // skydive scene
  sphereGroup = new THREE.Group();
  for (let i = 0; i < 1000; i++) {
    let box = getSphere();
    box.position.x = random(-WORLD_HALF * 2, WORLD_HALF * 2);
    box.position.y = random(-WORLD_HALF * 5, WORLD_HALF);
    box.position.z = random(-WORLD_HALF * 2, WORLD_HALF * 2);
    const size = random(1, 10);
    box.scale.x = size;
    box.scale.y = size;
    box.scale.z = size;
    // box.material.opacity = random(0.1, 0.6);
    sphereGroup.add(box);
  }
  sphereGroup.position.y = -1000;
  scene.add(sphereGroup);

  // covid scene
  textGroup2 = new THREE.Group();
  for (let t of texts2) {
    const loader = new FontLoader();
    loader.load('assets/font/Cinzel_Regular.json', function (font) {
      let tMesh = getText(t, font);
      textGroup2.add(tMesh);
    });
  }
  scene.add(textGroup2);

  // shanghai landscape
  buildingGroup = new THREE.Group();
  const distance = 80;
  for (let z = -WORLD_HALF; z <= WORLD_HALF; z += distance) {
    for (let x = -WORLD_HALF; x <= WORLD_HALF; x += distance) {
      if (x ** 2 + z ** 2 > MOUNTAIN ** 2) {
        let building = getBuilding();
        building.position.x = x + random(-20, 20);
        building.position.y = -200;
        building.position.z = z + random(-20, 20);
        buildingGroup.add(building);
      }
    }
  }

  // mirror
  mirror = getMirror();
  mirror.position.y = -200;

  getFootballModel("assets/football/scene.gltf");
  loadShanghai("assets/shanghai/scene.gltf");

}

function updateThree() {
  // Update time
  var delta = clock.getDelta();
  currentTime += delta;

  // football.visible = false;
  textGroup2.visible = false;
  sphereGroup.visible = false;
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
    if (controller2.userData.isSelecting === true) {
      // controller's position and direction
      const position = controller2.position;
      const direction = new THREE.Vector3(0, 0, -1); // default direction
      direction.applyQuaternion(controller2.quaternion); // apply the rotation of the controller 

      // generate a cube using the position and direction      
      let object = new Cube()
        .setPosition(position.x, position.y, position.z)
        .setVelocity(direction.x, direction.y, direction.z)
        .setRotationVelocity(random(-0.05, 0.05), random(-0.05, 0.05), random(-0.05, 0.05))
        .setScale(random(0.5, 1.0));
      objects.push(object);
    }

    // update the cubes
    for (let c of objects) {
      let gravity = createVector(0, -0.0001, 0);
      c.applyForce(gravity);
      c.move();
      c.rotate();
      c.age();
      c.update();
    }

    // remove the cubes that are done
    for (let i = 0; i < objects.length; i++) {
      let c = objects[i];
      if (c.isDone) {
        scene.remove(c.mesh);
        objects.splice(i, 1);
        i--;
      }
    }
  }

  // skydive gravity fall
  if (currentTime >= TRANS1 && currentTime < TRANS2) {
    console.log("scene 2");
    for (let c in objects) {
      scene.remove(c.mesh);
      objects.splice(i, 1);
    }
    sphereGroup.visible = true;
    // if (currentTime < TRANS1 + 1) {
    //   console.log("sphere group: " + sphereGroup);
    //   let sphereOpacity = map(currentTime, TRANS1, TRANS1 + 1, 1, 0.5);
    //   sphereGroup.material.opacity = sphereOpacity;
    // }

    // console.log(sphereGroup);
    let offset = map(currentTime, TRANS1, TRANS2, 242, 171);
    const roomColor = new THREE.Color(137 / 250, offset / 250, 1);
    room.material.color = roomColor;
    let sphereg_gravity = -0.01;
    sphereg_acc += sphereg_gravity;
    sphereg_vel += sphereg_acc;
    sphereGroup.position.y -= sphereg_vel;
  }

  // skydive swing
  if (currentTime >= TRANS2 && currentTime < TRANS3) {
    console.log("scene 3");
    sphereGroup.visible = true;
    let R_offset = map(currentTime, TRANS2, TRANS3, 137, 1); //39
    let G_offset = map(currentTime, TRANS2, TRANS3, 171, 1); //49
    let B_offset = map(currentTime, TRANS2, TRANS3, 250, 1); //71
    const roomColor = new THREE.Color(R_offset / 250, G_offset / 250, B_offset / 250);
    room.material.color = roomColor;
    sphereGroup.position.x = cos(frame * 0.010) * 300;
    sphereGroup.position.y = sin(frame * 0.005) * 100 - map(currentTime, 4, 30, WORLD_HALF, 0);
    sphereGroup.rotation.y = cos(frame * 0.010) * PI / 24;
    sphereGroup.rotation.z = cos(frame * 0.007) * PI / 24;
  }

  // covid news
  if (currentTime >= TRANS3 && currentTime < TRANS4) {
    const roomColor = new THREE.Color(1 / 250, 1 / 250, 1 / 250);
    room.material.color = roomColor;
    textGroup2.visible = true;
    mirror.visible = true;
    if (text_rotate2) {
      textGroup2.rotation.y += 0.004;
    }
  }

  if (currentTime >= TRANS4 && currentTime < TRANS5) {
    let R_offset = map(currentTime, TRANS4, TRANS5, 1, 250);
    let G_offset = map(currentTime, TRANS4, TRANS5, 1, 179);
    let B_offset = map(currentTime, TRANS4, TRANS5, 1, 239);
    const roomColor = new THREE.Color(R_offset / 250, G_offset / 250, B_offset / 250);
    room.material.color = roomColor;

    mirror.visible = true;
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

  if (currentTime >= TRANS5 && currentTime < TRANS6) {
    for (let f in fireworks) {
      scene.remove(f.mesh);
      fireworks.splice(f, 1); //
    }
    scene.add(textGroup);
    mirror.visible = true;
    let R_offset = map(currentTime, TRANS5, TRANS6, 250, 181);
    let G_offset = map(currentTime, TRANS5, TRANS6, 179, 79);
    let B_offset = map(currentTime, TRANS5, TRANS6, 239, 5);
    const roomColor = new THREE.Color(R_offset / 250, G_offset / 250, B_offset / 250);
    room.material.color = roomColor;
    // drag texts
  }

  if (currentTime >= TRANS6 && currentTime < TRANS7) {
    scene.remove(textGroup);
    let R_offset = map(currentTime, TRANS6, TRANS7, 181, 38); // 181
    let G_offset = map(currentTime, TRANS6, TRANS7, 79, 16); // 79
    let B_offset = map(currentTime, TRANS6, TRANS7, 5, 1); // 5
    const roomColor = new THREE.Color(R_offset / 250, G_offset / 250, B_offset / 250);
    room.material.color = roomColor;

    desert = getDesert();
    desert.rotation.x = PI / 2 * 3;
    desert.position.y = -200;

    if (loaded == false) {
      loadMosque("assets/blue_mosque/scene.gltf");
      loadSeagull("assets/seagulls/scene.gltf");
      loaded = true;
    }

    if (mosque !== undefined) {
      mosque.position.z = -400;
      mosque.position.x = -100;
      mosque.position.y = 0;
      mosque.rotation.z = PI / 10;
      mosque.scale.x = 80.0;
      mosque.scale.y = 80.0;
      mosque.scale.z = 80.0;
    }

    if (seagull !== undefined) {
      seagull.position.x = 400;
      seagull.position.z = -1000;
      seagull.position.y = 200;
      seagull.scale.x = 30.0;
      seagull.scale.y = 30.0;
      seagull.scale.z = 30.0;
      mixer.update(delta); // update seagulls animation
    }
  }

  if (currentTime >= TRANS7 && currentTime < TRANS8) {
    let R_offset = map(currentTime, TRANS7, TRANS8, 1, 109);
    let G_offset = map(currentTime, TRANS7, TRANS8, 1, 220);
    let B_offset = map(currentTime, TRANS7, TRANS8, 1, 237);
    const roomColor = new THREE.Color(R_offset / 250, G_offset / 250, B_offset / 250);
    room.material.color = roomColor;
    scene.remove(seagull);
    scene.remove(desert);
    scene.remove(mosque);
    mirror.visible = true;
    scene.add(shanghai);
    scene.add(buildingGroup);

    if (shanghai !== undefined) {
      shanghai.position.z = -600;
      shanghai.position.y = -250;
      shanghai.scale.x = 700.0;
      shanghai.scale.y = 700.0;
      shanghai.scale.z = 700.0;
      shanghai.rotation.z = PI / 7 * 6;
    }
  }

  cleanIntersected();
  intersectObjects(controller1);
}

let raycaster;

const intersected = [];
const tempMatrix = new THREE.Matrix4();

function getIntersections(controller) {

  controller.updateMatrixWorld();

  tempMatrix.identity().extractRotation(controller.matrixWorld);

  raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
  raycaster.ray.direction.set(0, 0, - 1).applyMatrix4(tempMatrix);

  return raycaster.intersectObjects(textGroup.children, false);

}

function intersectObjects(controller) {

  // Do not highlight in mobile-ar

  if (controller.userData.targetRayMode === 'screen') return;

  // Do not highlight when already selected

  if (controller.userData.selected !== undefined) return;

  const line = controller.getObjectByName('line');
  const intersections = getIntersections(controller);

  if (intersections.length > 0) {

    const intersection = intersections[0];

    const object = intersection.object;
    object.material.emissive.r = 1;
    intersected.push(object);

    line.scale.z = intersection.distance;

  } else {

    line.scale.z = 5;

  }

}

function cleanIntersected() {

  while (intersected.length) {

    const object = intersected.pop();
    object.material.emissive.r = 0;

  }

}

function updateCamera() {
  camera.updateProjectionMatrix();
}

function loadShanghai(filepath) {
  const loader = new GLTFLoader();
  loader.load(
    filepath,
    function (gltfData) {
      shanghai = gltfData.scene.children[0];
      shanghai.material = new THREE.MeshBasicMaterial({ //Matcap
        color: 0x080808,
      });
      // scene.add(shanghai);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (err) {
      console.error('An error happened');
    }
  );
}

function getBuilding() {
  let geometry = new THREE.BoxGeometry(30, random(60, 180), 30);
  const material = new THREE.MeshBasicMaterial({
    color: 0x080808,
  });
  const mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);
  return mesh;
}

function loadMosque(filepath) {
  const loader = new GLTFLoader();
  loader.load(
    filepath,
    function (gltfData) {
      mosque = gltfData.scene.children[0];
      mosque.material = new THREE.MeshBasicMaterial({ //Matcap
        color: 0x080808,
      });
      scene.add(mosque);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (err) {
      console.error('An error happened');
    }
  );
}

function loadSeagull(filepath) {
  const loader = new GLTFLoader();
  loader.load(
    filepath,
    function (gltfData) {
      seagull = gltfData.scene.children[0];
      const animations = gltfData.animations; //
      mixer = new THREE.AnimationMixer(seagull);
      const action = mixer.clipAction(animations[0]); // play the first animation
      action.play();

      seagull.material = new THREE.MeshBasicMaterial({ //Matcap
        color: 0x080808,
      });
      scene.add(seagull);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (err) {
      console.error('An error happened');
    }
  );
}

function getDesert() {
  let geometry = new THREE.PlaneGeometry(WORLD_HALF * 2, WORLD_HALF * 2, 100, 100);
  const material = new THREE.MeshBasicMaterial({
    color: 0x080808,
    side: THREE.DoubleSide
  });
  const mesh = new THREE.Mesh(geometry, material);
  let posArray = geometry.attributes.position.array;
  for (let i = 0; i < posArray.length; i += 3) {
    let x = posArray[i + 0];
    let y = posArray[i + 1];
    let z = posArray[i + 2];
    let temp = x ** 2 + y ** 2;
    let xOffset = (x + WORLD_HALF) * 0.005;
    let yOffset = (y + WORLD_HALF) * 0.005;
    let amp = 12;
    let noiseValue = (noise(xOffset, yOffset) * amp) ** 2;
    posArray[i + 2] = noiseValue;
  }
  scene.add(mesh);
  return mesh;
}

function getBox() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshLambertMaterial({
    color: Math.random() * 0xffffff
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

function getSphere() {
  const geometry = new THREE.SphereGeometry(random(1, 3));
  const material = new THREE.MeshBasicMaterial({
    color: 0x0c83fa,
    transparent: true,
    opacity: 0.5
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

class Cube {
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
    this.mesh = getSphere();
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

function getRoom() {
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
      .setPosition(random(-300, 300), -200, 800)
      .setVelocity(0, random(7, 9), 0)
      .setScale(3);
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