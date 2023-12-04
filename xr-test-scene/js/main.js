const WORLD_SIZE = 2000;
const WORLD_HALF = 1000;
const MOUNTAIN = 600;
const FLOOR = -200;
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

// let fireworks = []; let gravity; let fire = false;
const MAX_PARTICLE_NUMBER = 600;
const MAX_FIREWORK = 5;
let pointClouds = [];
let particlesArr = [];
let gravity;
let t = 0;

const FB_SIZE = 8.0; let football; let objects = [];

let sphereGroup; let sphereg_acc = 0; let sphereg_vel = 0.001;

let desert; let mosque; let seagull; let mixer;
let loaded = false; // not used
let shanghai; let buildingGroup;

var clock = new THREE.Clock(); var duration = 5; var currentTime = 0;
const TRANS0 = 6; const TRANS1 = TRANS0 + 23; const TRANS2 = TRANS1 + 2; const TRANS3 = TRANS2 + 15; const TRANS4 = TRANS3 + 15;
const TRANS5 = TRANS4 + 15; const TRANS6 = TRANS5 + 15; const TRANS7 = TRANS6 + 15; const TRANS8 = TRANS7 + 15;
let light; let hemiLight;

let cubes = []; // scene 1 objects
let shoot = false; // scene 1: user shoot random obj
let fb;
let bb;

let lfa = 'Letters From Afar'; let openingText; let textOpacity;
let hi = '"Hi Mom, ..."'; let hiText; let hiOpacity;

function setupThree() {
  // WebXR
  setupWebXR();

  room = getRoom();
  scene.add(room);

  // lights
  hemiLight = new THREE.HemisphereLight(0xa5a5a5, 0x898989, 3);
  scene.add(hemiLight);

  light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(0, 6, 0);
  light.castShadow = true;
  light.shadow.camera.top = 3;
  light.shadow.camera.bottom = - 3;
  light.shadow.camera.right = 3;
  light.shadow.camera.left = - 3;
  light.shadow.mapSize.set(4096, 4096);
  scene.add(light);

  // enable shadow
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

  // opening texts
  const loader = new FontLoader();
  loader.load('assets/font/Cinzel_Regular.json', function (font) {
    openingText = getOpening(lfa, font);
    scene.add(openingText);
  });

  const loader2 = new FontLoader();
  loader2.load('assets/font/Cinzel_Regular.json', function (font) {
    hiText = getHi(hi, font);
    scene.add(hiText);
  });

  // rand objects for scene 1
  loadGLTF("assets/football/scene.gltf");
  loadGLTF_bb("assets/beach-ball/scene.gltf");

  // 
  textGroup = new THREE.Group();
  for (let t of texts) {
    const loader = new FontLoader();
    loader.load('assets/font/Cinzel_Regular.json', function (font) {
      let tMesh = getText(t, font);
      textGroup.add(tMesh);
    });
  }

  // skydive scene
  gravity = createVector(0, -0.07, 0);
  sphereGroup = new THREE.Group();
  for (let i = 0; i < 1000; i++) {
    let box = getSphere();
    box.position.x = random(-WORLD_HALF * 2, WORLD_HALF * 2);
    box.position.y = random(-WORLD_HALF * 5, 0);
    box.position.z = random(-WORLD_HALF * 2, WORLD_HALF * 2);
    const size = random(1, 10);
    box.scale.x = size;
    box.scale.y = size;
    box.scale.z = size;
    // box.material.opacity = random(0.1, 0.6);
    sphereGroup.add(box);
  }
  // sphereGroup.position.y = 0;
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
  // buildingGroup = new THREE.Group();
  // const distance = 80;
  // for (let z = -WORLD_HALF; z <= WORLD_HALF; z += distance) {
  //   for (let x = -WORLD_HALF; x <= WORLD_HALF; x += distance) {
  //     if (x ** 2 + z ** 2 > MOUNTAIN ** 2) {
  //       let building = getBuilding();
  //       building.position.x = x + random(-20, 20);
  //       building.position.y = -200;
  //       building.position.z = z + random(-20, 20);
  //       buildingGroup.add(building);
  //     }
  //   }
  // }

  // mirror
  mirror = getMirror();
  mirror.position.y = -200;

  getFootballModel("assets/football/scene.gltf");
  loadShanghai("assets/shanghai/scene.gltf");
  loadMosque("assets/blue_mosque/scene.gltf");
  loadSeagull("assets/seagulls/scene.gltf");
}

function updateThree() {
  // Update time
  var delta = clock.getDelta();
  currentTime += delta;

  // football.visible = false;
  textGroup2.visible = false;
  sphereGroup.visible = false;
  // mirror.visible = false;

  if (currentTime < TRANS0) {
    let R_offset = map(currentTime, 0, TRANS0, 250, 250);
    let G_offset = map(currentTime, 0, TRANS0, 179, 207);
    let B_offset = map(currentTime, 0, TRANS0, 239, 137);
    const roomColor = new THREE.Color(R_offset / 250, G_offset / 250, B_offset / 250);
    // const roomColor = new THREE.Color(1, 179 / 250, 239 / 250);
    room.material.color = roomColor;
    if (currentTime < 3) {
      textOpacity = map(currentTime, 0, 3, 0, 1);
      hiOpacity = 0;
      // hiOpacity = 0;
    } else if (currentTime > 3 && currentTime < 5) {
      textOpacity = 1;
      hiOpacity = map(currentTime, 3, 5, 0, 0.8);
    } else if (currentTime >= 5 && currentTime < 6) {
      textOpacity = map(currentTime, 5, 6, 1, 0);
      hiOpacity = map(currentTime, 5, 6, 0.8, 0);
    } else {
      textOpacity = 1;
      hiOpacity = 0.8;
    }
    // openingText.material.opacity = textOpacity;
    // hiText.material.opacity = hiOpacity;
    if (openingText != undefined) openingText.material.opacity = textOpacity;
    if (hiText != undefined) hiText.material.opacity = hiOpacity;
  }

  if (currentTime >= TRANS0 && currentTime < TRANS1) {
    let R_offset = map(currentTime, TRANS0, TRANS1, 250, 137);
    let G_offset = map(currentTime, TRANS0, TRANS1, 207, 242);
    let B_offset = map(currentTime, TRANS0, TRANS1, 137, 250);
    const roomColor = new THREE.Color(R_offset / 250, G_offset / 250, B_offset / 250);
    room.material.color = roomColor;

    // football.visible = true;
    if (shoot) {
      let tCube = new Rand()
        .setPosition(random(-6, 6), 4, random(-6, 6))
        // .setVelocity(random(-0.05, 0.05), random(0.01, 0.05), random(-0.05, 0.05))
        .setRotationVelocity(random(-0.05, 0.05), random(-0.05, 0.05), random(-0.05, 0.05))
        .setScale(random(0.5, 1));
      cubes.push(tCube);
    }

    // generate cubes by controller
    if (controller2.userData.isSelecting === true) {
      // controller's position and direction
      const position = controller.position;
      // const direction = new THREE.Vector3(0, 0, -1); // default direction
      // direction.applyQuaternion(controller.quaternion); // apply the rotation of the controller 

      // generate a cube using the position and direction      
      let tCube = new Rand()
        .setPosition(position.x, position.y, position.z)
        .setRotationVelocity(random(-0.05, 0.05), random(-0.05, 0.05), random(-0.05, 0.05))
        .setScale(random(0.5, 1));
      // .setPosition(position.x, position.y, position.z)
      // .setVelocity(random(-0.05, 0.05), random(0.01, 0.05), random(-0.05, 0.05))
      // .setAcc(random(-0.05, 0.05), random(0.01, 0.05), random(-0.05, 0.05))
      // .setRotationVelocity(random(-0.05, 0.05), random(-0.05, 0.05), random(-0.05, 0.05))
      // .setScale(random(0.5, 1.0));
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
  }

  // skydive gravity fall
  if (currentTime >= TRANS1 && currentTime < TRANS2) {
    for (let c of cubes) {
      scene.remove(c);
    }
    // console.log("scene 2");
    // for (let c in objects) {
    //   scene.remove(c.mesh);
    //   objects.splice(i, 1);
    // }
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
    mirror.position.y -= sphereg_vel;
  }

  // skydive swing
  if (currentTime >= TRANS2 && currentTime < TRANS3) {
    console.log("scene 3");
    sphereGroup.visible = true;
    mirror.visible = true;
    let sphereg_gravity = -0.01;
    sphereg_acc += sphereg_gravity;
    sphereg_vel += sphereg_acc;
    sphereGroup.position.y -= sphereg_vel;
    mirror.position.y -= sphereg_vel;

    sphereGroup.position.y = WORLD_SIZE;
    let R_offset = map(currentTime, TRANS2, TRANS3, 137, 1); //39
    let G_offset = map(currentTime, TRANS2, TRANS3, 171, 1); //49
    let B_offset = map(currentTime, TRANS2, TRANS3, 250, 1); //71
    const roomColor = new THREE.Color(R_offset / 250, G_offset / 250, B_offset / 250);
    room.material.color = roomColor;
    sphereGroup.position.x = cos(frame * 0.010) * 300;
    sphereGroup.position.y = sin(frame * 0.005) * 200 - map(currentTime, 4, 30, WORLD_HALF, 0);
    sphereGroup.rotation.y = cos(frame * 0.010) * PI / 24;
    sphereGroup.rotation.z = cos(frame * 0.007) * PI / 24;
  }

  // covid news
  if (currentTime >= TRANS3 && currentTime < TRANS4) {
    const roomColor = new THREE.Color(1 / 250, 1 / 250, 1 / 250);
    room.material.color = roomColor;
    textGroup2.visible = true;
    mirror.visible = true;
    mirror.position.y = FLOOR;
    if (text_rotate2) {
      textGroup2.rotation.y += 0.004;
    }
  }

  // firework
  if (currentTime >= TRANS4 && currentTime < TRANS5 + 1) {
    const roomColor = new THREE.Color(1 / 250, 1 / 250, 1 / 250);
    room.material.color = roomColor;

    mirror.visible = true;
    mirror.position.y = FLOOR;
    // let R_offset = map(currentTime, TRANS4, TRANS5, 1, 250);
    // let G_offset = map(currentTime, TRANS4, TRANS5, 1, 179);
    // let B_offset = map(currentTime, TRANS4, TRANS5, 1, 239);
    // const roomColor = new THREE.Color(R_offset / 250, G_offset / 250, B_offset / 250);
    // room.material.color = roomColor;

    // mirror.visible = true;
    // if (fire) {
    //   for (let i = 0; i < 2; i++) {
    //     fireworks.push(new Firework(true));
    //   }
    // }
    // if (random(1) < 0.02) {
    //   fireworks.push(new Firework(false));
    // }
    // for (let f of fireworks) {
    //   f.update();
    //   f.show();
    // }
    t++;
    if (t > 150) {
      pointClouds = [];
      particlesArr = [];
      t = 0;
    }

    let r = random(-100, 100);
    if (pointClouds.length < MAX_FIREWORK) {
      for (let j = 0; j < MAX_FIREWORK; j++) {
        let particles = [];
        for (let i = 0; i < MAX_PARTICLE_NUMBER; i++) {
          let tParticle = new Particle()
            .setPosition((j - 2) * 200 + r, 200 + r, -600)
          particles.push(tParticle);
        }
        particlesArr.push(particles);

        // Points
        let pointCloud = getPoints(particles, true);
        scene.add(pointCloud);
        pointClouds.push(pointCloud);
      }
    }

    for (let j = 0; j < pointClouds.length; j++) {
      let particles = particlesArr[j];
      // update the particles first
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.move();
        p.applyForce(gravity);
        p.age();
        if (p.isDone) {
          particles.splice(i, 1);
          i--;
        }
      }

      let pointCloud = pointClouds[j];
      // then update the points
      let positionArray = pointCloud.geometry.attributes.position.array;
      let colorArray = pointCloud.geometry.attributes.color.array;
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
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
      pointCloud.geometry.setDrawRange(0, particles.length); // ***
      pointCloud.geometry.attributes.position.needsUpdate = true;
      pointCloud.geometry.attributes.color.needsUpdate = true;
    }
  }

  if (currentTime >= TRANS5 && currentTime < TRANS6) {
    // for (let f in fireworks) {
    //   scene.remove(f.mesh);
    //   fireworks.splice(f, 1); //
    // }
    scene.add(textGroup);
    mirror.visible = true;
    let R_offset = map(currentTime, TRANS5, TRANS6, 1, 181); //250
    let G_offset = map(currentTime, TRANS5, TRANS6, 1, 79); //179
    let B_offset = map(currentTime, TRANS5, TRANS6, 1, 5); // 239
    const roomColor = new THREE.Color(R_offset / 250, G_offset / 250, B_offset / 250);
    room.material.color = roomColor;
    // drag texts
  }

  if (currentTime >= TRANS6 && currentTime < TRANS7) {
    scene.remove(light);
    scene.remove(hemiLight);
    scene.remove(textGroup);
    scene.add(seagull);
    scene.add(mosque);
    let R_offset = map(currentTime, TRANS6, TRANS7, 181, 1); // 38
    let G_offset = map(currentTime, TRANS6, TRANS7, 79, 1); // 16
    let B_offset = map(currentTime, TRANS6, TRANS7, 5, 1); // 
    const roomColor = new THREE.Color(R_offset / 250, G_offset / 250, B_offset / 250);
    room.material.color = roomColor;

    desert = getDesert();
    scene.add(desert);
    desert.rotation.x = PI / 2 * 3;
    desert.position.y = -200;

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
    // scene.remove(light);
    // scene
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
    // scene.add(buildingGroup);

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

function getHi(content, font) {
  const geometry = new TextGeometry(content, {
    font: font,
    size: 13,
    height: 5,
  });
  const material = new THREE.MeshBasicMaterial({
    color: 0x923e96,
    transparent: true,
    opacity: 0
  });
  const text = new THREE.Mesh(geometry, material);
  text.position.y = -50;
  text.position.x = 150;
  text.position.z = -250;
  // text.lookAt(0, 0, 100);
  // scene.add(text);
  return text;
}

function getOpening(content, font) {
  const geometry = new TextGeometry(content, {
    font: font,
    size: 20,
    height: 5,
  });
  const material = new THREE.MeshBasicMaterial({
    color: 0x923e96,
    transparent: true,
    opacity: 0
  });
  const text = new THREE.Mesh(geometry, material);
  text.position.y = 10;
  text.position.x = -100;
  text.position.z = -250;
  // text.lookAt(0, 0, 100);
  // scene.add(text);
  return text;
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

function getPoints(objects, user) {
  const vertices = [];
  const colors = [];

  for (let obj of objects) {
    vertices.push(obj.pos.x, obj.pos.y, obj.pos.z);
    colors.push(1.0, 1.0, 1.0);
  }
  // geometry
  const geometry = new THREE.BufferGeometry();
  // attributes
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  // draw range
  const drawCount = objects.length; // draw the whole objects
  geometry.setDrawRange(0, drawCount);
  // geometry
  const texture = new THREE.TextureLoader().load('assets/particle_texture.jpg');
  const material = new THREE.PointsMaterial({
    //color: 0xFF9911,
    vertexColors: true,
    size: 3,
    sizeAttenuation: true, // default
    opacity: 0.9,
    transparent: true,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    map: texture
  });
  if (user) {
    // const c = new THREE.Color(0x66e6ff); 
    const c = new THREE.Color(random(0, 1), random(0, 1), random(0, 1));
    material.color.set(c);
  }
  // Points
  const points = new THREE.Points(geometry, material);
  return points;
}

class Particle {
  constructor() {
    this.pos = createVector();
    this.vel = p5.Vector.random3D();
    this.acc = createVector();
    this.scl = createVector(1, 1, 1);
    this.mass = this.scl.x * this.scl.y * this.scl.z;
    this.lifespan = 1.0;
    this.lifeReduction = random(0.011, 0.013);
    this.isDone = false;
  }
  setPosition(x, y, z) {
    this.pos = createVector(x, y, z);
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
  applyForce(f) {
    let force = f.copy();
    force.div(this.mass);
    this.acc.add(force);
  }
  age() {
    this.lifespan -= this.lifeReduction;
    if (this.lifespan <= 0) {
      this.lifespan = 0;
      this.isDone = true;
    }
  }
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
      // scene.add(seagull);
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
  // scene.add(mesh);
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
      .setPosition(random(-300, 300), -200, -800)
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

class Rand {
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