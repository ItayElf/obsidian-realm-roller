import { App } from "obsidian";
import { titled } from "src/utils";

export interface Companion {
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
		`> ${titled(companion.gender._name)} ${titled(
			companion.companionType.getCompanionType$0()
		)}\n`,
		`${companion.appearance}\n`,
		`${companion.personality}\n`,
		"### Quirks",
		"---",
		...companion.quirks.map((q) => `- ${titled(q)}`),
		"### Skills",
		"---",
		...companion.skills.map((q) => `- ${titled(q)}`),
	].join("\n");
};

export default async function buildCompanionPage(
	app: App,
	companion: Companion
) {
	const newNote = await app.vault.create(
		`Entities/Companions/${titled(companion.name)}.md`,
		getContent(companion)
	);
	return newNote.path;
}
