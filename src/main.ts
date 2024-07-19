import { Plugin } from "obsidian";

import getCompanionCommand from "./commands/generateCompanion";
import getCompanionNamesCommand from "./commands/generateCompanionNames";
import getNpcCommand from "./commands/generateNpc";
import getNamesCommand from "./commands/generateNames";
import getLocationCommand from "./commands/generateLocation";
import getSettlementCommand from "./commands/generateSettlement";

export default class RealmRoller extends Plugin {
	async onload() {
		this.addCommand(getCompanionCommand(this.app));
		this.addCommand(getCompanionNamesCommand(this.app));
		this.addCommand(getNpcCommand(this.app));
		this.addCommand(getNamesCommand(this.app));
		this.addCommand(getLocationCommand(this.app));
		this.addCommand(getSettlementCommand(this.app));
	}
}
