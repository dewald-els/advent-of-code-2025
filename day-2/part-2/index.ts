import log from "../../log";
import loadFile from "./loadFile";
import { MOCK_INPUT } from "./mock-data";

// DAY 2
const input = await loadFile();
//const input = { error: undefined, sequences: MOCK_INPUT };

if (input.error || !input.sequences) {
	process.exit(1);
}

function getIds(sequence: string): { firstId: string; lastId: string } {
	const [firstId = null, lastId = null] = sequence.split("-");

	if (firstId === null || lastId === null) {
		throw "Invalid input data.";
	}

	return {
		firstId: firstId!,
		lastId: lastId!,
	};
}

const chunk = (arr: string[], size: number) =>
	Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
		arr.slice(i * size, i * size + size).join("")
	);

const { sequences } = input;

let invalidIdTotal = 0;

for (let i = 0; i < sequences.length; i++) {
	const sequence = sequences[i]!; // A-B
	const { firstId, lastId } = getIds(sequence); // { firstId: A, lastId: B }

	log({
		fn: "main",
		text: `Checking range: ${firstId} to ${lastId}`,
	});

	for (let i = +firstId; i <= +lastId; i++) {
		const digits = i.toString().split("");

		if (digits.length <= 1) {
			continue;
		}

		const ceiling = Math.ceil(digits.length / 2);

		for (let j = 1; j <= ceiling; j++) {
			const remainder = digits.length % j;

			if (remainder > 0) {
				continue;
			}

			const parts = chunk(digits, j);
			const isEqual = parts.every((part) => part === parts[0]);

			if (isEqual) {
				log({
					fn: "main",
					text: `Adding: ${i}`,
				});
				invalidIdTotal += i;
				break;
			}
		}
	}
}

log({
	fn: "main",
	text: `Total of invalid id: ${invalidIdTotal}`,
});

/* Ranges are sperated by "," in 1 single line
 * Each ranges gives 1st and last ID, seperated by "-"
 * Invalid is some sequence of digits, repeated twice. e.g. 55, 1010, 123123
 * There are NO leading 0's
 * e.g.: 11 - 22 has two invalid id's -> 11 and 22
 * 95 - 115 has one invalid id -> 99
 * 222220-222224 has one invalid id -> 222222
 * Answer: Add up all the invalid IDs
 */

// 1000 -> 4 , set = 2

/**
 * 446446
 * 446446 % 1 = 0
 * 4 4 6 4 4 6 -> NO
 * 446446 % 2 = 0
 * 4 4 6 4 4 6 -> NO
 */
