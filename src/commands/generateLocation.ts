import { App } from "obsidian";
import randpg from "../randpg/randpg";
import OptionalModal from "src/modals/optionalModal";
import { openFileByPath, titled } from "src/utils";
import buildLocationPage from "src/pageBuilders/locationPageBuilder";

export const getLocationTypes = () => {
	return new randpg.LocationManager()
		.get$activeTypes()
		.map((x) => titled(x.getLocationType$0()));
};

const onGenerate = async (app: App, type: string | null) => {
	const location = randpg.generateLocation(type?.toLowerCase());
	console.log(location);
	const newNotePath = await buildLocationPage(app, location);
	await openFileByPath(app, newNotePath);
};

const getLocationCommand = (app: App) => {
	return {
		id: "realm-roller-generate-location",
		name: "Generate Location",
		callback: () => {
			new OptionalModal(app, getLocationTypes(), (r) =>
				onGenerate(app, r)
			).open();
		},
	};
};

export default getLocationCommand;
