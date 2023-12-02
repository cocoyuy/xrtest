let controller, controllerGrip;

function setupWebXR() {
    renderer.xr.enabled = true;

    // controller 
    function onSelectStart() {
        this.userData.isSelecting = true;
    }
    function onSelectEnd() {
        this.userData.isSelecting = false;
    }
    controller = renderer.xr.getController(0);
    controller.addEventListener("axischange", onAxisChange);
    controller.addEventListener("selectstart", onSelectStart);
    controller.addEventListener("selectend", onSelectEnd);
    controller.addEventListener("connected", function (event) {
        this.add(buildController(event.data));
    });
    controller.addEventListener("disconnected", function () {
        this.remove(this.children[0]);
    });
    scene.add(controller);

    // controller grip
    const controllerModelFactory = new XRControllerModelFactory();
    controllerGrip = renderer.xr.getControllerGrip(0);
    controllerGrip.add(
        controllerModelFactory.createControllerModel(controllerGrip)
    );
    scene.add(controllerGrip);

    // display the XR Button
    document.body.appendChild(XRButton.createButton(renderer));
}

function onAxisChange(event) {
    // Check if the axis change is on the joystick
    const joystickThreshold = 0.5; // You can adjust this threshold
    const xAxis = event.axes[2]; // X-axis of the joystick
    const yAxis = event.axes[3]; // Y-axis of the joystick

    // Check if the joystick is moved beyond the threshold
    if (Math.abs(xAxis) > joystickThreshold || Math.abs(yAxis) > joystickThreshold) {
        // Determine the direction based on the joystick position
        if (xAxis > joystickThreshold) {
            // Joystick moved right
        } else if (xAxis < -joystickThreshold) {
            // Joystick moved left
        }

        if (yAxis > joystickThreshold) {
            // Joystick moved down
        } else if (yAxis < -joystickThreshold) {
            // Joystick moved up
            text_rotate = true;
        }

        // Add your logic for joystick movement here
    }
}

function buildController(data) {
    let geometry, material;

    switch (data.targetRayMode) {
        case "tracked-pointer":
            geometry = new THREE.BufferGeometry();
            geometry.setAttribute(
                "position",
                new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, -1], 3)
            );
            geometry.setAttribute(
                "color",
                new THREE.Float32BufferAttribute([0.5, 0.5, 0.5, 0, 0, 0], 3)
            );

            material = new THREE.LineBasicMaterial({
                vertexColors: true,
                blending: THREE.AdditiveBlending,
            });

            return new THREE.Line(geometry, material);

        case "gaze":
            geometry = new THREE.RingGeometry(0.02, 0.04, 32).translate(0, 0, -1);
            material = new THREE.MeshBasicMaterial({
                opacity: 0.5,
                transparent: true,
            });
            return new THREE.Mesh(geometry, material);
    }
}