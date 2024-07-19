import { App } from "obsidian";
import randpg from "../randpg/randpg";
import OptionalModal from "src/modals/optionalModal";
import { toTitleCase } from "src/utils";

const getCompanionTypes = () => {
	return new randpg.CompanionManager()
		.get$activeTypes()
		.map((x) => toTitleCase(x.getCompanionType$0()));
};

const onGenerate = (result: string | null) => {
	const companion = randpg.generateCompanion(result?.toLowerCase());
	console.log(companion);
};

const getCompanionCommand = (app: App) => {
	return {
		id: "realm-roller-generate-companion",
		name: "Generate Companion",
		callback: () => {
			new OptionalModal(app, getCompanionTypes(), onGenerate).open();
		},
	};
};

export default getCompanionCommand;
