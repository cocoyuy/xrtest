function getMirror() {
    const geometry = new THREE.CircleGeometry(1000, 64);
    groundMirror = new Reflector(geometry, {
        clipBias: 0.003,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        color: 0xffd678 //0xfce7b6 //0x883afc //b5b5b5 //fa0202 //b5b5b5
    });
    groundMirror.rotateX(- Math.PI / 2);
    scene.add(groundMirror);
    return groundMirror;
}