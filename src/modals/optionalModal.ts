import { App, Notice, SuggestModal } from "obsidian";

class OptionalModal extends SuggestModal<string | null> {
	private options: string[];
	private onSelect: (result: string | null) => void;

	constructor(
		app: App,
		options: string[],
		onSelect: (result: string) => void
	) {
		super(app);
		this.options = options;
		this.onSelect = onSelect;
	}

	getSuggestions(query: string): (string | null)[] {
		let pool: (string | null)[] = [...this.options].filter((o) =>
			o.toLowerCase().includes(query.toLowerCase())
		);
		if ("random".includes(query.toLowerCase())) {
			pool = [null, ...pool];
		}
		return pool;
	}

	renderSuggestion(option: string, el: HTMLElement) {
		el.createEl("div", { text: option ?? "Random" });
	}

	onChooseSuggestion(item: string | null, evt: MouseEvent | KeyboardEvent) {
		this.onSelect(item);
	}
}

export default OptionalModal;
