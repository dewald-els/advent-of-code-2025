import log from "../../log";
import loadFile from "./loadFile";
//import { MOCK_INPUT } from "./mock-data";

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

		if (digits.length % 2 !== 0) {
			// odd can never repeat.
			continue;
		}

		log({
			fn: "main",
			text: `${i} has possible pattern`,
		});

		const halfIndex = Math.ceil(digits.length / 2);
		const firstHalf = digits.slice(0, halfIndex).join("");
		const secondHalf = digits.slice(halfIndex).join("");

		if (+firstHalf === +secondHalf) {
			log({
				fn: "main",
				text: `Adding: ${i}`,
			});
			invalidIdTotal += i;
		}

		log({
			fn: "main",
			text: "-------------------------------------------",
		});
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
