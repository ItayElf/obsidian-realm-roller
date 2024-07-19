import RealmRoller from "./main";
import { App, PluginSettingTab, Setting } from "obsidian";

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
	}
}
