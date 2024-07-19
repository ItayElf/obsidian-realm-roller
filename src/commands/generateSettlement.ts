import { App } from "obsidian";
import randpg from "../randpg/randpg";
import OptionalModal from "src/modals/optionalModal";
import { openFileByPath, titled } from "src/utils";
import buildNpcPage from "src/pageBuilders/npcPageBuilder";
import { getRaces } from "./generateNpc";
import buildSettlementPage from "src/pageBuilders/settlementPageBuilder";

export const getSettlementTypes = () => {
	return new randpg.SettlementManager()
		.get$activeTypes()
		.map((x) => titled(x.getSettlementType$0()));
};

const onGenerate = async (
	app: App,
	type: string | null,
	race: string | null
) => {
	const settlement = randpg.generateSettlement(
		type?.toLowerCase(),
		race?.toLowerCase()
	);
	console.log(settlement);
	const newNotePath = await buildSettlementPage(app, settlement);
	await openFileByPath(app, newNotePath);
};

const getSettlementCommand = (app: App) => {
	return {
		id: "realm-roller-generate-settlement",
		name: "Generate Settlement",
		callback: () => {
			new OptionalModal(app, getSettlementTypes(), (r) =>
				new OptionalModal(app, getRaces(), (r2) =>
					onGenerate(app, r, r2)
				).open()
			).open();
		},
	};
};

export default getSettlementCommand;
