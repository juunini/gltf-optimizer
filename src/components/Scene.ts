import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const WIDTH = 400
const HEIGHT = 400

function orbitControls(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.listenToKeyEvents(window)

  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.screenSpacePanning = true
  controls.minDistance = 1
  controls.maxDistance = 500
  controls.maxPolarAngle = Math.PI
  controls.autoRotate = true

  return controls
}

function lights() {
  const dirLight1 = new THREE.DirectionalLight(0xFFFFFF, 0.8 * Math.PI)
  dirLight1.position.set(0.5, 0, 0.866)

  const dirLight2 = new THREE.DirectionalLight(0xFFFFFF, 0.8 * Math.PI)
  dirLight2.position.set(-0.5, 0, -0.866)

  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.3)

  return [dirLight1, dirLight2, ambientLight]
}

function newRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.physicallyCorrectLights = true;
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(WIDTH, HEIGHT)
  renderer.setClearColor(0xCCCCCC)
  return renderer
}

export function newScene() {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x191919)

  const renderer = newRenderer()
  const camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 1, 1000)
  const controls = orbitControls(camera, renderer)
  lights().forEach(light => scene.add(light))

  window.addEventListener('resize', onWindowResize)

  function onWindowResize() {
    camera.aspect = WIDTH / HEIGHT
    camera.updateProjectionMatrix()
    renderer.setSize(WIDTH, HEIGHT)
  }

  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    render()
  }

  const render = () => renderer.render(scene, camera)

  return { scene, camera, renderer, animate }
}

function gltfLoader() {
  const loader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()

  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
  loader.setDRACOLoader(dracoLoader)

  return loader
}

export async function loadGLTF(path: string, camera: THREE.PerspectiveCamera) {
  const loader = gltfLoader()

  const gltf = await loader.loadAsync(path)
  const box = new THREE.Box3().setFromObject(gltf.scene)
  const size = box.getSize(new THREE.Vector3()).length()
  const center = box.getCenter(new THREE.Vector3())

  gltf.scene.position.x = -center.x
  gltf.scene.position.y = -center.y
  gltf.scene.position.z = -center.z

  camera.near = size / 100
  camera.far = size * 100
  camera.updateProjectionMatrix()

  camera.position.copy(center)
  camera.position.x += size / 2
  camera.position.y += size / 5
  camera.position.z += size / 2
  camera.lookAt(center)

  return gltf
}
