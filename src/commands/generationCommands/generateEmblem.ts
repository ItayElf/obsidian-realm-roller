import { App } from "obsidian";
import randpg from "../../randpg/randpg";
import EmblemModal from "src/modals/emblemModal";

const onGenerate = async (app: App) => {
	const emblem = randpg.generateEmblem();
	new EmblemModal(app, emblem, undefined, randpg.generateEmblem).open();
};

const getEmblemCommand = (app: App) => {
	return {
		id: "realm-roller-generate-emblem",
		name: "Generate Emblem",
		callback: async () => {
			await onGenerate(app);
		},
	};
};

export default getEmblemCommand;
