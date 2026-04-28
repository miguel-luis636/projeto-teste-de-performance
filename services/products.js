import http from "k6/http";

const BASE_URL = __ENV.BASE_URL || "https://serverest.dev";

export function getProducts(token) {
  return http.get(`${BASE_URL}/produtos`, {
    headers: {
      Authorization: token,
    },
    tags: { endpoint: "GET /produtos" },
  });
}
