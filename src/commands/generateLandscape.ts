import { App } from "obsidian";
import randpg from "../randpg/randpg";
import OptionalModal from "src/modals/optionalModal";
import { openFileByPath, titled } from "src/utils";
import buildLandscapePage from "src/pageBuilders/landscapePageBuilder";

export const getLandscapeTypes = () => {
	return new randpg.LandscapeManager()
		.get$activeTypes()
		.map((x) => titled(x.getLandscapeType$0()));
};

const onGenerate = async (app: App, type: string | null) => {
	const landscape = randpg.generateLandscape(type?.toLowerCase());
	const newNotePath = await buildLandscapePage(app, landscape);
	await openFileByPath(app, newNotePath);
};

const getLandscapeCommand = (app: App) => {
	return {
		id: "realm-roller-generate-landscape",
		name: "Generate Landscape",
		callback: () => {
			new OptionalModal(app, getLandscapeTypes(), (r) =>
				onGenerate(app, r)
			).open();
		},
	};
};

export default getLandscapeCommand;
