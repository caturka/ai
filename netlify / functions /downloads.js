exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
  try {
    const { url } = JSON.parse(event.body);
    const res = await fetch("https://co.wuk.sh/api/json", { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify({ url }) });
    const data = await res.json();
    return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) };
  } catch (e) { return { statusCode: 500, body: JSON.stringify({ error: e.message }) }; }
};
