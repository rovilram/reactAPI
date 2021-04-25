//HEADER EXAMPLE
// const HEADER = [
//   'User-Agent',
//   'accept: application/json',
//   'Content-Type: application/json',
//   'musicAPIs v0.1 https://rovilram.github.io/musicAPI/',
// ];

async function apiFetch(URL, HEADER) {
  const headers = new Headers();
  headers.append(...HEADER);
  const request = new Request(URL, {
    headers: headers,
  });
  const response = await fetch(request);
  if (response.ok) return await response.json();
  else throw new Error(`Request failed with ${response.status}`);
}

export default apiFetch;
