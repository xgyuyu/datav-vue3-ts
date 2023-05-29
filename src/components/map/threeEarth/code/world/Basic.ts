/**
 * 创建 threejs 四大天王
 * 场景、相机、渲染器、控制器
 */

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export interface ICameraPosition {
  x: number
  y: number
  z: number
}

export class Basic {
  public scene!: THREE.Scene
  public camera!: THREE.PerspectiveCamera
  public renderer!: THREE.WebGLRenderer
  public controls!: OrbitControls
  public dom: HTMLElement
  public cameraPosition: ICameraPosition

  constructor(dom: HTMLElement, cameraPosition: ICameraPosition) {
    this.dom = dom
    this.cameraPosition = cameraPosition
    this.initScenes()
    this.setControls()
  }

  /**
   * 初始化场景
   */
  initScenes() {
    this.scene = new THREE.Scene()
    let ambientLight = new THREE.AmbientLight(0xffffff); //设置环境光
    this.scene.add(ambientLight); //将环境光添加到场景中
    // let pointLight = new THREE.PointLight(0xffffff, 1, 0);
    // pointLight.position.set(200, 200, 200); //设置点光源位置
    // this.scene.add(pointLight); //将点光源添加至场景

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
    this.camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z)

    this.renderer = new THREE.WebGLRenderer({
      // canvas: this.dom,
      alpha: true, // 透明
      antialias: true // 抗锯齿
    })
    this.renderer.setPixelRatio(window.devicePixelRatio) // 设置屏幕像素比
    this.renderer.setSize(window.innerWidth, window.innerHeight) // 设置渲染器宽高
    this.dom.appendChild(this.renderer.domElement) // 添加到dom中
  }

  /**
   * 设置控制器
   */
  setControls() {
    // 鼠标控制      相机，渲染dom
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.controls.autoRotateSpeed = 3
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    this.controls.enableDamping = true
    // 动态阻尼系数 就是鼠标拖拽旋转灵敏度
    this.controls.dampingFactor = 0.05
    // 是否可以缩放
    this.controls.enableZoom = true
    // 设置相机距离原点的最远距离
    this.controls.minDistance = 10
    // 设置相机距离原点的最远距离
    this.controls.maxDistance = 300
    // 是否开启右键拖拽
    this.controls.enablePan = false
  }
}
