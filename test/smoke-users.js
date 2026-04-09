import { check, sleep, group } from "k6";
import { createUser } from "../services/users.js";

export const options = {
  vus: 2,
  duration: "30s",

  thresholds: {
    checks: ["rate > 0.99"],
    http_req_duration: ["p(95) < 500"],
  },
};

export default function () {

  group("Cadastro de Usuário", () => {

    const uniqueEmail = `user_${Math.random()}@qa.com`;

    const newUser = {
      nome: "Fulano da Silva",
      email: uniqueEmail,
      password: "pitbull2034",
      administrador: "true",
    };

    const resSuccess = createUser(newUser);

    group("Validações do Cadastro", () => {

      check(resSuccess, {
        "status 201 criado": (r) => r.status === 201,

        "mensagem sucesso": (r) => {
          if (r.status === 201) {
            return r.json().message === "Cadastro realizado com sucesso";
          }
          return false;
        },

        "retorna id": (r) => {
          if (r.status === 201) {
            return r.json()._id !== undefined;
          }
          return false;
        },

        "tempo < 500ms": (r) => r.timings.duration < 500,
      });

    });

  });

  sleep(1);
}