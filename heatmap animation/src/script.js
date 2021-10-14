import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//variables
const quad1 = [0xff0000,0x00ff00,0x0000ff,0xff00ff,0xffff00,0x00ffff];
const quad2 = [0x00ff00,0x0000ff,0xff0000,0xff00ff,0x00ffff,0xffff00];
const hamstring1 = [0x00ffff, 0x00ff00,0xff00ff,0xff0000,0x0000ff,0xffff00];
const hamstring2 = [0x0000ff, 0xff0000, 0xff00ff, 0x00ff00, 0xffff00, 0x00ffff];
var counter = 0;

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const quad = new THREE.BoxGeometry(0.5,2,0.5);
const hamstring = new THREE.BoxGeometry(0.25,2,0.25);


const clock = new THREE.Clock()
var temp = 1;
// Materials

const quadMaterial = new THREE.MeshBasicMaterial()
const quadMaterial2 = new THREE.MeshBasicMaterial()
const hamMaterial = new THREE.MeshBasicMaterial()
const hamMaterial2 = new THREE.MeshBasicMaterial()


// Mesh
const quadMesh = new THREE.Mesh(quad,quadMaterial)
quadMesh.position.set(-0.5,0,0)

const hamstringMesh = new THREE.Mesh(hamstring,hamMaterial)
hamstringMesh.position.set(-0.5,0,-0.375)

const quadMesh2 = new THREE.Mesh(quad,quadMaterial2)
quadMesh2.position.set(0.5,0,0)

const hamstringMesh2 = new THREE.Mesh(hamstring,hamMaterial2)
hamstringMesh2.position.set(0.5,0,-0.375)



//edges
const edges = new THREE.EdgesGeometry(quad);
const edgesMaterial = new THREE.LineBasicMaterial({color: 0x000000});

const edgesMesh = new THREE.LineSegments(edges, edgesMaterial);
edgesMesh.position.set(-0.5, 0, 0);

const edgesMesh2 = new THREE.LineSegments(edges, edgesMaterial);
edgesMesh2.position.set(0.5, 0, 0);

const edges2 = new THREE.EdgesGeometry(hamstring);

const edgesMesh3 = new THREE.LineSegments(edges2, edgesMaterial);
edgesMesh3.position.set(-0.5,0,-0.375);

const edgesMesh4 = new THREE.LineSegments(edges2, edgesMaterial);
edgesMesh4.position.set(0.5,0,-0.375);

//Add to scene

scene.add(hamstringMesh)
scene.add(quadMesh)
scene.add(hamstringMesh2)
scene.add(quadMesh2)

scene.add(edgesMesh)
scene.add(edgesMesh2)
scene.add(edgesMesh3)
scene.add(edgesMesh4)


// Lights

const pointLight = new THREE.PointLight(0x000000, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.update()

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

var update = function() {
    var time = clock.getElapsedTime(); // elapsed time since last reset
    if ( time > 2 ) {
        changeColor();
        clock.start(); // resets clock
    }
};

function changeColor()
{
    quadMesh.material.color.set(quad1[counter])
    quadMesh2.material.color.set(quad2[counter])
    hamstringMesh.material.color.set(hamstring1[counter])
    hamstringMesh2.material.color.set(hamstring2[counter])
    counter++
    if (counter > 5)
    {
        counter = 0;
    }


}

function animate() {

    requestAnimationFrame( animate );

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    renderer.render( scene, camera );

}

var render = function()
{
    renderer.render(scene, camera);
};

var GameLoop = function()
{
    requestAnimationFrame(GameLoop);

    update();
    render();
};
GameLoop();
//renderer.render(scene, camera)