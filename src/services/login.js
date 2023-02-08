async function login(username, password) {
  const respuesta = await fetch("http://localhost:8000/api/login/", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return respuesta.json();
}

export { login };
