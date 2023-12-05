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