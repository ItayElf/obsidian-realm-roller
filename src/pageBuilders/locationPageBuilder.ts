import { App } from "obsidian";
import { article, titled, titledEach } from "src/utils";
import { Companion } from "./companionPageBuilder";
import buildNpcPage, { Npc } from "./npcPageBuilder";

export interface Goods {
	name: string;
	description: string | null;
	price: string | null;
}

export interface Location {
	buildingDescription: string;
	goods: Goods[] | null;
	name: string;
	outsideDescription: string[];
	owner: Npc;
	type: any;
	zone: string;
}

const getContent = (location: Location) => {
	return [
		`> ${titled(location.type.getLocationType$0())}\n`,
		location.buildingDescription.replace("\n", "\n\n"),
		"### Location",
		"---",
		`${location.name} is located in ${
			location.zone
		}. It ${location.outsideDescription.join(" and ")}.`,
		"### Owner",
		"---",
		`- [[${titledEach(location.owner.name)}]]: ${titled(
			location.owner.gender._name
		)} ${location.owner.race.getName$0()} ${location.owner.occupation}`,
		...(location.goods !== null
			? [
					"### Goods",
					"---",
					...location.goods.map(
						(g) =>
							`**${titledEach(g.name)}**${
								g.description !== null
									? `\n\t*${titled(g.description)}*`
									: ""
							}${g.price !== null ? `\n\tPrice: ${g.price}` : ""}`
					),
			  ]
			: []),
	].join("\n");
};

export default async function buildLocationPage(app: App, location: Location) {
	const newNote = await app.vault.create(
		`Entities/Locations/${titled(location.name)}.md`,
		getContent(location)
	);
	await buildNpcPage(app, location.owner);
	return newNote.path;
}
