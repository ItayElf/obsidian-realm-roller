import { App } from "obsidian";
import randpg from "../../randpg/randpg";
import { openFileByPath } from "src/utils";
import buildWorldPage from "src/pageBuilders/worldPageBuilder";

const onGenerate = async (app: App) => {
	const world = randpg.generateWorld();
	const newNotePath = await buildWorldPage(app, world);
	await openFileByPath(app, newNotePath);
};

const getWorldCommand = (app: App) => {
	return {
		id: "realm-roller-generate-world",
		name: "Generate World",
		callback: () => {
			onGenerate(app);
		},
	};
};

export default getWorldCommand;
