import log from "../../log";

async function loadFile() {
	try {
		log({ fn: "loadFile", printText: "Attempting to load file..." });
		const file = Bun.file(import.meta.dir + "/input.txt");
		const sequences = await file.text();
		const sequencesArray = sequences.split(",");
		log({
			fn: "loadFile",
			printText: `Found ${sequencesArray.length} sequences.`,
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
