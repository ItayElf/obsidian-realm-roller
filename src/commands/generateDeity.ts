import { App } from "obsidian";
import randpg from "../randpg/randpg";
import OptionalModal from "src/modals/optionalModal";
import { openFileByPath, titled } from "src/utils";
import buildDeityPage from "src/pageBuilders/deityPageBuilder";

export const getDeityTypes = () => {
	return new randpg.DeityManager()
		.get$activeTypes()
		.map((x) => titled(x.getDeityType$0()));
};

export const getAlignmentTypes = () => [
	"Lawful Good",
	"True Good",
	"Chaotic Good",
	"Lawful Neutral",
	"True Neutral",
	"Chaotic Neutral",
	"Lawful Evil",
	"True Evil",
	"Chaotic Evil",
];

const onGenerate = async (
	app: App,
	type: string | null,
	alignment: string | null
) => {
	const deity = randpg.generateDeity(
		type?.toLowerCase(),
		alignment?.toLowerCase()
	);
	const newNotePath = await buildDeityPage(app, deity);
	await openFileByPath(app, newNotePath);
};

const getDeityCommand = (app: App) => {
	return {
		id: "realm-roller-generate-deity",
		name: "Generate Deity",
		callback: () => {
			new OptionalModal(app, getDeityTypes(), async (r) => {
				new OptionalModal(app, getAlignmentTypes(), (r2) =>
					onGenerate(app, r, r2)
				).open();
			}).open();
		},
	};
};

export default getDeityCommand;
