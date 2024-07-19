import { Plugin } from "obsidian";

import getCompanionCommand from "./commands/generateCompanion";
import getCompanionNamesCommand from "./commands/generateCompanionNames";

export default class RealmRoller extends Plugin {
	async onload() {
		this.addCommand(getCompanionCommand(this.app));
		this.addCommand(getCompanionNamesCommand(this.app));
	}
}
