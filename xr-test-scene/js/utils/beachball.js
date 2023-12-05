function loadGLTF_bb(filepath) {
    const loader = new GLTFLoader();
    loader.load(
        filepath,
        function (gltfData) {
            bb = gltfData.scene.children[0];
            console.log(bb);
            bb.material = new THREE.MeshMatcapMaterial({
            });
            bb.scale.x = BALL_SIZE;
            bb.scale.y = BALL_SIZE;
            bb.scale.z = BALL_SIZE;
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