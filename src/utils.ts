import { App } from "obisidian";

const vowels = ["a", "e", "i", "o", "u"];

export function titled(str: string) {
	return str[0].toUpperCase() + str.substring(1);
}

export function titledEach(str: string) {
	return str.replace(
		/\w\S*/g,
		(text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
	);
}

export const article = (string: string) =>
	vowels.includes(string[0].toLowerCase()) ? `an ${string}` : `a ${string}`;

export async function openFileByPath(app: App, path: string) {
	const file = this.app.vault.getAbstractFileByPath(path);
	const leaf = this.app.workspace.getLeaf(true);
	await leaf.openFile(file);
}
