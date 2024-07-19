import { App, Modal, Setting } from "obsidian";
import { titled, writeEntityFile } from "src/utils";
import randpg from "../randpg/randpg";

export default class EmblemModal extends Modal {
	private app: App;
	private emblem: any;
	private name: string;
	private onRegenerate: () => any;

	constructor(app: App, emblem: any, name?: string, onRegenerate: () => any) {
		super(app);
		this.app = app;
		this.emblem = emblem;
		this.name = name ?? new Date().getTime().toString();
		this.onRegenerate = onRegenerate;
	}

	private static onRegenerateModel(modal: EmblemModal) {
		const emblem = modal.onRegenerate();
		modal.close();
		new EmblemModal(
			modal.app,
			emblem,
			modal.name,
			modal.onRegenerate
		).open();
	}

	onOpen() {
		const { contentEl } = this;

		const div = contentEl.createEl("div");
		div.style.marginLeft = "auto";
		div.style.marginRight = "auto";
		div.style.width = "100%";

		div.innerHTML = randpg.getEmblemSvg(this.emblem);
		new Setting(contentEl).addButton((btn: any) =>
			btn
				.setButtonText("Regenerate")
				.setCta()
				.onClick(() => EmblemModal.onRegenerateModel(this))
		);
		const div2 = contentEl.createEl("div");
		div2.style.display = "flex";
		div2.style.flexDirection = "column-reverse";
		new Setting(div2).addButton((btn: any) =>
			btn
				.setButtonText("Save")
				.setCta()
				.onClick(async () => {
					await writeEntityFile(
						app,
						`Emblems/${this.name}.svg`,
						randpg.getEmblemSvg(this.emblem)
					);
					this.close();
				})
		);
		new Setting(div2).setName("Name").addText((text: any) =>
			text.setValue(this.name).onChange(async (value: string) => {
				this.name = value;
			})
		);
	}
}
