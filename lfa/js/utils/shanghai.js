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