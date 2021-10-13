
import * as React from "react";
import {DatePickerIOSComponent, View} from "react-native";
import { GLView } from "expo-gl";

import {
    SphereGeometry,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    BoxGeometry,
    Clock,
    LineBasicMaterial,
    LineSegments,
    WebGLRenderer,
    EdgesGeometry,
    MeshBasicMaterial, Vector2, Vector3, Object3D,
} from "three";
import {Renderer} from "expo-three";

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";



export default function HeatmapThing() {

    const quad1 = [0xff0000,0x00ff00,0x0000ff,0xff00ff,0xffff00,0x00ffff];
    const quad2 = [0x00ff00,0x0000ff,0xff0000,0xff00ff,0x00ffff,0xffff00];
    const hamstring1 = [0x00ffff, 0x00ff00,0xff00ff,0xff0000,0x0000ff,0xffff00];
    const hamstring2 = [0x0000ff, 0xff0000, 0xff00ff, 0x00ff00, 0xffff00, 0x00ffff];
    var counter = 0;
    var angle = 0;

    const canvas = document.querySelector('canvas.webgl')

    return (
            <GLView
                style={{ flex: 1 }}
                onContextCreate={async (gl) => {
                    // GL Parameter disruption
                    const scene = new Scene()

// Objects
                    const quad = new BoxGeometry(0.5,2,0.5);
                    const hamstring = new BoxGeometry(0.25,2,0.25);


                    const clock = new Clock()
// Materials

                    const quadMaterial = new MeshBasicMaterial()
                    const quadMaterial2 = new MeshBasicMaterial()
                    const hamMaterial = new MeshBasicMaterial()
                    const hamMaterial2 = new MeshBasicMaterial()


// Mesh
                    const quadMesh = new Mesh(quad,quadMaterial)
                    quadMesh.position.set(-0.5,0,0)

                    const hamstringMesh = new Mesh(hamstring,hamMaterial)
                    hamstringMesh.position.set(-0.5,0,-0.375)

                    const quadMesh2 = new Mesh(quad,quadMaterial2)
                    quadMesh2.position.set(0.5,0,0)

                    const hamstringMesh2 = new Mesh(hamstring,hamMaterial2)
                    hamstringMesh2.position.set(0.5,0,-0.375)



//edges
                    const edges = new EdgesGeometry(quad);
                    const edgesMaterial = new LineBasicMaterial({color: 0x000000});

                    const edgesMesh = new LineSegments(edges, edgesMaterial);
                    edgesMesh.position.set(-0.5, 0, 0);

                    const edgesMesh2 = new LineSegments(edges, edgesMaterial);
                    edgesMesh2.position.set(0.5, 0, 0);

                    const edges2 = new EdgesGeometry(hamstring);

                    const edgesMesh3 = new LineSegments(edges2, edgesMaterial);
                    edgesMesh3.position.set(-0.5,0,-0.375);

                    const edgesMesh4 = new LineSegments(edges2, edgesMaterial);
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

                    const pointLight = new PointLight(0x000000, 0.1)
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
                    const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
                    camera.lookAt(0,0,0)
                    scene.add(camera)

                    var camera_pivot = new Object3D()
                    var Y_AXIS = new Vector3( 0, 1, 0 );

                    scene.add( camera_pivot );
                    camera_pivot.add( camera );
                    camera.position.set( 2, 2, 0 );
                    camera.lookAt( camera_pivot.position );

                    /**
                     * Renderer
                     */
                    const renderer = new Renderer({ gl });
                    renderer.setSize(sizes.width, sizes.height);
                    renderer.setClearColor("#fff");

                    const controls = new OrbitControls (camera, renderer.domElement);
                    controls.target.set(0,0,0);

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

                    function animate()
                    {
                        requestAnimationFrame(animate);
                        camera_pivot.rotateOnAxis( Y_AXIS, 0.00001 );
                        renderer.render( scene, camera );
                    }

                    // Render function
                    const render = () => {
                        //requestAnimationFrame(render);
                        renderer.render(scene, camera);
                        gl.endFrameEXP();
                    };

                    function colourChange() {
                        var time = clock.getElapsedTime(); // elapsed time since last reset
                        if (time > 1) {
                            changeColor();
                            clock.start(); // resets clock
                        }
                    }

                    function GameLoop()
                    {
                        requestAnimationFrame( GameLoop );
                        animate();
                        colourChange();
                        render();
                    }
                    //loop
                    GameLoop();
                }}
            >
            </GLView>

    );
}