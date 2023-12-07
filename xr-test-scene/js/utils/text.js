function getText(content, font) {
    const geometry = new TextGeometry(content, {
        font: font,
        size: random(15, 20),
        height: 5,
    });
    // const material = new THREE.MeshBasicMaterial({
    //     color: 0x923e96,
    // });
    const material = new THREE.MeshStandardMaterial({
        color: 0x923e96,
        roughness: 0.7,
        metalness: 0.0,
        transparent: true,
        opacity: 0
    });
    const text = new THREE.Mesh(geometry, material);
    text.position.y = random(-100, 300);
    text.position.x = random(-600, 600);
    text.position.z = random(-600, 600);
    text.lookAt(0, 0, 100);
    // scene.add(text);
    return text;
}