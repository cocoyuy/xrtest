function getPoints(objects) {
    const vertices = [];
    for (let obj of objects) {
        vertices.push(obj.pos.x, obj.pos.y, obj.pos.z);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const drawCount = objects.length; // draw the whole objects
    geometry.setDrawRange(0, drawCount);
    const material = new THREE.PointsMaterial({
        color: 0xfaec9b,  //0xf5a7fa
        size: 2,
        transparent: true
    });
    const points = new THREE.Points(geometry, material);
    return points;
}