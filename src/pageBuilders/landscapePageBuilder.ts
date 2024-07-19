import { App } from "obsidian";
import { titled, titledEach } from "src/utils";

export interface Landscape {
	name: string;
	location: string;
	weather: string;
	landscapeType: any;
	features: string[];
	resources: string[];
	encounters: string[];
	knownFor: string;
	size: string;
	travelRate: string;
}

const getContent = (landscape: Landscape) => {
	return [
		`> ${titled(landscape.landscapeType.getLandscapeType$0())}\n`,
		`${titledEach(landscape.name)} ${landscape.size}. It is known for ${
			landscape.knownFor
		}.\n\nFound ${landscape.location}, ${titledEach(landscape.name)} ${
			landscape.weather
		} and is ${landscape.travelRate} traveled through.`,
		"### Special Features",
		"---",
		...landscape.features.map((f) => `- ${titled(f)}`),
		"### Encounters",
		"---",
		...landscape.encounters.map((f) => `- ${titled(f)}`),
		"### Resources",
		"---",
		...landscape.resources.map((f) => `- ${titled(f)}`),
	].join("\n");
};

export default async function buildLandscapePage(
	app: App,
	landscape: Landscape
) {
	const newNote = await app.vault.create(
		`Entities/Landscapes/${titled(landscape.name)}.md`,
		getContent(landscape)
	);
	return newNote.path;
}
