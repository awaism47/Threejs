import {Scene, BoxGeometry, MeshBasicMaterial, Mesh, PerspectiveCamera, WebGLRenderer} from 'three';

//1 The scene
const scene = new Scene()

//2 The Object
const geometry = new BoxGeometry(0.5, 0.5, 0.5);
const material = new MeshBasicMaterial( {color: 'orange'} );
const cubeMesh = new Mesh( geometry, material );
scene.add( cubeMesh );


//4 The Renderer and HTML element
const threeCanvas= document.getElementById('three-canvas');
const renderer = new WebGLRenderer({
    canvas: threeCanvas,
});
const pixelRatio=Math.max(window.devicePixelRatio,2);
renderer.setPixelRatio(pixelRatio);
renderer.setSize(threeCanvas.clientWidth, threeCanvas.clientHeight,false);

//Responsivity
window.addEventListener('resize',()=>{
    camera.aspect=threeCanvas.clientWidth/threeCanvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(threeCanvas.clientWidth,threeCanvas.clientHeight,false);
})


//Camera
const camera = new PerspectiveCamera(75, threeCanvas.clientWidth/ threeCanvas.clientHeight);
camera.position.z = 3; // Z let's you move backwards and forwards. X is sideways, Y is upward and do
scene.add( camera );




// Other cubes
const greenMaterial = new MeshBasicMaterial( {color: 0x00ff00} );
const blueMaterial = new MeshBasicMaterial( {color: 0x0000ff} );

const greenCube = new Mesh( geometry, greenMaterial );
greenCube.position.x += 1;

const blueCube = new Mesh( geometry, blueMaterial );
blueCube.position.x -= 1;

scene.add(greenCube);
scene.add(blueCube);


//Animation

function animate() {
    cubeMesh.rotation.x += 0.01;
    cubeMesh.rotation.z += 0.01;

    greenCube.rotation.x += 0.015;
    greenCube.rotation.z += 0.015;

    blueCube.rotation.x += 0.005;
    blueCube.rotation.z += 0.005;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();