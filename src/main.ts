import { Notice, Plugin } from "obsidian";

import getCompanionCommand from "./commands/generateCompanion";

export default class RealmRoller extends Plugin {
	async onload() {
		this.addCommand(getCompanionCommand(this.app));
	}
}
