import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'lil-gui'
import gsap from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'




const Click = document.getElementById('click')
const welcome = document.getElementById('welcome')
const details = document.getElementById('details')
/**
 * Base
 */
// D = ebug
// const gui = new dat.GUI()

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

        Click.innerHTML = "<span>click on page</span>"
        welcome.innerHTML = " <h2>Welcome to The Hallwyl Museum in Stockholm, Sweden.</h2>"
        window.addEventListener('mouseup', () => {

            switch (position) {
                case 0:

                    moveCamera(3, 1.7, -3)
                    cameraRotation(3, 1.7, -3)
                    position = 1
                    welcome.innerHTML = " <h2>Table and Seat Furniture</h2>"
                    details.innerHTML = "<p>Table from the late 17th century, made of guilt wood with a top of Swedish green marble. Inventory number: VI:I:A.a.27.The seat furniture is Swedish and dates from the mid-18th century, but it was reupholstered and gilded in the 1890s.Inventory number: VI:II:A.a.10. </p>"
                    Click.innerHTML = '<span>click on page</span>'
                    break;
                case 1:
                    moveCamera(0.01757213, 0.746, .01568316)
                    cameraRotation(0.3218, 0.77016, -0.2281)
                    position = 2
                    welcome.innerHTML = " <h2>“Prometheus Brings Fire To Mankind”<h2>"
                    details.innerHTML = "<p>This relief over the mantelpiece in Carrara marble was made by the sculptor Gusten Lindberg.  Inventory number: LV:II:B.a.01. </p>"
                    Click.innerHTML = '<span>click on page</span>'

                    break;
                case 2:
                    moveCamera(-0.00445, 0.5, 0.0000052257568)
                    cameraRotation(0.0942058, -0.0512, 0.061141577)
                    position = 3
                    welcome.innerHTML = " <h2>“An Open-air concert”<h2>"
                    details.innerHTML = "<p>This ceiling painting, by Julius Kronberg alludes to the musical function of the room. Inventory number: XXXII:A.b.02.</p>"
                    break;
                case 3:
                    moveCamera(-0.269, 0.77, 0.281)
                    cameraRotation(-9.1504, -0.64, -9.10222574)
                    position = 4
                    welcome.innerHTML = " <h2>Cabinet<h2>"
                    details.innerHTML = "<p>This guilded and richly ornamented cabinet was made in Italy in the 1770s. It was originally owned by Pope Pius VI. His crest adorns the top of the cabinet. Parts of Wilhelmina von Hallwyl’s collection of Asian ceramics are displayed in the cabinet. The main part of this collection is kept in the China room on the second floor. Inventory number:VI:I:I.d.d.07.</p>"
                    Click.innerHTML = '<span>click on page</span>'
                    break;
                case 4:
                    moveCamera(-0.11788, 1.176, -1.283224)
                    cameraRotation(-2.820651, -0.086964, -3.11714)
                    position = 5
                    welcome.innerHTML = " <h2>The Grand Piano<h2>"
                    details.innerHTML = "<p>This Steinway Grand Piano was delivered in 1896 with a relatively simple, brown pear wood case. The architect, Isak Gustaf Clason, was asked to design a new case in a Baroque-inspired style, more in keeping with the decoration of the room.The instrument, which is unique of its kind, was restored in 1990 and is kept in concert pitch.Inventory number:VI:I:C.a.01.</p>"
                    Click.innerHTML = '<span>click on page</span>'
                    break;
                case 5:
                    moveCamera(0.01757213, .756, .01568316)
                    cameraRotation(0.3218, 0.77016, -0.2281)
                    position = 6
                    welcome.innerHTML = " <h2>The Fire Place<h2>"
                    details.innerHTML = "<p>The fireplace has a Belgian marble surround. The fireplaces in the house never in fact had a practical use, as a modern central heating system with hot air was installed when the house was built. The purpose of the fireplaces is instead to reflect the different historical styles of the rooms.</p>"
                    Click.innerHTML = '<span>The End</span>'
                    break;
                default:
                    break;
            }
        })



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
    console.log(camera.position)
    console.log(camera.rotation)
}

tick()
