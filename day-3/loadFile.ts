import log from "../log";

async function loadFile(filePath: string) {
	try {
		log({ fn: "loadFile", text: "Attempting to load file " + filePath });
		const file = Bun.file(import.meta.dir + "/" + filePath);
		const input = await file.text();
		const batteryRacks = input.split("\n");
		log({
			fn: "loadFile",
			text: `Found ${batteryRacks.length} battery racks.`,
		});
		return {
			batteryRacks,
		};
	} catch (error) {
		return {
			error: true,
		};
	}
}

export default loadFile;
