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
		newDial -= value;
		return newDial < 0 ? newDial + 100 : newDial;
	} else {
		newDial += value;
		return newDial > 99 ? newDial - 100 : newDial;
	}
}
