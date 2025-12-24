import log from "../log";

async function loadFile() {
	try {
		log({ fn: "loadFile", text: "Attempting to load file..." });
		const file = Bun.file(import.meta.dir + "/input.txt");
		const sequences = await file.text();
		const sequencesArray = sequences.split("\n");
		log({
			fn: "loadFile",
			text: `Found ${sequencesArray.length} sequences.`,
		});
		return {
			sequences: sequencesArray,
		};
	} catch (error) {
		return {
			error: true,
		};
	}
}

export default loadFile;
