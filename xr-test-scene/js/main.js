const WORLD_SIZE = 2000; const WORLD_HALF = 1000; const MOUNTAIN = 600; const FLOOR = -200;
let room;
let mirror;
let play = false;
let playtime = 0;

let textGroup; // gre vocabulary
let texts = ['equivocal', 'lucid', 'precipitate', 'assuage', 'erudite', 'enigma', 'placate', 'zeal', 'audacious', 'gullible', 'pedant', 'vacillate', 'capricious', 'loquacious', 'pragmatic', 'volatile', 'ephemeral', 'laconic', 'cacophony', 'enervate', 'ingenuous', 'misanthrope', 'venerate', 'eulogy', 'lethargic', 'obdurate', 'philanthropic', 'garrulous', 'malleable', 'ostentation', 'prevaricate', 'prevaricate', 'eulogy', 'laconic', 'loquacious', 'cacophony', 'malleable', 'ephemeral', 'pedant', 'gullible', 'equivocal', 'lucid', 'precipitate', 'assuage', 'erudite', 'enigma', 'placate', 'zeal', 'audacious', 'gullible', 'pedant', 'vacillate', 'capricious', 'loquacious',
  'pragmatic', 'volatile', 'ephemeral', 'laconic', 'cacophony', 'enervate', 'ingenuous', 'misanthrope', 'venerate', 'eulogy', 'lethargic', 'obdurate', 'philanthropic', 'garrulous', 'malleable', 'ostentation', 'prevaricate', 'prevaricate', 'eulogy', 'laconic', 'loquacious', 'cacophony', 'malleable', 'ephemeral', 'pedant', 'equivocal', 'lucid', 'precipitate', 'assuage', 'erudite', 'enigma', 'placate', 'zeal', 'audacious', 'gullible', 'pedant', 'vacillate',
  'capricious', 'loquacious', 'pragmatic', 'volatile', 'ephemeral', 'laconic', 'cacophony', 'enervate', 'ingenuous', 'misanthrope', 'venerate', 'eulogy', 'lethargic', 'obdurate', 'philanthropic', 'garrulous', 'malleable', 'ostentation', 'prevaricate', 'prevaricate', 'eulogy', 'laconic', 'loquacious', 'cacophony', 'malleable', 'ephemeral', 'pedant'
];
// let text_rotate = false; // not used when drag
let mosque_rotate;
let textGroup2; let text_rotate2 = false;
let texts2 = ['zero restrictions', 'surging virus', 'XBB', 'high infection', 'new cases', 'outbreaks', 'tested positive', 'deaths', 'the first wave', 'the second wave', '“bad cold”', 'reopening', 'medical care', 'fatalities', 'avoiding Shanghai', 'death rate', 'protests',
  'policies', 'freedom', 'low vaccination rates', 'zero restrictions', 'surging virus', 'XBB', 'high infection', 'new cases', 'outbreaks', 'tested positive', 'deaths', 'the first wave', 'the second wave', '“bad cold”', 'reopening', 'medical care', 'fatalities', 'avoiding Shanghai', 'death rate', 'protests', 'policies', 'freedom', 'low vaccination rates'
];

// let fireworks = []; let gravity; let fire = false;
const MAX_PARTICLE_NUMBER = 600; const MAX_FIREWORK = 5;
let pointClouds = []; let particlesArr = []; let gravity; let t = 0;

// const FB_SIZE = 8.0; let football; let objects = [];

let sphereGroup; let sphereg_acc = 0; let sphereg_vel = 0.001; let sphereg_gravity;

let desert; let mosque; let seagull; let mixer;
let shanghai; let buildingGroup;

var clock = new THREE.Clock(); var duration = 5; var currentTime = 0;
let TRANS0 = 60; let TRANS1 = 60; let TRANS2 = 60; let TRANS3 = 60; let TRANS4 = 60;
let TRANS5 = 60; let TRANS6 = 60; let TRANS7 = 60; let TRANS8 = 60;
let light; let hemiLight;

let cubes = []; let shoot = false; let fb; let bb; // scene 1 objects 

let lfa = 'Letters From Afar'; let openingText; let textOpacity;
let hi = '"Hi Mom, ..."'; let hiOpacity; let hiText;
let yours = '"Yours,'; let cc = 'Coco"';
let yOpacity; let yText; let cOpacity; let cText;

let voiceOver;
const BALL_SIZE = 20;
const MAX_SPHERE = 3000;

function setupThree() {
  getVoiceOver('assets/lfa-read-letters.MP3');

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

  // closing text
  const loader3 = new FontLoader();
  loader3.load('assets/font/Cinzel_Regular.json', function (font) {
    yText = getHi(yours, font);
    yText.position.y = 0;
    scene.add(yText);
  });

  const loader4 = new FontLoader();
  loader4.load('assets/font/Cinzel_Regular.json', function (font) {
    cText = getHi(cc, font);
    cText.position.y = -30;
    scene.add(cText);
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
  for (let i = 0; i < MAX_SPHERE; i++) {
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

  // mosque scene
  desert = getDesert();

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
  mirror.position.y = FLOOR;

  // getFootballModel("assets/football/scene.gltf");
  loadShanghai("assets/shanghai/scene.gltf");
  loadMosque("assets/blue_mosque/scene.gltf");
  loadSeagull("assets/seagulls/scene.gltf");
  mosque_rotate = PI / 8;
}

function updateThree() {
  if (play && playtime == 0) {
    console.log("play voiceover");
    voiceOver.play();
    playtime++;
    TRANS0 = currentTime;
    TRANS1 = TRANS0 + 18; TRANS2 = TRANS1 + 3; TRANS3 = TRANS2 + 14; TRANS4 = TRANS3 + 30;
    TRANS5 = TRANS4 + 22; TRANS6 = TRANS5 + 15; TRANS7 = TRANS6 + 17; TRANS8 = TRANS7 + 8;
    // console.log("transition print", TRANS1, TRANS2);
  }

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
    if (currentTime < 2) {
      textOpacity = map(currentTime, 0, 2, 0, 1);
      hiOpacity = 0;
      // hiOpacity = 0;
    } else if (currentTime >= 2 && currentTime < 4) {
      textOpacity = 1;
      hiOpacity = map(currentTime, 2, 4, 0, 0.8);
    } else {
      textOpacity = 1;
      hiOpacity = 0.8;
    }
    if (openingText != undefined) openingText.material.opacity = textOpacity;
    if (hiText != undefined) hiText.material.opacity = hiOpacity;
  }

  if (currentTime >= TRANS0 && currentTime < TRANS1) {
    scene.remove(hiText);
    scene.remove(openingText);
    // voiceOver.play();
    // scene.add(voiceOver);
    let R_offset = map(currentTime, TRANS0, TRANS1, 250, 137);
    let G_offset = map(currentTime, TRANS0, TRANS1, 207, 242);
    let B_offset = map(currentTime, TRANS0, TRANS1, 137, 250);
    const roomColor = new THREE.Color(R_offset / 250, G_offset / 250, B_offset / 250);
    room.material.color = roomColor;
    if (shoot) {
      let tCube = new Rand()
        .setPosition(random(-600, 600), random(-100, 5), random(-600, 600))
        .setRotationVelocity(random(-0.05, 0.05), random(-0.05, 0.05), random(-0.05, 0.05))
        .setScale(random(0.5, 1));
      cubes.push(tCube);
    }

    // console.log("cubes", cubes);

    // update the objects
    for (let c of cubes) {
      gravity = createVector(0, -0.05, 0)
      c.applyForce(gravity);
      c.move();
      c.rotate();
      c.age();
      c.update();
    }
  }

  // skydive gravity fall
  if (currentTime >= TRANS1 && currentTime < TRANS2) {

    sphereGroup.visible = true;
    let offset = map(currentTime, TRANS1, TRANS2, 242, 171);
    const roomColor = new THREE.Color(137 / 250, offset / 250, 1);
    room.material.color = roomColor;
    sphereg_gravity = -0.01;
    sphereg_acc += sphereg_gravity;
    sphereg_vel += sphereg_acc;
    sphereGroup.position.y -= sphereg_vel;
    mirror.position.y -= sphereg_vel;
    for (let i = 0; i < cubes.length; i++) {
      let c = cubes[i];
      c.mesh.position.y -= sphereg_vel;
    }
  }

  // skydive swing
  if (currentTime >= TRANS2 && currentTime < TRANS3) {

    // remove rand objects from the previous scene
    for (let i = 0; i < cubes.length; i++) {
      let c = cubes[i];
      scene.remove(c.mesh);
      cubes.splice(i, 1);
      i--;
    }

    sphereGroup.visible = true;
    for (let j = 0; j < sphereGroup.children.length; j++) {
      let m = sphereGroup.children[j];
      let textOpacity;
      textOpacity = map(currentTime, TRANS2, TRANS3, 0.5, 0);
      m.material.opacity = textOpacity;
    }

    // sphereGroup.position.y = WORLD_SIZE;
    let R_offset = map(currentTime, TRANS2, TRANS3, 137, 1); //39
    let G_offset = map(currentTime, TRANS2, TRANS3, 171, 1); //49
    let B_offset = map(currentTime, TRANS2, TRANS3, 250, 1); //71
    const roomColor = new THREE.Color(R_offset / 250, G_offset / 250, B_offset / 250);
    room.material.color = roomColor;
    sphereGroup.position.x = cos(frame * 0.010) * 300;
    sphereGroup.position.y = sin(frame * 0.005) * 200 - map(currentTime, 4, 30, WORLD_HALF, 0) + WORLD_SIZE;
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
      textGroup2.rotation.y += 0.003;
    }

    for (let j = 0; j < textGroup2.children.length; j++) {
      let m = textGroup2.children[j];
      let textOpacity;
      if (currentTime >= TRANS3 && currentTime < TRANS3 + 2) { textOpacity = map(currentTime, TRANS3, TRANS3 + 2, 0, 1); }
      else if (currentTime >= TRANS4 - 2 && currentTime < TRANS4) { textOpacity = map(currentTime, TRANS4 - 2, TRANS4, 1, 0); }
      else { textOpacity = 1; }
      m.material.opacity = textOpacity;
    }
  }

  // firework
  if (currentTime >= TRANS4 && currentTime < TRANS5) {
    const roomColor = new THREE.Color(1 / 250, 1 / 250, 1 / 250);
    room.material.color = roomColor;

    mirror.visible = true;
    mirror.position.y = FLOOR;
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
            .setPosition((j - 2) * 200 + r, 500 + r, -400 + r * 4)
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

  // gre vocabulary
  if (currentTime >= TRANS5 && currentTime < TRANS6) {
    pointClouds = [];
    // console.log(pointClouds);
    // for (pointCloud in pointClouds) {
    //   console.log(pointCloud);
    //   pointCloud.geometry.setDrawRange(0, 0);
    // } //-1
    // for (let f in fireworks) {
    //   scene.remove(f.mesh);
    //   fireworks.splice(f, 1); //
    // }

    scene.add(textGroup);
    mirror.visible = true;
    let R_offset; let G_offset; let B_offset;
    let roomColor;
    if (currentTime >= TRANS5 && currentTime < TRANS5 + 3) {
      R_offset = map(currentTime, TRANS5, TRANS5 + 3, 1, 91);
      G_offset = map(currentTime, TRANS5, TRANS5 + 3, 1, 165);
      B_offset = map(currentTime, TRANS5, TRANS5 + 3, 1, 222);
      roomColor = new THREE.Color(R_offset / 250, G_offset / 250, B_offset / 250);
    } if (currentTime >= TRANS6 - 2 && currentTime < TRANS6) {
      R_offset = map(currentTime, TRANS6 - 2, TRANS6, 91, 1);
      G_offset = map(currentTime, TRANS6 - 2, TRANS6, 165, 1);
      B_offset = map(currentTime, TRANS6 - 2, TRANS6, 222, 1);
      roomColor = new THREE.Color(R_offset / 250, G_offset / 250, B_offset / 250);
    } else {
      roomColor = new THREE.Color(91 / 250, 165 / 250, 222 / 250);
    }
    room.material.color = roomColor;

    // draggable texts
    for (let j = 0; j < textGroup.children.length; j++) {
      let m = textGroup.children[j];
      let textOpacity;
      if (currentTime >= TRANS5 && currentTime < TRANS5 + 2) { textOpacity = map(currentTime, TRANS5, TRANS5 + 2, 0, 1); }
      else if (currentTime >= TRANS6 - 2 && currentTime < TRANS6) { textOpacity = map(currentTime, TRANS6 - 2, TRANS6, 1, 0); }
      else { textOpacity = 1; }
      m.material.opacity = textOpacity;
    }
  }

  // mosque sunset
  if (currentTime >= TRANS6 && currentTime < TRANS7) {
    let roomColor; let R_offset; let G_offset; let B_offset;
    if (currentTime >= TRANS6 && currentTime < TRANS6 + 1) {
      R_offset = map(currentTime, TRANS6, TRANS6 + 1, 1, 181);
      G_offset = map(currentTime, TRANS6, TRANS6 + 1, 1, 79);
      B_offset = map(currentTime, TRANS6, TRANS6 + 1, 1, 5);
      roomColor = new THREE.Color(R_offset / 250, G_offset / 250, B_offset / 250);
    } else {
      R_offset = map(currentTime, TRANS6 + 1, TRANS7, 181, 1); // 38
      G_offset = map(currentTime, TRANS6 + 1, TRANS7, 79, 1); // 16
      B_offset = map(currentTime, TRANS6 + 1, TRANS7, 5, 1); // 
      roomColor = new THREE.Color(R_offset / 250, G_offset / 250, B_offset / 250);
    }
    room.material.color = roomColor;

    scene.remove(light);
    scene.remove(hemiLight);
    scene.remove(textGroup);
    // mirror.visible = true;
    scene.add(desert);
    scene.add(seagull);
    scene.add(mosque);

    // desert.rotation.x = PI / 2 * 3;
    // desert.position.y = -200;

    if (controller2.userData.isSelecting === true) {
      const direction = new THREE.Vector3(0, 0, -1); // default direction
      direction.applyQuaternion(controller2.quaternion); // apply the rotation of the controller 
      mosque_rotate = direction.z;
    }

    if (mosque !== undefined) {
      mosque.position.z = -600;
      mosque.position.x = -200;
      mosque.position.y = FLOOR + 150;
      mosque.rotation.z = mosque_rotate;
      mosque.scale.x = 60.0;
      mosque.scale.y = 60.0;
      mosque.scale.z = 60.0;
    }

    if (seagull !== undefined) {
      seagull.position.x = 400;
      seagull.position.z = -800;
      seagull.position.y = FLOOR + 200;
      seagull.scale.x = 10.0;
      seagull.scale.y = 10.0;
      seagull.scale.z = 10.0;
      mixer.update(delta); // update seagulls animation
    }
  }


  // shanghai
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

  // ending
  if (currentTime >= TRANS8 && currentTime < TRANS8 + 10) {

    scene.remove(shanghai);
    let R_offset = map(currentTime, TRANS8, TRANS8 + 10, 109, 250);
    let G_offset = map(currentTime, TRANS8, TRANS8 + 10, 220, 179);
    let B_offset = map(currentTime, TRANS8, TRANS8 + 10, 237, 239);
    const roomColor = new THREE.Color(R_offset / 250, G_offset / 250, B_offset / 250);
    room.material.color = roomColor;

    if (currentTime < TRANS8 + 2) {
      yOpacity = map(currentTime, TRANS8, TRANS8 + 2, 0, 1);
      cOpacity = 0;
    } else if (currentTime >= TRANS8 + 2 && currentTime < TRANS8 + 4) {
      yOpacity = 1;
      cOpacity = map(currentTime, TRANS8 + 2, TRANS8 + 4, 0, 0.8);
    } else {
      yOpacity = 1;
      cOpacity = 0.8;
    }
    if (yText != undefined) yText.material.opacity = yOpacity;
    if (cText != undefined) cText.material.opacity = cOpacity;
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
      play = true;
      console.log("user shoot");
      break;
    case 'ArrowUp':
      text_rotate2 = true;
      // console.log("start rotate");
      break;
  }
};

function onKeyUp(event) {
  switch (event.code) {
    case 'Space':
      shoot = false;
      play = false;
      break;
    case 'ArrowUp':
      text_rotate2 = false;
      // console.log("stop rotate");
      break;
  }
};