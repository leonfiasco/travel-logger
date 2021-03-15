const API_URL = 'http://localhost:2402';

export async function listLogEntries() {
	const res = await fetch(`${API_URL}/api/logs`);
	return res.json();
}
