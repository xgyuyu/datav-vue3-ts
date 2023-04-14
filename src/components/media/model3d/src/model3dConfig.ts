import { MeshBasicMaterial, PerspectiveCamera, Scene, ShaderMaterial, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Basic } from '../../../map/threeEarth/code/world/Basic'

export interface IModel3d {
    dom: HTMLElement
    data: any
    width: number
    height: number
}
export default class Model3dConfig {
    public basic: Basic
    public scene: Scene
    public camera: PerspectiveCamera
    public renderer: WebGLRenderer
    public controls: OrbitControls
    public material!: ShaderMaterial | MeshBasicMaterial
    public option: IModel3d
    constructor(option: IModel3d) {
        /**
         * 加载资源
         */
        this.option = option
        this.basic = new Basic(option.dom, {x: 0, y: 10, z: 10})
        this.scene = this.basic.scene
        this.renderer = this.basic.renderer
        this.controls = this.basic.controls
        this.camera = this.basic.camera
        this.updateSize()
        setTimeout(() => {
            this.loadGLB()
            this.render()
        })

    }

    loadGLB() {
        new GLTFLoader().load('./model3d/3d3/scene.gltf', (gltf) => {
            console.log('glt=====', gltf);
            this.scene.add(gltf.scene)

        })
    }

    /**
     * 渲染函数
     */
    public render() {
        requestAnimationFrame(this.render.bind(this))
        this.renderer.render(this.scene, this.camera)
        this.controls && this.controls.update()
    }
    // 更新
    public updateSize(width?: number, height?: number) {
        let w = width || this.option.width
        let h = height || this.option.height
        // 取小值
        if (w < h) h = w
        else w = h

        this.renderer.setSize(w, h)
        this.camera.aspect = w / h
        this.camera.updateProjectionMatrix()
    }
}
