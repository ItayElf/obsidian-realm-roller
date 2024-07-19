import { Notice, Plugin } from "obsidian";

export default class RealmRoller extends Plugin {
	async onload() {
		console.log("test");
		this.addRibbonIcon("dice", "Greet", () => {
			new Notice("Hello, world!");
		});
	}
}
