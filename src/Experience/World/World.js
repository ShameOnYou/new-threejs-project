import * as THREE from "three";
import Experience from "../Experience";
import Environment from "./Environment";
import Floor from "./Floor";

export default class World {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;


		//wait for resources
		this.resources.on("ready", () => {
			//setup
			this.environment = new Environment();
			this.floor = new Floor();
		});
	}
}
