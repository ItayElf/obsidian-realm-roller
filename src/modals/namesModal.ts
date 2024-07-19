import { App, Modal, Setting } from "obsidian";
import { titled } from "src/utils";

export default class NamesModal extends Modal {
	private app: App;
	private title: string;
	private names: string[];
	private onRegenerate: () => string[];

	constructor(
		app: App,
		title: string,
		names: string[],
		onRegenerate: () => string[]
	) {
		super(app);
		this.app = app;
		this.title = title;
		this.names = names;
		this.onRegenerate = onRegenerate;
	}

	private static onRegenerateModel(modal: NamesModal) {
		const names = modal.onRegenerate();
		modal.close();
		new NamesModal(
			modal.app,
			modal.title,
			names,
			modal.onRegenerate
		).open();
	}

	onOpen() {
		const { contentEl } = this;

		contentEl.createEl("h1", { text: this.title });
		contentEl.createEl("hr");
		const list = contentEl.createEl("ul");
		this.names.forEach((n) => {
			const item = list.createEl("li", {
				text: titled(n),
			});
			item.style.fontSize = "1.5rem";
		});
		new Setting(contentEl).addButton((btn: any) =>
			btn
				.setButtonText("Regenerate")
				.setCta()
				.onClick(() => NamesModal.onRegenerateModel(this))
		);
	}
}
