import { App } from "obsidian";
import randpg from "../randpg/randpg";
import OptionalModal from "src/modals/optionalModal";
import { openFileByPath, titled } from "src/utils";
import buildNpcPage from "src/pageBuilders/npcPageBuilder";
import buildCompanionPage from "src/pageBuilders/companionPageBuilder";

export const getRaces = () => {
	return new randpg.RaceManager()
		.get$activeTypes()
		.map((x) => titled(x.getName$0()));
};

const onGenerate = async (app: App, type: string | null) => {
	const npc = randpg.generateNpc(type?.toLowerCase());
	const newNotePath = await buildNpcPage(app, npc);
	npc.companions.forEach(async (c: any) => await buildCompanionPage(app, c));
	await openFileByPath(app, newNotePath);
};

const getNpcCommand = (app: App) => {
	return {
		id: "realm-roller-generate-npc",
		name: "Generate Npc",
		callback: () => {
			new OptionalModal(app, getRaces(), (r) =>
				onGenerate(app, r)
			).open();
		},
	};
};

export default getNpcCommand;
