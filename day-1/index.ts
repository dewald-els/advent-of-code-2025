import { getDialValue, getDirection, turnDial } from "./dial";
import loadFile from "./loadFile";
import log from "./log";

const result = await loadFile();

if (result.error || !result.sequences) {
	console.error("Failed to load the input file.");
	process.exit(1);
}

let dial = 50;
let timesDialPointedToZero = 0;

const { sequences } = result;

for (let i = 0; i < sequences.length; i++) {
	const sequence = sequences[i]!;
	const direction = getDirection(sequence);
	const value = getDialValue(sequence);
	dial = turnDial(direction, value, dial);
	if (dial === 0) {
		timesDialPointedToZero++;
	}
}

log({
	fn: "main",
	printText: `Times pointed to zero: ${timesDialPointedToZero}`,
});
