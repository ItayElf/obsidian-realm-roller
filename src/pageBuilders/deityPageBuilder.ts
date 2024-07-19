import { App } from "obsidian";
import { titled, writeEntityFile } from "src/utils";

export interface Deity {
	name: string;
	gender: any | null;
	deityType: any;
	domains: string[];
	alignment: {
		ethical: any;
		moral: any;
	};
	depiction: string;
	worshipedBy: any | null;
	worshipers: string;
	shrinesRarity: string;
	positiveAttribute: string;
	negativeAttribute: string;
}

const getDescription = (deity: Deity) => {
	const worshipers =
		deity.worshipedBy == null
			? "worshipers with no particular race"
			: `${deity.worshipedBy.getPluralName$0()} worshipers`;

	const possessive =
		deity.gender == null
			? "it"
			: deity.gender._name === "male"
			? "him"
			: "her";
	const relPronoun =
		deity.gender == null
			? "its"
			: deity.gender._name === "male"
			? "his"
			: "her";

	return `${deity.name} is often depicted as ${deity.depiction}.\n\n${titled(
		deity.worshipers
	)} ${worshipers} worship ${deity.name} and ${relPronoun} shrines ${
		deity.shrinesRarity
	}.\n\n${deity.name} is described as ${
		deity.positiveAttribute
	} by those who worship ${possessive} and as ${
		deity.negativeAttribute
	} by those who oppose ${possessive}.`;
};

const getContent = (deity: Deity) => {
	const alignment =
		deity.alignment == null
			? "Unaligned"
			: `${deity.alignment.ethical.name} ${deity.alignment.moral.name}`;

	return [
		`> ${titled(alignment)} ${deity.deityType.getDeityType$0()}\n`,
		getDescription(deity),
		"### Domains",
		"---",
		...deity.domains.map((d) => `- ${titled(d)}`),
	].join("\n");
};

export default async function buildDeityPage(app: App, deity: Deity) {
	const newNote = await writeEntityFile(
		app,
		`Deities/${titled(deity.name)}.md`,
		getContent(deity)
	);
	return newNote.path;
}
