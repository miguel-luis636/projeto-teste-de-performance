import http from "k6/http";

const BASE_URL = __ENV.BASE_URL || "https://serverest.dev";

export function createUser(user) {
  return http.post(`${BASE_URL}/usuarios`, JSON.stringify(user), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
