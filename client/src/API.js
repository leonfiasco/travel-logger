const API_URL = 'http://localhost:2402';

export async function listLogEntries() {
	const res = await fetch(`${API_URL}/api/logs`);
	return res.json();
}

export async function createLogEntry(entry) {
	const apiKey = entry.apiKey;
	delete entry.apiKey;
	const res = await fetch(`${API_URL}/api/logs`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'X-API-KEY': apiKey,
		},
		body: JSON.stringify(entry),
	});
	const json = await res.json();
	if (res.ok) {
		return json;
	}

	const error = new Error(json.message);
	error.res = json;
	throw error;
}
