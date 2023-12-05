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