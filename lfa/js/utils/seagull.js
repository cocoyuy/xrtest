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