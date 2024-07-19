import { Notice, Plugin } from "obsidian";
import randpg from "./randpg/randpg";

export default class RealmRoller extends Plugin {
	async onload() {
		console.log(randpg.generateWorld());
		this.addRibbonIcon("dice", "Greet", () => {
			new Notice("Hello, world!");
		});
	}
}
