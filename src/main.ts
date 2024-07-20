import { Plugin } from "obsidian";

import getCompanionCommand from "./commands/generationCommands/generateCompanion";
import getCompanionNamesCommand from "./commands/generationCommands/generateCompanionNames";
import getNpcCommand from "./commands/generationCommands/generateNpc";
import getNamesCommand from "./commands/generationCommands/generateNames";
import getLocationCommand from "./commands/generationCommands/generateLocation";
import getSettlementCommand from "./commands/generationCommands/generateSettlement";
import getSettlementNamesCommand from "./commands/generationCommands/generateSettlementNames";
import getLandscapeCommand from "./commands/generationCommands/generateLandscape";
import { RealmRollerSettingTab } from "./settingsTab";
import getDeityCommand from "./commands/generationCommands/generateDeity";
import getEmblemCommand from "./commands/generationCommands/generateEmblem";
import getGuildCommand from "./commands/generationCommands/generateGuild";
import getKingdomCommand from "./commands/generationCommands/generateKingdom";
import getWorldCommand from "./commands/generationCommands/generateWorld";

interface RealmRollerSettings {
	rootFolder: string;
}

const DEFAULT_SETTINGS: Partial<RealmRollerSettings> = {
	rootFolder: "Entities",
};

export default class RealmRoller extends Plugin {
	settings: RealmRollerSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new RealmRollerSettingTab(this.app, this));

		this.app.getSettings = () => this.settings;

		this.addCommand(getCompanionCommand(this.app));
		this.addCommand(getCompanionNamesCommand(this.app));
		this.addCommand(getNpcCommand(this.app));
		this.addCommand(getNamesCommand(this.app));
		this.addCommand(getLocationCommand(this.app));
		this.addCommand(getSettlementCommand(this.app));
		this.addCommand(getSettlementNamesCommand(this.app));
		this.addCommand(getLandscapeCommand(this.app));
		this.addCommand(getDeityCommand(this.app));
		this.addCommand(getEmblemCommand(this.app));
		this.addCommand(getGuildCommand(this.app));
		this.addCommand(getKingdomCommand(this.app));
		this.addCommand(getWorldCommand(this.app));
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
