import RealmRoller from "./main";
import { App, PluginSettingTab, Setting } from "obsidian";
import randpg from "./randpg/randpg";
import { titled } from "./utils";

export class RealmRollerSettingTab extends PluginSettingTab {
	plugin: RealmRoller;

	constructor(app: App, plugin: RealmRoller) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Root Folder")
			.setDesc("Root folder for all generated entities")
			.addText((text: any) =>
				text
					.setPlaceholder("Entities")
					.setValue(this.plugin.settings.rootFolder)
					.onChange(async (value: string) => {
						this.plugin.settings.rootFolder = value;
						await this.plugin.saveSettings();
					})
			);

		containerEl.createEl("hr");
		containerEl.createEl("div", {
			text: "Races",
			cls: "setting-item-heading setting-item",
		});
		new randpg.RaceManager().get$activeTypes().forEach((r) => {
			new Setting(containerEl)
				.setName(titled(r.getName$0()))
				.setDesc(`Enable the ${titled(r.getName$0())} race`)
				.addToggle((toggle: any) =>
					toggle
						.setValue(
							this.plugin.settings.races.includes(r.getName$0())
						)
						.onChange(async () => this.onRaceChange(r.getName$0()))
				);
		});
	}

	private async onRaceChange(r: string) {
		if (this.plugin.settings.races.includes(r)) {
			this.plugin.settings.races = this.plugin.settings.races.filter(
				(r2) => r2 !== r
			);
		} else {
			this.plugin.settings.races = [...this.plugin.settings.races, r];
		}
		await this.plugin.saveSettings();
	}
}
