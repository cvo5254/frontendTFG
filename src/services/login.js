async function login(email, password) {
  const respuesta = await fetch("http://localhost:8000/api/login/", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  let json = respuesta.json();
  return json;
}

export { login };
