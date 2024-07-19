import { App } from "obsidian";
import { titled, titledEach, writeEntityFile } from "src/utils";
import buildNpcPage, { Npc } from "./npcPageBuilder";
import buildSettlementPage, {
	getSettlementSubtitle,
	Settlement,
} from "./settlementPageBuilder";
import buildGuildPage, { Guild } from "./guildPageBuilder";
import randpg from "src/randpg/randpg";

export interface Kingdom {
	name: string;
	kingdomType: any;
	rulers: Npc[];
	race: any;
	population: number;
	capital: Settlement;
	importantSettlements: Settlement[];
	governmentType: any;
	emblem: any;
	knownFor: string;
	history: string;
	guilds: Guild[];
	trouble: string;
}

const getContent = (kingdom: Kingdom) => {
	const title = ["theocracy", "monarchy"].includes(
		kingdom.governmentType.getGovernmentType$0()
	)
		? "kingdom"
		: kingdom.governmentType.getGovernmentType$0();
	return [
		`> ${titled(kingdom.governmentType.getGovernmentType$0())} of ${titled(
			kingdom.race.getPluralName$0()
		)}\n`,
		kingdom.history.replace("\n", "\n\n"),
		"",
		`**Population:** ${kingdom.population.toLocaleString()}`,
		`**Known For:** ${kingdom.knownFor}`,
		`**Trouble:** ${kingdom.trouble}`,
		"",
		`![[${titled(kingdom.name)}.svg]]`,
		`*The ${title} of ${titled(kingdom.name)}*`,
		"### Capital",
		"---",
		`- [[${titled(kingdom.capital.name)}]]: ${getSettlementSubtitle(
			kingdom.capital
		)}`,
		`### Ruler${kingdom.rulers.length > 1 ? "s" : ""}`,
		"---",
		...kingdom.rulers.map(
			(c) =>
				`- [[${titledEach(c.name)}]]: ${titled(
					c.gender._name
				)} ${c.race.getName$0()} ${c.occupation}`
		),
		"### Guilds",
		"---",
		...kingdom.guilds.map(
			(g) =>
				`- [[${titled(g.name)}]]: ${titled(
					g.guildType.getGuildType$0()
				)}`
		),
		"### Notable Settlements",
		"---",
		...kingdom.importantSettlements.map(
			(s) => `- [[${titled(s.name)}]]: ${getSettlementSubtitle(s)}`
		),
	].join("\n");
};

export default async function buildKingdomPage(app: App, kingdom: Kingdom) {
	const newNote = await writeEntityFile(
		app,
		`Kingdoms/${titled(kingdom.name)}.md`,
		getContent(kingdom)
	);
	[kingdom.capital, ...kingdom.importantSettlements].forEach((s) =>
		buildSettlementPage(app, s)
	);
	kingdom.rulers.forEach((r) => buildNpcPage(app, r));
	kingdom.guilds.forEach((g) => buildGuildPage(app, g));
	await writeEntityFile(
		app,
		`Emblems/${titledEach(kingdom.name)}.svg`,
		randpg.getEmblemSvg(kingdom.emblem)
	);
	return newNote.path;
}
