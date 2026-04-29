import http from "k6/http";

const BASE_URL = __ENV.BASE_URL || "https://serverest.dev";

export function getProducts() {
  return http.get(`${BASE_URL}/produtos`, {
    tags: { endpoint: "GET /produtos" },
  });
}