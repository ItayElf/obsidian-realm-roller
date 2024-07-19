import { App } from "obsidian";
import { toTitleCase } from "src/utils";

interface Companion {
	appearance: string;
	companionType: any;
	gender: any;
	name: string;
	personality: string;
	quirks: string[];
	skills: string[];
}

const getContent = (companion: Companion) => {
	return [
		`> ${toTitleCase(companion.gender._name)} ${toTitleCase(
			companion.companionType.getCompanionType$0()
		)}\n`,
		`${companion.appearance}\n`,
		`${companion.personality}\n`,
		"### Quirks",
		"---",
		...companion.quirks.map((q) => `- ${toTitleCase(q)}`),
		"### Skills",
		"---",
		...companion.skills.map((q) => `- ${toTitleCase(q)}`),
	].join("\n");
};

export default async function buildCompanionPage(
	app: App,
	companion: Companion
) {
	const newNote = await app.vault.create(
		`Entities/Companions/${toTitleCase(companion.name)}.md`,
		getContent(companion)
	);
	return newNote.path;
}
