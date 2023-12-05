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
            fb.scale.x = BALL_SIZE;
            fb.scale.y = BALL_SIZE;
            fb.scale.z = BALL_SIZE;
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