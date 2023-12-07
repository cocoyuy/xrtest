let params = {
  cubes: 0,
  scene_children: 0,
};

let room;
let cubes = [];
let mosque;
let mosque_rotation;
const FLOOR = -200;

function setupThree() {
  // WebXR
  setupWebXR();

  // room
  room = getRoom();
  scene.add(room);

  // lights
  const hemiLight = new THREE.HemisphereLight(0xa5a5a5, 0x898989, 3);
  scene.add(hemiLight);

  const direcLight = new THREE.DirectionalLight(0xffffff, 3);
  direcLight.position.set(1, 1, 1).normalize();
  scene.add(direcLight);

  // gui
  gui.add(params, "cubes", 0, 5000).step(1).listen();
  gui.add(params, "scene_children", 0, 5000).step(1).listen();

  // loadMosque("assets/blue_mosque/scene.gltf");
  // scene.add(mosque);
  // console.log("mos", mosque);
  mosque = getBox();
  mosque_rotation = PI / 8;

  const color2 = new THREE.Color(0xfcba03);
  scene.background = color2;
}

function updateThree() {

  // if (mosque !== undefined) {
  //   mosque.position.z = -600;
  //   mosque.position.x = -200;
  //   mosque.position.y = FLOOR + 150;
  //   mosque.rotation.z = mosque_rotation;
  //   mosque.scale.x = 60.0;
  //   mosque.scale.y = 60.0;
  //   mosque.scale.z = 60.0;
  // }
  mosque.rotation.z = mosque_rotation;

  // generate cubes by controller
  if (controller.userData.isSelecting === true) {
    // controller's position and direction
    // const position = controller.position;
    const direction = new THREE.Vector3(0, 0, -1); // default direction
    direction.applyQuaternion(controller.quaternion); // apply the rotation of the controller 
    mosque_rotation = direction.z;
  }
  // update the GUI
  params.cubes = cubes.length;
  params.scene_children = scene.children.length;
}


///// UTILS /////


function loadMosque(filepath) {
  const loader = new GLTFLoader();
  loader.load(
    filepath,
    function (gltfData) {
      mosque = gltfData.scene.children[0];
      mosque.material = new THREE.MeshBasicMaterial({ //Matcap
        color: 0x080808,
      });
      // scene.add(mosque);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (err) {
      console.error('An error happened');
    }
  );
}

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

function getBox() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshLambertMaterial({
    color: Math.random() * 0xffffff
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
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
    this.mesh = getBox();
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