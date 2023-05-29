import { MeshBasicMaterial, PerspectiveCamera, Scene, ShaderMaterial, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { Basic } from '../../../map/threeEarth/code/world/Basic'
import * as THREE from 'three';

export interface IModel3d {
    dom: HTMLElement
    // data: any
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
    public maps: Map<any, any>
    public cabinets: Array<any>
    public left: number
    public top: number
    public pointer: any
    public raycaster: any
    public curCabinet: any

    constructor(option: IModel3d) {
        /**
         * 加载资源
         */
        this.option = option
        this.basic = new Basic(option.dom, {x: 0, y: 10, z: 25})
        this.scene = this.basic.scene
        this.renderer = this.basic.renderer
        this.controls = this.basic.controls
        this.camera = this.basic.camera
        this.updateSize()
        setTimeout(() => {
            this.loadGLB()
            this.render()

            // 对div做onmousemove的事件监听
            // let modelDiv: HTMLDivElement = document.querySelector('#model-3d');
            // modelDiv.onmousemove = ({ clientX, clientY }) => {
            //     this.selectCabinet(clientX, clientY)
            // }
        })

        //
        this.pointer = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.cabinets = []
        this.maps = new Map<any, any>()
        this.maps.set("./model3d/3d1/cabinet-hover.jpg", new THREE.TextureLoader().load(`./model3d/3d1/cabinet-hover.jpg`));
    }

    loadGLB() {
        const GLTF = new GLTFLoader();
        GLTF.load('./model3d/3d1/machineRoom.gltf', (gltf) => {
            console.log('glt=====', gltf);
            gltf.scene.position.set(0,0,0)
            this.scene.add(gltf.scene)
            gltf.scene.traverse((child)=>{
                console.log('child=====', child);
                // 针对包含 cabinet 的模型做特殊处理
                // if (child.material) {
                //     const { color, map, name } = child.material;
                //     this.changeMat(child, map, color);
                //     if (name.includes("cabinet")) {
                //         this.cabinets.push(child);
                //     }
                // }
            })
        })
        // new RGBELoader().load('./model3d/3d4/resources/sky.hdr', texture => {
        //     // this.scene.background = texture;
        //     texture.mapping = THREE.EquirectangularReflectionMapping;
        //     this.scene.environment = texture;
        //     this.renderer.outputEncoding = THREE.sRGBEncoding;
        //     this.renderer.render(this.scene, this.camera);
        // });
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
        // if (w < h) h = w
        // else w = h

        this.renderer.setSize(w, h)
        this.camera.aspect = w / h
        this.camera.updateProjectionMatrix()
    }


    // // 鼠标悬浮上去的效果
    // changeMat(obj, map, color) {
    //     if (map) {
    //         obj.material = new THREE.MeshBasicMaterial({
    //             map: this.crtTexture('./model3d/3d1/' + map.name),
    //         });
    //     } else {
    //         obj.material = new THREE.MeshBasicMaterial({ color });
    //     }
    // }
    // crtTexture(imgName) {
    //     let curTexture = this.maps.get(imgName);
    //     if (!curTexture) {
    //         curTexture = new THREE.TextureLoader().load(imgName);
    //         // curTexture.flipY = false;
    //         curTexture.wrapS = 1000;
    //         curTexture.wrapT = 1000;
    //         this.maps.set(imgName, curTexture);
    //     }
    //     return curTexture;
    // }
    // selectCabinet(x, y) {
    //
    //     // 鼠标的canvas坐标转裁剪坐标
    //     this.pointer.set(((x - 589) / this.option.width) * 2 - 1, -((y - 104) / this.option.height) * 2 + 1);
    //
    //     // 基于鼠标点和相机设置射线投射器
    //     this.raycaster.setFromCamera(this.pointer, this.camera);
    //
    //     // 选择机柜
    //     const intersect = this.raycaster.intersectObjects(this.cabinets)[0];
    //     let intersectObj = intersect ? (intersect.object) : null;
    //     // 若之前已有机柜被选择，且不等于当前所选择的机柜，取消已选机柜的高亮
    //     if (this.curCabinet && this.curCabinet !== intersectObj) {
    //         const material = this.curCabinet.material;
    //         material.setValues({
    //             map: this.maps.get("./model3d/3d1/cabinet.jpg"),
    //         });
    //     }
    //     /*
    //     若当前所选对象不为空：
    //       触发鼠标在机柜上移动的事件。
    //       若当前所选对象不等于上一次所选对象：
    //         更新curCabinet。
    //         将模型高亮。
    //         触发鼠标划入机柜事件。
    //     否则：
    //       置空curCabinet。
    //       触发鼠标划出机柜事件。
    //     */
    //     if (intersectObj) {
    //         if (intersectObj !== this.curCabinet) {
    //             this.curCabinet = intersectObj;
    //             const material = intersectObj.material;
    //             material.setValues({
    //                 map: this.maps.get("./model3d/3d1/cabinet-hover.jpg"),
    //             });
    //             this.left = x;
    //             this.top = y;
    //             this.onMouseOverCabinet(intersectObj);
    //         }
    //     } else if (this.curCabinet) {
    //         this.curCabinet = null;
    //         this.onMouseOverCabinet();
    //     }
    // }
    // onMouseOverCabinet (cabinet?) {
    //     if (cabinet) {
    //         document.getElementById('plane').style.display = 'block'
    //         document.getElementById('plane').style.position = 'absolute'
    //         document.getElementById('plane').style.left = this.left - 589 + 'px'
    //         document.getElementById('plane').style.top = this.top - 104 + 'px'
    //     } else {
    //         document.getElementById('plane').style.display = 'none'
    //     }
    // }
}
