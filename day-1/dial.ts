import log from "./log";

type Direction = "R" | "L";

export function getDirection(sequence: string) {
	const direction = sequence[0] as Direction;
	if (direction !== "R" && direction !== "L") {
		throw "Could not find a valid direction";
	}
	return direction;
}

export function getDialValue(sequence: string): number {
	const value = sequence.slice(1);
	try {
		return +value % 100;
	} catch (error) {
		throw "Unable to parse number. Bye.";
	}
}

export function turnDial(direction: Direction, value: number, dial: number) {
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
