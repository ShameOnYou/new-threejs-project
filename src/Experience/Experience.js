import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World";
import Resources from "./Utils/Resources";
import sources from "./sources";
import Debug from "./Utils/Debug";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GPUStatsPanel } from "three/examples/jsm/utils/GPUStatsPanel.js";

let instance = null;

export default class Experience {
	constructor(canvas) {
		if (instance) {
			return instance;
		}
		instance = this;

		window.Experience = this;

		//options
		this.canvas = canvas;

		//setup
		this.debug = new Debug();
		this.sizes = new Sizes();
		this.time = new Time();
		this.scene = new THREE.Scene();
		this.resources = new Resources(sources);
		this.camera = new Camera();
		this.renderer = new Renderer();
		this.world = new World();

		//stats for debugging
		this.stats = new Stats();
		document.body.appendChild(this.stats.domElement);
		//this.gpuPanel = new GPUStatsPanel(this.renderer.instance.getContext());
		//this.stats.addPanel(this.gpuPanel);
		this.stats.showPanel(0);

		//resize event
		this.sizes.on("resize", () => {
			this.resize();
		});

		//Time tick event (happens every frame)
		this.time.on("tick", () => {
			this.stats.update();
			//this.gpuPanel.startQuery();
			this.update();
			//this.gpuPanel.endQuery();
		});
	}

	resize() {
		this.camera.resize();
		this.renderer.resize();
	}

	update() {
		this.camera.update();
		this.renderer.update();
	}

	destroy() {
		this.sizes.off("resize");
		this.time.off("tick");

		//traverse the whole scene
		this.scene.traverse(child, () => {
			if (child instanceof THREE.Mesh) {
				child.geometry.dispose();
				for (const key in child.material) {
					const value = child.material[key];
					if (value && typeof value.dispose === "function") {
						value.dispose();
					}
				}
			}
		});

		this.camera.controls.dispose();
		this.renderer.instance.dispose();

		if (this.debug.active) {
			this.debug.ui.destroy();
		}
	}
}
