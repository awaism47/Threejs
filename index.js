import {Scene, BoxGeometry,SphereGeometry,Object3D, MeshBasicMaterial, Mesh, PerspectiveCamera, WebGLRenderer, MeshPhongMaterial, DirectionalLight, TextureLoader, AxesHelper, GridHelper, EdgesGeometry, LineBasicMaterial, LineSegments} from 'three';
import{OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";



//1 The scene
const scene = new Scene()

const axes = new AxesHelper();
axes.material.depthTest=false;
axes.renderOrder=2;
scene.add(axes);

const grid = new GridHelper();
axes.renderOrder=1;
scene.add(grid);

//2 The Object
const sphereGeometry = new SphereGeometry(0.5);

const solarSystem = new Object3D();
scene.add(solarSystem);

const sunMaterial = new MeshBasicMaterial({color: 'yellow' });
const sunMesh= new Mesh(sphereGeometry, sunMaterial);
solarSystem.add(sunMesh);

const earthMaterial = new MeshBasicMaterial({color: 'blue' });
const geo = new EdgesGeometry(sphereGeometry);
const mat= new LineBasicMaterial({color:0x000000,linewidth:2});
const wireframe= new LineSegments(geo,mat);
const earthMesh = new Mesh(sphereGeometry, earthMaterial);
earthMesh.position.set(5, 0, 0);
earthMesh.add(wireframe);
sunMesh.add(earthMesh);

//Adding axes of earth to visualise in reference to global axes
const earthAxes=new AxesHelper()
earthAxes.material.depthTest=false;
earthAxes.renderOrder=2;
earthMesh.add(earthAxes);

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
renderer.setClearColor(0xa4c9be,1);

//Responsivity
window.addEventListener('resize',()=>{
    camera.aspect=threeCanvas.clientWidth/threeCanvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(threeCanvas.clientWidth,threeCanvas.clientHeight,false);
})


//Camera
const camera = new PerspectiveCamera(75, threeCanvas.clientWidth/ threeCanvas.clientHeight);
camera.position.z = 4;
camera.position.y = 2;
camera.position.x = 1;
camera.lookAt(axes.position);
scene.add( camera );

//controls
const controls = new OrbitControls(camera,threeCanvas);
controls.enableDamping=true;

//Lights
const light=new DirectionalLight(0xffffff);
light.position.set(0,1,1);
scene.add(light);


//Load textures if required

//Animation

function animate() {
    sunMesh.rotation.y += 0.005;
  
    earthMesh.rotation.y += 0.05;
    controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

//Debugging

const gui = new GUI();
const min = -3;
const max = 3;
const step = 0.01;
gui.add(sunMesh.position, 'y', min, max, step);
gui.add(earthMesh.position, 'x',min,max,step);