async function login(email, password) {
  const respuesta = await fetch("http://localhost:8000/api/token/", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return respuesta.json();
}

export { login };
