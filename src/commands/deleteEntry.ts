import { TFile, App } from "obsidian";
import ConfirmDeleteModal from "src/modals/confirmantionModal";

export const getLinks = (app: App, file: TFile) => {
	const metadataCache = app.metadataCache;
	const cache = metadataCache.getFileCache(file);
	const links = cache?.links;
	const embeds = cache?.embeds;
	let result: TFile[] = [];
	if (links) {
		const linkedFiles = links
			.map((l: any) =>
				metadataCache.getFirstLinkpathDest(l.link, file.path)
			)
			.filter((l: any) => l !== null);
		result = [...result, ...linkedFiles];
	}
	if (embeds) {
		const linkedEmbeds = embeds
			.map((l: any) =>
				metadataCache.getFirstLinkpathDest(l.link, file.path)
			)
			.filter((l: any) => l !== null);
		result = [...result, ...linkedEmbeds];
	}
	return result;
};

export function getRecursiveLinksCount(
	app: App,
	file: TFile,
	visited: Set<string> = new Set()
): number {
	if (visited.has(file.path)) {
		return 0; // If already visited, return 0 to avoid infinite loops
	}

	visited.add(file.path);

	const links = getLinks(app, file);
	let totalLinks = links.length;

	for (const link of links) {
		totalLinks += getRecursiveLinksCount(app, link, visited);
	}

	return totalLinks;
}

const onDelete = async (app: App, file: TFile) => {
	const links = getLinks(app, file);
	links.forEach(async (l: any) => await onDelete(app, l));
	await app.vault.delete(file);
};

const getEntryDeleteCommand = (app: App) => {
	return {
		id: "realm-roller-delete-entry",
		name: "Delete Entry and Children",
		checkCallback: (checking: boolean) => {
			const activeFile = app.workspace.getActiveFile();
			if (activeFile) {
				if (checking) {
					return true;
				}
				new ConfirmDeleteModal(
					app,
					activeFile,
					async () => await onDelete(app, activeFile)
				).open();
				return true;
			}
			return false;
		},
	};
};

export default getEntryDeleteCommand;
