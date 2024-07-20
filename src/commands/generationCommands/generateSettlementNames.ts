import { App } from "obsidian";
import randpg from "../../randpg/randpg";
import OptionalModal from "src/modals/optionalModal";
import NamesModal from "src/modals/namesModal";
import { getRaces } from "./generateNpc";

const onGenerate = async (app: App, type: string | null) => {
	const names = randpg.generateSettlementNames(null, type?.toLowerCase());
	new NamesModal(app, `${type ?? "Random"} Settlement Names`, names, () =>
		randpg.generateSettlementNames(null, type?.toLowerCase())
	).open();
};

const getSettlementNamesCommand = (app: App) => {
	return {
		id: "realm-roller-generate-settlement-names",
		name: "Generate Settlement Names",
		callback: () => {
			new OptionalModal(app, getRaces(), (r) =>
				onGenerate(app, r)
			).open();
		},
	};
};

export default getSettlementNamesCommand;
