import log from "../log";
import loadFile from "./loadFile";

// DAY 3
const input = await loadFile("input.txt");

if (input.error || !input.batteryRacks) {
	process.exit(1);
}

const { batteryRacks: racks } = input;

let totalOutputJoltage = 0;

for (let i = 0; i < racks.length; i++) {
	const rack = racks[i]!;
	if (!rack) {
		throw "Invalid battery rack";
	}

	const batteries = rack.split("") as unknown as number[];

	let first = batteries[0]!;
	let second = batteries[1]!;

	for (let b = 2; b < batteries.length - 1; b++) {
		const battery = +batteries[b]!;

		if (battery > first) {
			first = battery;
			second = batteries[b + 1]!; // Can't be before max.
		} else if (battery > second) {
			second = battery;
		}
	}

	const last = +batteries.at(-1)!;

	if (last > second) {
		second = last;
	}

	totalOutputJoltage += +`${first}${second}`;
}

log({ fn: "main", text: `Total: ${totalOutputJoltage}` });

/**
 * 987654321111111 -> [0,1] -> 98
 * 811111111111119 -> [0,14] -> 89
 * 234234234234278 -> [13,14] -> 78
 * 818181911112111 -> [6,11] -> 92
 */
