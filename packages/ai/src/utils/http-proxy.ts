/**
 * Set up HTTP proxy according to env variables for `fetch` based SDKs in Node.js.
 * Bun has builtin support for this.
 *
 * This module should be imported early by any code that needs proxy support for fetch().
 * ES modules are cached, so importing multiple times is safe - setup only runs once.
 */
if (typeof process !== "undefined" && process.versions?.node) {
	import("undici").then((m) => {
		const { EnvHttpProxyAgent, setGlobalDispatcher } = m;
		// Disable default timeouts (300s) that kill long-running LLM streaming responses.
		// Individual non-streaming requests set their own AbortSignal.timeout() as needed.
		setGlobalDispatcher(new EnvHttpProxyAgent({ bodyTimeout: 0, headersTimeout: 0 }));
	});
}
