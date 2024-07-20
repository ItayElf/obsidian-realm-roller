import { App } from "obsidian";
import randpg from "../../randpg/randpg";
import OptionalModal from "src/modals/optionalModal";
import { getCompanionTypes } from "./generateCompanion";
import NamesModal from "src/modals/namesModal";

const onGenerate = async (app: App, type: string | null) => {
	const companionNames = randpg.generateCompanionNames(type?.toLowerCase());
	new NamesModal(
		app,
		`${type ?? "Random"} Companion Names`,
		companionNames,
		() => randpg.generateCompanionNames(type?.toLowerCase())
	).open();
};

const getCompanionNamesCommand = (app: App) => {
	return {
		id: "realm-roller-generate-companion-names",
		name: "Generate Companion Names",
		callback: () => {
			new OptionalModal(app, getCompanionTypes(), (r) =>
				onGenerate(app, r)
			).open();
		},
	};
};

export default getCompanionNamesCommand;
