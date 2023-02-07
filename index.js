import {Scene, BoxGeometry,SphereGeometry,Object3D, MeshBasicMaterial, Mesh, PerspectiveCamera, WebGLRenderer, MeshPhongMaterial, DirectionalLight, TextureLoader} from 'three';
import{OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

//1 The scene
const scene = new Scene()

//2 The Object
const sphereGeometry = new SphereGeometry(0.5);

const solarSystem = new Object3D();
scene.add(solarSystem);

const sunMaterial = new MeshBasicMaterial({color: 'yellow' });
const sunMesh= new Mesh(sphereGeometry, sunMaterial);
solarSystem.add(sunMesh);

const earthMaterial = new MeshBasicMaterial({color: 'blue' });
const earthMesh = new Mesh(sphereGeometry, earthMaterial);
earthMesh.position.set(5, 0, 0);
sunMesh.add(earthMesh);

const moonMaterial = new MeshBasicMaterial({color: 'white' });
const moonMesh = new Mesh(sphereGeometry, moonMaterial);
moonMesh.scale.set(0.5, 0.5, 0.5);
moonMesh.position.set(1, 0, 0);
earthMesh.add(moonMesh);


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

//controls
const controls = new OrbitControls(camera,threeCanvas);
controls.enableDamping=true;

//Lights
const light=new DirectionalLight(0xffffff);
light.position.set(0,1,1);
scene.add(light);


//Load textures

//Animation

function animate() {
    sunMesh.rotation.y += 0.005;
  
    earthMesh.rotation.y += 0.05;
    controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();