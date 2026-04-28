import http from "k6/http";

const BASE_URL = __ENV.BASE_URL || "https://serverest.dev";

export function login(data) {
  return http.post(`${BASE_URL}/login`, JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
    tags: { endpoint: "POST /login" },
  });
}
