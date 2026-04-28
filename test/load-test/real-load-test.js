import { check, sleep } from "k6";
import { createUser } from "../../services/users.js";
import { login } from "../../services/auth.js";
import { getProducts } from "../../services/products.js";

// corrigir o cenario de login e produto

export const options = {
  scenarios: {
    user_flow: {
      executor: "ramping-vus",
      startVUs: 20,
      stages: [
        { duration: "2m", target: 70 },
        { duration: "5m", target: 70 },
        { duration: "2m", target: 0 },
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
    const email = `user_${i}_${Date.now()}@qa.com`;

    const res = createUser({
      nome: "Fulano da Silva",
      email,
      password: "pitbull2034",
      administrador: "true",
    });

    if (res.status === 201) {
      users.push({
        email,
        password: "pitbull2034",
      });
    }
  }

  return users;
}

export default function (users) {
  const user = users[Math.floor(Math.random() * users.length)];

  const loginRes = login(user);

  let token;

  check(loginRes, {
    "login OK": (r) => r.status === 200,
    "token recebido": (r) => {
      if (r.status === 200) {
        token = r.json("authorization");
        return token !== undefined;
      }
      return false;
    },
  });

  if (!token) return;

  const productsRes = getProducts(token);

  check(productsRes, {
    "produtos OK": (r) => r.status === 200,
    "lista válida": (r) => {
      try {
        const body = r.json();
        return body.produtos && body.produtos.length > 0;
      } catch (e) {
        return false;
      }
    },
    "tempo < 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);
}
