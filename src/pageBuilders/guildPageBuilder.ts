import { App } from "obsidian";
import { titled, titledEach, writeEntityFile } from "src/utils";
import buildNpcPage, { Npc } from "./npcPageBuilder";
import randpg from "src/randpg/randpg";

export interface Guild {
	name: string;
	leader: Npc;
	guildType: any;
	reputation: string;
	history: string;
	emblem: any;
	motto: string;
	specialties: string[];
	quests: string[];
	notableMembers: Npc[];
}

const getContent = (guild: Guild) => {
	return [
		`> ${titled(guild.guildType.getGuildType$0())}\n`,
		guild.history.replace("\n", "\n\n"),
		"",
		`**Known For:** ${guild.reputation}`,
		"",
		`![[${titled(guild.name)}.svg]]`,
		`*${titled(guild.motto)}*`,
		"### Specialties",
		"---",
		...guild.specialties.map((g) => `- ${titled(g)}`),
		"### Quests",
		"---",
		...guild.quests.map((g) => `- ${titled(g)}`),
		"### Leader",
		"---",
		`- [[${titledEach(guild.leader.name)}]]: ${titled(
			guild.leader.gender._name
		)} ${guild.leader.race.getName$0()} ${guild.leader.occupation}`,
		"### Notable Members",
		"---",
		...guild.notableMembers.map(
			(c) =>
				`- [[${titledEach(c.name)}]]: ${titled(
					c.gender._name
				)} ${c.race.getName$0()} ${c.occupation}`
		),
	].join("\n");
};

export default async function buildGuildPage(app: App, guild: Guild) {
	const newNote = await writeEntityFile(
		app,
		`Guilds/${titled(guild.name)}.md`,
		getContent(guild)
	);
	await writeEntityFile(
		app,
		`Emblems/${titledEach(guild.name)}.svg`,
		randpg.getEmblemSvg(guild.emblem)
	);
	[guild.leader, ...guild.notableMembers].forEach(
		async (c) => await buildNpcPage(app, c)
	);
	return newNote.path;
}
