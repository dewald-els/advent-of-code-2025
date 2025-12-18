async function loadFile() {
	try {
		console.log("Attempting to load file...");
		const file = Bun.file("input.txt");
		const sequences = await file.text();
		const sequencesArray = sequences.split("\n");
		console.log(`Found ${sequencesArray.length} sequences.`);
		return {
			sequences: sequencesArray,
		};
	} catch (error) {
		return {
			error: true,
		};
	} finally {
		console.log("File load attempt finished.");
	}
}

function log({ fn, printText }: { fn: string; printText: string }) {
	console.log(`[${fn}] ${printText}`);
}

type Direction = "R" | "L";

function turnDial(direction: Direction, value: number, dial: number) {
	let newDial = dial;

	log({
		fn: "turnDial",
		printText: `Dial before: ${dial}. Turn instruction: ${direction}${value}`,
	});

	if (direction === "L") {
		if (dial - value < 0) {
			newDial = dial - value + 100;
		} else {
			newDial = dial - value;
		}

		log({
			fn: "turnDial",
			printText: `Dial after: ${newDial}`,
		});

		return newDial;
	}

	if (direction === "R") {
		if (dial + value > 99) {
			newDial = dial + value - 100;
		} else {
			newDial = dial + value;
		}

		log({
			fn: "turnDial",
			printText: `Dial after: ${newDial}`,
		});

		return newDial;
	}

	throw "What?";
}

function getDirection(sequence: string) {
	const direction = sequence[0] as Direction;
	if (direction !== "R" && direction !== "L") {
		throw "Could not find a valid direction";
	}
	return direction;
}

function getValue(sequence: string): number {
	const value = sequence.slice(1);
	try {
		return +value % 100;
	} catch (error) {
		throw "Unable to parse number. Bye.";
	}
}

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
	const value = getValue(sequence);
	dial = turnDial(direction, value, dial);
	if (dial === 0) {
		timesDialPointedToZero++;
	}
}

console.log("timesPointedToZero: ", timesDialPointedToZero);
