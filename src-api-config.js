export const API_BASE_URL = "https://betsense-backend.onrender.com";

export async function callEngine(engine, params = {}) {
  const url = `${API_BASE_URL}/api/${engine}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params)
  });

  return response.json();
}
