import { App } from "obsidian";
import randpg from "../randpg/randpg";
import OptionalModal from "src/modals/optionalModal";
import { openFileByPath, titled, titledEach, writeEntityFile } from "src/utils";
import buildGuildPage from "src/pageBuilders/guildPageBuilder";

export const getGuildTypes = () => {
	return new randpg.GuildManager()
		.get$activeTypes()
		.map((x) => titled(x.getGuildType$0()));
};

const onGenerate = async (app: App, type: string | null) => {
	const guild = randpg.generateGuild(type?.toLowerCase());
	const newNotePath = await buildGuildPage(app, guild);
	await openFileByPath(app, newNotePath);
};

const getGuildCommand = (app: App) => {
	return {
		id: "realm-roller-generate-guild",
		name: "Generate Guild",
		callback: () => {
			new OptionalModal(app, getGuildTypes(), (r) =>
				onGenerate(app, r)
			).open();
		},
	};
};

export default getGuildCommand;
