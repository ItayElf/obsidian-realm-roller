import { App } from "obsidian";
import randpg from "../../randpg/randpg";
import OptionalModal from "src/modals/optionalModal";
import NamesModal from "src/modals/namesModal";
import { getRaces } from "./generateNpc";

const onGenerate = async (app: App, type: string | null) => {
	const names = randpg.generateNames(type?.toLowerCase());
	new NamesModal(app, `${type ?? "Random"} Names`, names, () =>
		randpg.generateNames(type?.toLowerCase())
	).open();
};

const getNamesCommand = (app: App) => {
	return {
		id: "realm-roller-generate-names",
		name: "Generate Names",
		callback: () => {
			new OptionalModal(app, getRaces(), (r) =>
				onGenerate(app, r)
			).open();
		},
	};
};

export default getNamesCommand;
