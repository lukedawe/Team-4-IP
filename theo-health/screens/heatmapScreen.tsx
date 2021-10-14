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
    MeshBasicMaterial, Vector2, Vector3, Object3D, CylinderGeometry,
} from "three";
import {Renderer} from "expo-three";

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";

export default function HeatmapThing() {

    const col1 = 0x0C5793
    const col2 = 0x5F92BD
    const col3 = 0x94B6D6
    const col4 = 0xB7CEE4
    const col5 = 0xD1D9E0
    const col6 = 0xECC78F
    const col7 = 0xEAAD65
    const col8 = 0xE09147
    const col9 = 0xD2712B
    const col10 = 0xBA3E06

    const quad1 = [col1 ,col1 ,col2 ,col2 ,col3 ,col4 ,col6 ,col8 ,col10 ,col10 ,col9 ,col5 ,col5 ,col5 ,col3 ,col3 ,col1];
    const quad2 = [col1 ,col1 ,col2 ,col3 ,col4 ,col5 ,col10 ,col10 ,col10 ,col10 ,col9 ,col4 ,col3 ,col3 ,col2 ,col2 ,col1];
    const hamstring1 = [col2 ,col2 ,col2 ,col3 ,col3 ,col3 ,col9 ,col9 ,col9 ,col9 ,col10 ,col8 ,col7 ,col7 ,col5 ,col3 ,col1];
    const hamstring2 = [col4 ,col4 ,col2 ,col2 ,col1 ,col2 ,col3 ,col6 ,col8 ,col8 ,col5 ,col5 ,col5 ,col5 ,col3 ,col3 ,col1];
    var counter = 0;
    var angle = 0;

    //const humanObj = require("../assets/models/human.obj")

    const canvas = document.querySelector('canvas.webgl')

    return (
            <GLView
                style={{ flex: 1 }}
                onContextCreate={async (gl) => {
                    // GL Parameter disruption
                    const scene = new Scene()

// Objects
                    const quad = new CylinderGeometry(0.15,0.15,0.6,30);
                    const hamstring = new CylinderGeometry(0.075,0.075,0.8,30);


                    const clock = new Clock()
// Materials

                    const quadMaterial = new MeshBasicMaterial()
                    const quadMaterial2 = new MeshBasicMaterial()
                    const hamMaterial = new MeshBasicMaterial()
                    const hamMaterial2 = new MeshBasicMaterial()


// Mesh
                    const quadMesh = new Mesh(quad,quadMaterial)
                    quadMesh.position.set(-0.25,2,0.12)
                    quadMesh.rotation.set(0,0,-0.1)

                    const quadMesh2 = new Mesh(quad,quadMaterial2)
                    quadMesh2.position.set(0.25,2,0.12)
                    quadMesh2.rotation.set(0,0,0.1)

                    const hamstringMesh = new Mesh(hamstring,hamMaterial)
                    hamstringMesh.position.set(-.27,1.9,-.18)
                    hamstringMesh.rotation.set(-.05,0,0)

                    const hamstringMesh2 = new Mesh(hamstring,hamMaterial2)
                    hamstringMesh2.position.set(.27,1.9,-.18)
                    hamstringMesh2.rotation.set(-.05,0,0)

                    const objLoader = new OBJLoader();
                    // objLoader.setPath('../models/');
                    objLoader.load(humanObj, function (object)
                    {
                        object.position.set(0,0,0);
                        object.scale.set(1,1,1)
                        scene.add(object);
                    })

//edges
                    const edges = new EdgesGeometry(quad);
                    const edgesMaterial = new LineBasicMaterial({color: 0x000000});

                    const edgesMesh = new LineSegments(edges, edgesMaterial);
                    edgesMesh.position.set(-0.25,2,0.12)
                    edgesMesh.rotation.set(0,0,-0.1)

                    const edgesMesh2 = new LineSegments(edges, edgesMaterial);
                    edgesMesh2.position.set(0.25,2,0.12)
                    edgesMesh2.rotation.set(0,0,0.1)

                    const edges2 = new EdgesGeometry(hamstring);

                    const edgesMesh3 = new LineSegments(edges2, edgesMaterial);
                    edgesMesh3.position.set(.27,1.9,-.18)
                    edgesMesh3.rotation.set(-.05,0,0)

                    const edgesMesh4 = new LineSegments(edges2, edgesMaterial);
                    edgesMesh4.position.set(-.27,1.9,-.18)
                    edgesMesh4.rotation.set(-.05,0,0)


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

                    const pointLight = new PointLight(0xffffff, 0.5)
                    pointLight.position.x = 2
                    pointLight.position.y = 3
                    pointLight.position.z = 4
                    scene.add(pointLight)

                    const pointLight2 = new PointLight(0xffffff, 0.5)
                    pointLight2.position.x = -2
                    pointLight2.position.y = 3
                    pointLight2.position.z = -4
                    scene.add(pointLight2)

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
                    camera_pivot.position.set(0,1,0)
                    camera_pivot.rotation.set(0,1.5,0)
                    var Y_AXIS = new Vector3( 0, 1, 0 );

                    scene.add( camera_pivot );
                    camera_pivot.add( camera );
                    camera.position.set( 3, 3, 0 );
                    // camera.lookAt( camera_pivot.position );

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
                        if (counter > 17)
                        {
                            counter = 0;
                        }


                    }

                    function animate()
                    {
                        requestAnimationFrame(animate);
                        camera_pivot.rotateOnAxis( Y_AXIS, 0.00003 );
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
                        if (time > 0.2) {
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