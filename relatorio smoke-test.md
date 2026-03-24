# 📄 Relatório de Teste de Performance — Smoke Test

## 📌 Sistema Testado

API pública: Serverest API
Endpoint: `POST /usuarios`

---

## 1️⃣ Objetivo do Teste

Validar se a API de cadastro de usuários está **funcionando corretamente sob carga mínima**, garantindo:

* Respostas consistentes
* Baixa latência
* Ausência de erros

👉 Esse teste serve como **porta de entrada** para testes mais complexos.

---

## 2️⃣ Configuração do Teste

* Tipo: **Smoke Test**
* Usuários virtuais (VUs): **1**
* Duração: **30 segundos**
* Cenário: execução contínua (loop)
* Ferramenta: k6

---

## 3️⃣ Métricas Coletadas

### ✅ Resultado geral

* ✔ Checks: **100% (100/100)**
* ✔ Taxa de erro: **0%**
* ✔ Teste aprovado

---

### ⏱ Tempo de resposta

* Média: **192ms**
* Mediana: **176ms**
* p90: **198ms**
* p95: **268ms**
* Máximo: **480ms**

👉 ✅ Dentro do esperado (p95 < 500ms)

---

### 🚀 Throughput

* Requisições: **25**
* RPS: **~0.82 req/s**

---

### 🌐 Rede

* Tempo de espera (TTFB): ~190ms
* TLS: baixo impacto
* Envio/recebimento: estável

---

## 4️⃣ Análise Técnica

✔ A API respondeu de forma consistente
✔ Nenhuma falha ou erro de parsing
✔ Tempo de resposta adequado

👉 Conclusão:

> O endpoint de cadastro está saudável sob carga mínima.

---

## ⚠️ 5️⃣ Comparação com teste anterior (5 VUs)

| Cenário      | Resultado                             |
| ------------ | ------------------------------------- |
| 1 VU (30s)   | ✅ Estável                             |
| 5 VUs (1min) | ❌ Instável (45% erro + latência alta) |

---

## 🚨 6️⃣ Problema Identificado

Quando a carga aumenta:

* ❌ Alta taxa de erro (~45%)
* ❌ Latência extrema (p95 > 12s)
* ❌ Respostas inconsistentes (não JSON)

---

## 🧠 7️⃣ Causa provável

👉 Problema **não é só performance da API**, mas sim:

### 💥 Massa de dados inadequada

Você estava usando:

```json
email fixo ou repetido
```

Isso causa:

* ❌ Conflito (email já existe)
* ❌ Resposta 400
* ❌ Quebra do teste
