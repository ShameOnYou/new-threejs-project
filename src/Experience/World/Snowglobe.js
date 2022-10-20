import * as THREE from "three";
import Experience from "../Experience.js";

export default class Snowglobe {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.resource = this.resources.items.snowGlobe;
		this.debug = this.experience.debug;

		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder("snowglobe");
		}

		this.setModel();
	}

	setModel() {
		this.model = this.resource.scene;
		this.model.position.y = 0.8;
		this.scene.add(this.model);

		this.model.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				child.castShadow = true;
			}
		});

		if (this.debug.active) {
			this.debugFolder
				.add(this.model.position, "x")
				.name("snowGlobeX")
				.min(-5)
				.max(5)
				.step(0.001);
			this.debugFolder
				.add(this.model.position, "y")
				.name("snowGlobeY")
				.min(-5)
				.max(5)
				.step(0.001);
			this.debugFolder
				.add(this.model.position, "z")
				.name("snowGlobeZ")
				.min(-5)
				.max(5)
				.step(0.001);
		}
	}
}
