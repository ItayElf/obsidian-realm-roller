import { App } from "obsidian";
import randpg from "../../randpg/randpg";
import OptionalModal from "src/modals/optionalModal";
import { openFileByPath, titled } from "src/utils";
import { getRaces } from "./generateNpc";
import buildKingdomPage from "src/pageBuilders/kingdomPageBuilder";

export const getGovernmentTypes = () => {
	return new randpg.GovernmentTypeManager()
		.get$activeTypes()
		.map((x) => titled(x.getGovernmentType$0()));
};

const onGenerate = async (
	app: App,
	race: string | null,
	type: string | null
) => {
	const kingdom = randpg.generateKingdom(
		race?.toLowerCase(),
		type?.toLowerCase()
	);
	const newNotePath = await buildKingdomPage(app, kingdom);
	await openFileByPath(app, newNotePath);
};

const getKingdomCommand = (app: App) => {
	return {
		id: "realm-roller-generate-kingdom",
		name: "Generate Kingdom",
		callback: () => {
			new OptionalModal(app, getRaces(), async (r) => {
				new OptionalModal(app, getGovernmentTypes(), (r2) =>
					onGenerate(app, r, r2)
				).open();
			}).open();
		},
	};
};

export default getKingdomCommand;
