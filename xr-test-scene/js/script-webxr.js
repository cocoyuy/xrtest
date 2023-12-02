let controller1, controller2;
let controllerGrip1, controllerGrip2;

function setupWebXR() {
    renderer.xr.enabled = true;

    // controller 
    controller1 = renderer.xr.getController(0);
    controller1.addEventListener('selectstart', onSelectStart1); // when the trigger is pressed
    controller1.addEventListener('selectend', onSelectEnd1); // when the trigger is released
    scene.add(controller1);

    controller2 = renderer.xr.getController(1);
    controller2.addEventListener('selectstart', onSelectStart);
    controller2.addEventListener('selectend', onSelectEnd);
    scene.add(controller2);

    // controller grip
    const controllerModelFactory = new XRControllerModelFactory();

    controllerGrip1 = renderer.xr.getControllerGrip(0);
    controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
    scene.add(controllerGrip1);

    controllerGrip2 = renderer.xr.getControllerGrip(1);
    controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));
    scene.add(controllerGrip2);

    // display the XR Button
    document.body.appendChild(XRButton.createButton(renderer));

    // controllers and raycaster
    const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, - 1)]);

    const line = new THREE.Line(geometry);
    line.name = 'line';
    line.scale.z = 5;

    controller1.add(line.clone());
    controller2.add(line.clone());

    raycaster = new THREE.Raycaster();
}

function onSelectStart1(event) {
    text_rotate = true;
}

function onSelectEnd1(event) {
    text_rotate = false;
}

function onSelectStart(event) {
    this.userData.isSelecting = true;
}

function onSelectEnd(event) {
    this.userData.isSelecting = false;
}