import { check, sleep } from "k6";
import { createUser } from "../../services/users.js";
import { login } from "../../services/auth.js";
import { getProducts } from "../../services/products.js";

export const options = {
  scenarios: {
    user_flow: {
      executor: "ramping-vus",
      startVUs: 20,
      stages: [
        { duration: "1m", target: 70 },
        { duration: "1m", target: 70 },
        { duration: "1m", target: 0 },
      ],
    },
  },
  thresholds: {
    http_req_failed: ["rate < 0.01"],
    checks: ["rate > 0.99"],
    "http_req_duration{endpoint:POST /login}": ["p(95) < 500"],
    "http_req_duration{endpoint:GET /produtos}": ["p(95) < 500"],
    "http_req_duration{endpoint:POST /usuarios}": ["p(95) < 500"],
  },
};

export function setup() {
  const users = [];

  for (let i = 0; i < 100; i++) {
    // ✅ email único por VU usando timestamp + índice
    const email = `user_${i}_${Date.now()}@qa.com`;
    const password = "pitbull2034";

    const res = createUser({
      nome: "Fulano da Silva",
      email,
      password,
      administrador: "true",
    });

    if (res.status === 201) {
      users.push({ email, password });
    }
  }

  return users; // ✅ retornado para o default function via data
}

export default function (users) {
  // ✅ cada VU pega um usuário aleatório da lista criada no setup
  const user = users[Math.floor(Math.random() * users.length)];

  // --- LOGIN ---
  const loginRes = login(user);
  let token;

  check(loginRes, {
    "login OK": (r) => r.status === 200,
    "token recebido": (r) => {
      if (r.status === 200) {
        token = r.json("authorization");
        return !!token;
      }
      return false;
    },
  });

  // ✅ aborta a iteração se login falhar
  if (!token) return;

  // --- PRODUTOS (sem token — endpoint público) ---
  const productsRes = getProducts(); // ✅ sem passar token
  check(productsRes, {
    "produtos OK": (r) => r.status === 200,
    "lista válida": (r) => {
      try {
        const body = r.json();
        return Array.isArray(body.produtos) && body.produtos.length > 0;
      } catch (e) {
        return false;
      }
    },
    "tempo < 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);
}