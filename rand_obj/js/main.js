let params = {
  cubes: 0,
  scene_children: 0,
};

let room;
let cubes = [];
let shoot = false; // scene 1: user shoot random obj

let FLOOR = -200;
let geometries;
let fb;
let wc;
let bb;
let mirror;

function setupThree() {
  // WebXR
  setupWebXR();

  // room
  room = getRoom();
  // room.position.y = -200;
  scene.add(room);

  mirror = getMirror();
  mirror.position.y = FLOOR;

  // lights
  const hemiLight = new THREE.HemisphereLight(0xa5a5a5, 0x898989, 3);
  scene.add(hemiLight);

  const direcLight = new THREE.DirectionalLight(0xffffff, 3);
  direcLight.position.set(1, 1, 1).normalize();
  scene.add(direcLight);

  // gui
  gui.add(params, "cubes", 0, 5000).step(1).listen();
  gui.add(params, "scene_children", 0, 5000).step(1).listen();

  geometries = [
    new THREE.BoxGeometry(0.2, 0.2, 0.2),
    new THREE.ConeGeometry(0.2, 0.2, 64),
    new THREE.CylinderGeometry(0.2, 0.2, 0.2, 64)
    // new THREE.IcosahedronGeometry(0.2, 8),
    // new THREE.TorusGeometry(0.2, 0.04, 64, 32)
  ];

  loadGLTF("assets/football/scene.gltf");
  // loadGLTF_wc("assets/cup/scene.gltf");
  loadGLTF_bb("assets/beach-ball/scene.gltf");

}

function updateThree() {
  // camera.position.x = 0;
  // camera.position.y = 0;
  // camera.position.z = 0;

  if (shoot) {
    let tCube = new Cube()
      .setPosition(random(-10, 10), random(-150, -170), random(-10, 10))
      // .setVelocity(random(-0.05, 0.05), random(0.01, 0.05), random(-0.05, 0.05))
      .setRotationVelocity(random(-0.05, 0.05), random(-0.05, 0.05), random(-0.05, 0.05))
      .setScale(random(0.5, 1));
    cubes.push(tCube);
  }

  // update the cubes
  for (let c of cubes) {
    let gravity = createVector(0, -0.0001, 0);
    c.applyForce(gravity);
    c.move();
    c.rotate();
    c.age();
    c.update();
  }

  // update the GUI
  params.cubes = cubes.length;
  params.scene_children = scene.children.length;
}

// event listeners
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

function onKeyDown(event) {
  // controls.lock(); // *** this should be triggered by user interaction
  switch (event.code) {
    case 'Space':
      shoot = true;
      console.log("user shoot");
      break;
  }
};

function onKeyUp(event) {
  switch (event.code) {
    case 'Space':
      shoot = false;
      break;
  }
};

///// UTILS /////

function getRoom() {
  const geometry = new BoxLineGeometry(6, 6, 6, 10, 10, 10).translate(0, 3, 0);
  const materials = new THREE.LineBasicMaterial({
    color: 0xbcbcbc,
    transparent: true,
    opacity: 0.5,
  });
  const mesh = new THREE.LineSegments(geometry, materials);
  return mesh;
}

// function getRoom() {
//   const geometry = new THREE.SphereGeometry(1000, 32, 32); // 6
//   const material = new THREE.MeshBasicMaterial({
//     color: 0xfa9bdf, //color7
//     side: THREE.DoubleSide
//   });
//   const mesh = new THREE.Mesh(geometry, material);
//   return mesh;
// }

function getMirror() {
  const geometry = new THREE.CircleGeometry(1000, 64);
  groundMirror = new Reflector(geometry, {
    clipBias: 0.003,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0xffd678 //0xfce7b6 //0x883afc //b5b5b5 //fa0202 //b5b5b5
  });
  groundMirror.rotateX(- Math.PI / 2);
  scene.add(groundMirror);
  return groundMirror;
}

function getBox() {
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  const geometry = geometries[Math.floor(Math.random() * geometries.length)];
  const material = new THREE.MeshLambertMaterial({
    color: Math.random() * 0xffffff
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

function getClone(obj) {
  let mesh = obj.clone();
  let s = random(0.3, 0.6);
  // console.log(m);
  mesh.scale.x = s;
  mesh.scale.y = s;
  mesh.scale.z = s;
  return mesh;
}

function loadGLTF(filepath) {
  const loader = new GLTFLoader();
  loader.load(
    filepath,
    function (gltfData) {
      fb = gltfData.scene.children[0].children[0].children[1].children[0];
      // model = gltfData.scene.children[0].children[0].children[0].children[0].children[0];
      console.log(fb);
      fb.material = new THREE.MeshMatcapMaterial({ //
      });
      fb.scale.x = 0.5;
      fb.scale.y = 0.5;
      fb.scale.z = 0.5;
      // scene.add(model);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (err) {
      console.error('An error happened');
    }
  );
}

function loadGLTF_wc(filepath) {
  const loader = new GLTFLoader();
  loader.load(
    filepath,
    function (gltfData) {
      wc = gltfData.scene.children[0];
      console.log(wc);
      wc.material = new THREE.MeshMatcapMaterial({
      });
      wc.scale.x = 0.2;
      wc.scale.y = 0.2;
      wc.scale.z = 0.2;
      // scene.add(model);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (err) {
      console.error('An error happened');
    }
  );
}

function loadGLTF_bb(filepath) {
  const loader = new GLTFLoader();
  loader.load(
    filepath,
    function (gltfData) {
      bb = gltfData.scene.children[0];
      console.log(bb);
      bb.material = new THREE.MeshMatcapMaterial({
      });
      // wc.scale.x = 0.2;
      // wc.scale.y = 0.2;
      // wc.scale.z = 0.2;
      // scene.add(model);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (err) {
      console.error('An error happened');
    }
  );
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
    // this.mesh = getBox();
    let rand = Math.floor(Math.random() * 2);
    if (rand == 0) {
      this.mesh = getClone(fb);
    } else {
      this.mesh = getClone(bb); //
    }
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
  setAcc(x, y, z) {
    this.acc = createVector(x, y, z);
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
    // this.acc.mult(0);
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
    if (this.pos.y < FLOOR) {
      this.pos.y = FLOOR;
      this.vel.y *= -1;
      // this.acc.y *= 1.0001;
      this.acc.y -= 0.001;
      // console.log(this.vel.y);
    }
    if (this.lifespan <= 0) {
      this.lifespan = 0;
      this.rotVel = createVector(0, 0, 0);
    }
    // if (this.acc.y < 0) {
    //   // this.rot = createVector();
    //   this.rotVel = createVector(0, 0, 0);
    //   // this.rotAcc = createVector();
    // }
    this.mesh.position.set(this.pos.x, this.pos.y, this.pos.z);
    this.mesh.rotation.set(this.rot.x, this.rot.y, this.rot.z);

    // let newScale = p5.Vector.mult(this.scl, this.lifespan);
    // this.mesh.scale.set(newScale.x, newScale.y, newScale.z);
  }
}