import { App } from "obisidian";

export function toTitleCase(str: string) {
	return str[0].toUpperCase() + str.substring(1);
}

export async function openFileByPath(app: App, path: string) {
	const file = this.app.vault.getAbstractFileByPath(path);
	const leaf = this.app.workspace.getLeaf(true);
	await leaf.openFile(file);
}
