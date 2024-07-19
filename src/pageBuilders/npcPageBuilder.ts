import { App } from "obsidian";
import { article, titled, titledEach } from "src/utils";
import { Companion } from "./companionPageBuilder";

interface Hair {
	length: string;
	type: string;
	color: string;
}

export interface Personality {
	alignment: {
		ethical: any;
		moral: any;
	};
	descriptors: string[];
	quirks: string[];
	traits: string[];
}

export interface PhysicalDescription {
	beard: Hair | null;
	build: string;
	eyes: string;
	face: string;
	hairStyle: Hair;
	height: number;
	skin: string;
	specialFeatures: string[];
}

export interface Npc {
	age: number;
	companions: Companion[];
	gender: any;
	goal: string;
	name: string;
	occupation: string;
	personality: Personality;
	physicalDescription: PhysicalDescription;
	race: any;
}

const getNpcHairDescription = (npc: Npc) => {
	const relPronoun = npc.gender._name === "male" ? "his" : "her";

	return npc.physicalDescription.hairStyle.type == "scales"
		? `${npc.physicalDescription.hairStyle.length} scales on ${relPronoun} head`
		: `${npc.physicalDescription.hairStyle.length}, ${npc.physicalDescription.hairStyle.color} ${npc.physicalDescription.hairStyle.type} hair`;
};
const getNpcBeardDescription = (npc: Npc) =>
	npc.physicalDescription.beard == null
		? ""
		: ` ${npc.physicalDescription.beard!.length} ${
				npc.physicalDescription.beard!.type
		  },`;

const getNpcDescription = (npc: Npc) => {
	const physical = npc.physicalDescription;
	const pronoun = npc.gender._name === "male" ? "he" : "she";
	const relPronoun = npc.gender._name === "male" ? "his" : "her";
	const firstName = titled(npc.name.split(" ")[0]);
	const hair = getNpcHairDescription(npc);
	const beard = getNpcBeardDescription(npc);

	return `${titledEach(npc.name)} is a ${npc.age} years old ${
		npc.gender._name
	} ${npc.race.getName$0()} ${npc.occupation}. ${titled(
		pronoun
	)} has ${hair},${beard} ${physical.eyes} eyes and a ${
		physical.skin
	} skin. ${firstName} stands at ${physical.height} cm with ${article(
		physical.build
	)} build. ${titled(relPronoun)} face is ${physical.face
		.split(" ")
		.join(" and ")}.`;
};

const getNpcPersonality = (npc: Npc) => {
	const personality = npc.personality;
	const firstName = titled(npc.name.split(" ")[0]);
	const pronoun = npc.gender._name === "male" ? "he" : "she";
	const relPronoun = npc.gender._name === "male" ? "his" : "her";

	return `${firstName} is ${personality.alignment.ethical.name} ${
		personality.alignment.moral.name
	}, and is often described as ${personality.descriptors.join(
		" and "
	)}. ${titled(pronoun)} ${personality.traits.join(
		" and "
	)}.\n\n${firstName} ${personality.quirks.join(" and ")}. ${titled(
		relPronoun
	)} goal is to ${npc.goal}.`;
};

const getContent = (npc: Npc) => {
	return [
		`> ${titled(npc.gender._name)} ${npc.race.getName$0()} ${
			npc.occupation
		}\n`,
		getNpcDescription(npc),
		"### Special Traits",
		"---",
		...npc.physicalDescription.specialFeatures.map((f) => `- ${titled(f)}`),
		"### Personality",
		"---",
		getNpcPersonality(npc),
		...(npc.companions.length !== 0
			? [
					"### Companions",
					"---",
					...npc.companions.map((c) => `- [[${titled(c.name)}]]`),
			  ]
			: []),
	].join("\n");
};

export default async function buildNpcPage(app: App, npc: Npc) {
	const newNote = await app.vault.create(
		`Entities/Npcs/${titled(npc.name)}.md`,
		getContent(npc)
	);
	return newNote.path;
}
