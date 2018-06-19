/**
 * 激光
 */

Laser = function (scene, start, direction, distance, material) {
    this.liveTime = 0.05;

    var x = direction.x;
    var y = direction.y;
    var z = direction.z;
    var angleY = Math.atan(x/z);
    var angleX = Math.atan(Math.sqrt(x*x+z*z)/y);

    
    // var halfWidth = 10;
    // var vertices = [
    //     [start.x - halfWidth, start.y - halfWidth, start.z],
    //     [start.x - halfWidth, start.y + halfWidth, start.z],
    //     [start.x + halfWidth, start.y + halfWidth, start.z],
    //     [start.x + halfWidth, start.y - halfWidth, start.z],
    //     [end.x - halfWidth, end.y - halfWidth, end.z],
    //     [end.x - halfWidth, end.y + halfWidth, end.z],
    //     [end.x + halfWidth, end.y + halfWidth, end.z],
    //     [end.x + halfWidth, end.y - halfWidth, end.z]
    // ];
    // var faces = [
    //     [0,1,2,3],
    //     [4,5,6,7],
    //     [0,1,5,4],
    //     [1,2,6,5],
    //     [2,3,7,6],
    //     [3,0,4,7]
    // ];

    var yawObject = new THREE.Object3D();
    var pitchObject = new THREE.Object3D();
    yawObject.add(pitchObject);

    var geometry = new THREE.CylinderGeometry(0.8, 0.8, distance, 8);
    var mesh = new THREE.Mesh(geometry, material);
    // yawObject.position = start;
    // mesh.position = new THREE.Vector3(0, 0, 0);
    pitchObject.add(mesh);
    scene.add(yawObject);
    mesh.position.y = distance / 2;
    if (z >= 0)
        yawObject.rotation.y = angleY;
    else
        yawObject.rotation.y = angleY + Math.PI;
    if (y >= 0)
        pitchObject.rotation.x = angleX;
    else
        pitchObject.rotation.x = angleX + Math.PI;
    yawObject.position.copy(start);
    // scene.add(mesh);

    this.remove = function () {
        scene.remove(yawObject);
        // scene.remove(mesh);
    };
};
