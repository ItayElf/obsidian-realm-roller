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
	const file = app.vault.getAbstractFileByPath(path);
	const leaf = app.workspace.getLeaf(true);
	await leaf.openFile(file);
}

export async function writeEntityFile(app: App, path: string, content: string) {
	const rootFolder = "Entities";
	path = rootFolder + "/" + path;

	const folderPath = path.substring(0, path.lastIndexOf("/"));
	const folderExists = app.vault.getAbstractFileByPath(folderPath);
	if (!folderExists) {
		await app.vault.createFolder(folderPath);
	}
	return await app.vault.create(path, content);
}
