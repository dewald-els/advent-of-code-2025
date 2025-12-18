function log({ fn, printText }: { fn: string; printText: string }) {
	console.log(`[${fn}] ${printText}`);
}

export default log;
