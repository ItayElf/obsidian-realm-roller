import { App } from "obsidian";
import { titled, titledEach, writeEntityFile } from "src/utils";
import buildNpcPage, { Npc } from "./npcPageBuilder";
import buildLocationPage, { Location } from "./locationPageBuilder";

interface Settlement {
	name: string;
	settlementType: any;
	dominantRace: any | null;
	locations: Location[];
	description: string;
	dominantOccupation: string | null;
	importantCharacters: Npc[];
	population: number;
	trouble: string;
}

const getSubtitle = (settlement: Settlement) =>
	titled(
		`${settlement.settlementType.getSettlementType$0()} of ${settlement.dominantOccupation?.slice(
			0,
			-1
		)}${" " + titled(settlement.dominantRace?.getPluralName$0()) ?? "s"}`
	);

const getContent = (settlement: Settlement) => {
	return [
		`> ${getSubtitle(settlement)}\n`,
		settlement.description.replace("\n", "\n\n"),
		"",
		`**Population:** ${settlement.population.toLocaleString()}`,
		`**Trouble:** ${settlement.trouble}`,
		"### Locations",
		"---",
		...settlement.locations.map(
			(l) =>
				`- [[${titled(l.name)}]]: ${titled(l.type.getLocationType$0())}`
		),
		"### Important Characters",
		"---",
		...settlement.importantCharacters.map(
			(c) =>
				`- [[${titledEach(c.name)}]]: ${titled(
					c.gender._name
				)} ${c.race.getName$0()} ${c.occupation}`
		),
	].join("\n");
};

export default async function buildSettlementPage(
	app: App,
	settlement: Settlement
) {
	const newNote = await writeEntityFile(
		app,
		`Settlements/${titled(settlement.name)}.md`,
		getContent(settlement)
	);
	settlement.locations.forEach(async (l) => await buildLocationPage(app, l));
	settlement.importantCharacters.forEach(
		async (c) => await buildNpcPage(app, c)
	);
	return newNote.path;
}
