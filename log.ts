function log({ fn, text }: { fn: string; text: string }) {
	console.log(`[${fn}] ${text}`);
}

export default log;
