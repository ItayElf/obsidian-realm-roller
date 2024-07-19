import { App } from "obsidian";
import randpg from "../randpg/randpg";
import OptionalModal from "src/modals/optionalModal";
import { openFileByPath, toTitleCase } from "src/utils";
import buildCompanionPage from "src/pageBuilders/companionPageBuilder";

const getCompanionTypes = () => {
	return new randpg.CompanionManager()
		.get$activeTypes()
		.map((x) => toTitleCase(x.getCompanionType$0()));
};

const onGenerate = async (app: App, result: string | null) => {
	const companion = randpg.generateCompanion(result?.toLowerCase());
	const newNotePath = await buildCompanionPage(app, companion);
	await openFileByPath(app, newNotePath);
};

const getCompanionCommand = (app: App) => {
	return {
		id: "realm-roller-generate-companion",
		name: "Generate Companion",
		callback: () => {
			new OptionalModal(app, getCompanionTypes(), (r) =>
				onGenerate(app, r)
			).open();
		},
	};
};

export default getCompanionCommand;
