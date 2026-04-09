import http from "k6/http";
import { check, sleep, group } from "k6";

const BASE_URL = __ENV.BASE_URL || "https://serverest.dev";

export const options = {
  vus: 5,
  duration: "1m",

  thresholds: {
    checks: ["rate > 0.99"],
    http_req_duration: ["p(95) < 500"],
  },
};

const queries = [
  "",
  "?nome=Produto",
  "?preco=470",
  "?quantidade=0",
  "?nome=Produto&preco=470",
];

export default function () {
  group("Listagem de Produtos", () => {
    const query = queries[Math.floor(Math.random() * queries.length)];

    const res = http.get(`${BASE_URL}/produtos${query}`);

    group("Validações da Listagem", () => {
      check(res, {
        "status 200": (r) => r.status === 200,

        "retorna produtos": (r) => {
          try {
            return r.json().produtos !== undefined;
          } catch (e) {
            return false;
          }
        },

        "lista válida": (r) => {
          try {
            return Array.isArray(r.json().produtos);
          } catch (e) {
            return false;
          }
        },

        "tempo < 500ms": (r) => r.timings.duration < 500,
      });
    });
  });

  sleep(1);
}
