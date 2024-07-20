import { App, Modal, TFile } from "obsidian";
import { getRecursiveLinksCount } from "src/commands/deleteEntry";

export default class ConfirmDeleteModal extends Modal {
	private file: TFile;
	private app: App;
	private onConfirm: () => Promise<void>;

	constructor(app: App, file: TFile, onConfirm: () => Promise<void>) {
		super(app);
		this.app = app;
		this.file = file;
		this.onConfirm = onConfirm;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.createEl("div", { text: "Delete Entry", cls: "modal-title" });
		contentEl.createEl("p", {
			text: "Are you sure you want to delete this file and all files it links to recursively?",
		});
		contentEl.createEl("p", {
			text: `${
				getRecursiveLinksCount(this.app, this.file) + 1
			} pages will be deleted`,
			cls: "mod-warning",
		});

		const buttonContainer = contentEl.createDiv({
			cls: "modal-button-container",
		});
		const confirmButton = buttonContainer.createEl("button", {
			text: "Delete",
			cls: "mod-warning",
		});
		const cancelButton = buttonContainer.createEl("button", {
			text: "Cancel",
		});

		confirmButton.addEventListener("click", async () => {
			await this.onConfirm();
			this.close();
		});

		cancelButton.addEventListener("click", () => {
			this.close();
		});
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
