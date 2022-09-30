import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import gsap from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
// Loading   

//LoadingManger
const progressBar = document.getElementById('progress-bar')
const progressBarContainer = document.querySelector('.progress-bar-container')



const loadingManager = new THREE.LoadingManager()


loadingManager.onProgress = (url, loaded, total) => {
    progressBar.value = (loaded / total) * 100
}



loadingManager.onLoad = () => {
    progressBarContainer.style.display = 'none'
}

// GLTFLoader 

const gltfloader = new GLTFLoader(loadingManager)

let position = 0


gltfloader.load(
    './scene.gltf',


    (gltf) => {
        scene.add(gltf.scene)



        //  gsap animation

        // gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
        // window.addEventListener('mouseup', () => {
        //     console.log(camera.position)
        // })

        window.addEventListener('mouseup', () => {
            console.log(camera.position)
            switch (position) {
                case 0:

                    moveCamera(3, 1.7, -3)
                    cameraRotation(3, 1.7, -3)
                    position = 1

                    break;
                case 1:
                    moveCamera(0.01757213, 0.746, .01568316)
                    cameraRotation(0.3218, 0.77016, -0.2281)
                    position = 2

                    break;
                case 2:
                    moveCamera(-0.00445, 0.5, 0.0000052257568)
                    cameraRotation(0.0942058, -0.0512, 0.061141577)
                    position = 3

                    break;
                case 3:
                    moveCamera(-0.269, 0.77, 0.281)
                    cameraRotation(-9.1504, -0.64, -9.10222574)
                    position = 4

                    break;
                default:
                    break;
            }
        })


        // moveCamera(-0.00445, 0.5, 0.000052257568)
        // cameraRotation(0.0942058, -0.0512, 0.061141577)

        function moveCamera(x, y, z) {
            gsap.to(camera.position, {
                x,
                y,
                z,
                duration: 3
            })
        }
        function cameraRotation(x, y, z) {
            gsap.to(camera.rotation, {
                x,
                y,
                z,
                duration: 3.2
            })

        }


        // gsap.to(camera.position, {
        //     x: 3,
        //     y: 1.7,
        //     z: -3,
        //     duration: 3
        // })



        // gsap.to(camera.rotation, {
        //     x: 3,
        //     y: 1.5,
        //     z: -3,
        //     duration: 3
        // })

    }
)


/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
// scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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
camera.position.set(-3, 1, -2)
scene.add(camera)



// Controls

const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,

})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



// Firstpersone controls
// const controls = new FirstPersonControls(camera, renderer.domElement)
// controls.movementSpeed = 7
// controls.lookSpeed = 0.005
// controls.mouseDragOn = true

// const controls = new FirstPersonControls(camera, renderer.domElement);
// controls.movementSpeed = 8;
// controls.lookSpeed = 0.08;

// const controls = new FlyControls(camera, renderer.domElement)
// controls.movementSpeed = 1

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime


    // Update controls
    controls.update()


    // Render

    renderer.render(scene, camera)


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    // console.log(camera.position)
    // console.log(camera.rotation)
}

tick()
