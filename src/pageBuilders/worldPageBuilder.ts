import { App } from "obsidian";
import { titled, titledEach, writeEntityFile } from "src/utils";
import buildKingdomPage, { Kingdom } from "./kingdomPageBuilder";
import buildLandscapePage, { Landscape } from "./landscapePageBuilder";
import buildNpcPage, { Npc } from "./npcPageBuilder";
import buildGuildPage, { Guild } from "./guildPageBuilder";
import buildDeityPage, { Deity } from "./deityPageBuilder";

interface WorldLore {
	loreType: any;
	everybodyKnows: string;
	fewKnow: string;
	nobodyKnows: string;
	peasantsBelieve: string;
	nobilityBelieves: string;
	godsPlan: string;
	godsFear: string;
}

export interface World {
	name: string;
	worldSettings: any;
	kingdoms: Kingdom[];
	landscapes: Landscape[];
	opinions: Map<any, string>;
	importantPeople: Npc[];
	guilds: Guild[];
	deities: Deity[];
	lesserDeities: Deity[];
	higherDeities: Deity[];
	worldLore: WorldLore;
}

const getDeitiesTable = (deities: Deity[]) => {
	let table: string[] = [];
	const formatDeity = (deity: Deity) =>
		`[[${deity.name}]]<br>${
			deity.alignment == null
				? "Unaligned"
				: `${deity.alignment.ethical.name} ${deity.alignment.moral.name}`
		}`;
	for (let i = 0; i < deities.length; i += 3) {
		table = [
			...table,
			`| ${formatDeity(deities[i])} | ${formatDeity(
				deities[i + 1]
			)} | ${formatDeity(deities[i + 2])} |`,
		];
	}
	table = [table[0], "|---|---|---|", ...table.slice(1)];
	return table.join("\n");
};

const getWorldLore = (worldLore: WorldLore, name: string) => {
	return [
		`In ${name}, it is common knowledge that ${worldLore.everybodyKnows}, although only a selected few are aware of the fact that ${worldLore.fewKnow}.\n`,
		`Almost nobody in ${name} has any knowledge that ${worldLore.nobodyKnows}.\n`,
		`The peasants of ${name} are convinced that ${worldLore.peasantsBelieve}, while the nobility tends to believe that ${worldLore.nobilityBelieves}.\n`,
		`The gods of ${name} plan ${worldLore.godsPlan}, but they also harbor a fear of ${worldLore.godsFear}.`,
	].join("\n");
};

const getOpinions = (world: World) => {
	let opinions: any[][] = [];
	let curr = world.opinions._first;
	while (curr !== world.opinions._last) {
		opinions = [...opinions, [curr.hashMapCellKey, curr.hashMapCellValue]];
		curr = curr._next;
	}
	return opinions;
};

const getContent = (world: World) => {
	return [
		"> World\n",
		getWorldLore(world.worldLore, titled(world.name)),
		"### Stereotypes",
		"---",
		...getOpinions(world).map(
			(e) => `- **${titled(e[0].getPluralName$0())}:** ${e[1]}`
		),
		"### Deities",
		"---",
		getDeitiesTable(world.deities),
		"#### Lesser Deities",
		"---",
		...world.lesserDeities.map(
			(d) =>
				`- [[${titled(
					d.name
				)}]]: ${d.deityType.getDeityType$0()} of ${d.domains.join(
					" and "
				)}`
		),
		"#### Higher Deities",
		"---",
		...world.higherDeities.map(
			(d) =>
				`- [[${titled(
					d.name
				)}]]: ${d.deityType.getDeityType$0()} of ${d.domains.join(
					" and "
				)}`
		),
		"### Kingdoms",
		"---",
		...world.kingdoms.map(
			(k) =>
				`- [[${titled(k.name)}]]: ${titled(
					k.governmentType.getGovernmentType$0()
				)} of ${titled(k.race.getPluralName$0())}`
		),
		"### Worldwide Guilds",
		"---",
		...world.guilds.map(
			(g) =>
				`- [[${titled(g.name)}]]: ${titled(
					g.guildType.getGuildType$0()
				)}`
		),
		"### Landscapes",
		"---",
		...world.landscapes.map(
			(l) =>
				`- [[${titled(l.name)}]]: ${titled(
					l.landscapeType.getLandscapeType$0()
				)}`
		),
		"### Important Characters",
		"---",
		...world.importantPeople.map(
			(c) =>
				`- [[${titledEach(c.name)}]]: ${titled(
					c.gender._name
				)} ${c.race.getName$0()} ${c.occupation}`
		),
	].join("\n");
};

export default async function buildWorldPage(app: App, world: World) {
	const newNote = await writeEntityFile(
		app,
		`Worlds/${titled(world.name)}.md`,
		getContent(world)
	);
	[...world.deities, ...world.lesserDeities, ...world.higherDeities].forEach(
		(d) => buildDeityPage(app, d)
	);
	world.kingdoms.forEach((k) => buildKingdomPage(app, k));
	world.guilds.forEach((g) => buildGuildPage(app, g));
	world.landscapes.forEach((l) => buildLandscapePage(app, l));
	world.importantPeople.forEach((c) => buildNpcPage(app, c));
	return newNote.path;
}
