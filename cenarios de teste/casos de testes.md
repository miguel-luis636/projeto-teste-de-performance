# 📄 Casos de Teste de Performance — ServeRest

---

## 🔹 CT-01 — Smoke Test(passou)

**Tipo:** Smoke
**Objetivo:** Validar se a API está disponível antes dos testes pesados

**Descrição:**
Executar um teste leve para garantir que os principais endpoints respondem corretamente.

**Endpoints:**

* POST /login
* GET /produtos

**Carga:**

* 5 VUs

**Duração:**

* 1 minuto

**Métricas:**

* Status code
* Tempo de resposta
* Checks

**Critérios de sucesso:**

* 100% sucesso nos checks
* p95 < 300ms

**Ambiente:**

* API pública ServeRest

---

## 🔹 CT-02 — Teste de Carga (em progresso)

**Tipo:** Carga

**Objetivo:**
Validar comportamento sob uso normal

**Descrição:**
Simular usuários reais utilizando a API de forma contínua.

**Endpoints:**

* POST /login
* GET /produtos
* GET /usuarios

**Carga:**

* 50 → 200 VUs
* 20 → 70 VUs

**Ramp-up:**

* 2 minutos

**Duração:**

* 10 minutos

**Métricas:**

* p95 / p99
* Tempo médio
* Taxa de erro
* RPS

**Critérios de sucesso:**

* p95 ≤ 500ms
* erro ≤ 1%

---

## 🔹 CT-03 — Teste de Spike

**Tipo:** Spike

**Objetivo:**
Avaliar comportamento em picos repentinos

**Descrição:**
Simular aumento abrupto de usuários.

**Carga:**

* 50 → 500 VUs em poucos segundos

**Duração:**

* 5 minutos

**Métricas:**

* Latência durante pico
* Taxa de erro
* Tempo de recuperação

**Critérios de sucesso:**

* Sistema não colapsar
* Recuperação após pico

---

## 🔹 CT-04 — Teste de Stress

**Tipo:** Stress

**Objetivo:**
Identificar limite do sistema

**Descrição:**
Aumentar carga progressivamente até falha.

**Carga:**

* Até 1000+ VUs

**Duração:**

* Até falha

**Métricas:**

* p99
* Erro (%)
* Tempo até falha

**Critérios:**

* Identificar breakpoint

---

## 🔹 CT-05 — Teste de Soak (Endurance)

**Tipo:** Soak

**Objetivo:**
Detectar degradação ao longo do tempo

**Descrição:**
Executar carga constante por longo período.

**Carga:**

* 100 VUs

**Duração:**

* 30–60 minutos

**Métricas:**

* Tendência de latência
* Taxa de erro ao longo do tempo

**Critérios de sucesso:**

* Sem aumento progressivo de latência
* Estabilidade geral

---

## 🔹 CT-06 — Teste de Scalability

**Tipo:** Scalability

**Objetivo:**
Avaliar como o sistema escala

**Descrição:**
Aumentar carga gradualmente e observar comportamento.

**Carga:**

* 50 → 500 VUs

**Duração:**

* 10–15 minutos

**Métricas:**

* Crescimento de latência
* RPS por carga
* Taxa de erro

**Critérios:**

* Crescimento controlado da latência

---

## 🔹 CT-07 — Teste de Throughput

**Tipo:** Throughput

**Objetivo:**
Medir capacidade máxima de requisições

**Descrição:**
Manter taxa fixa de requisições por segundo.

**Carga:**

* 100 req/s

**Duração:**

* 10 minutos

**Métricas:**

* RPS real vs esperado
* Latência
* Taxa de erro

**Critérios:**

* Sustentar taxa definida
* Baixo erro

---

## 🔹 CT-08 — Teste de Breakpoint

**Tipo:** Breakpoint

**Objetivo:**
Encontrar limite máximo do sistema

**Descrição:**
Aumentar carga até ocorrer falha significativa.

**Carga:**

* Crescimento contínuo (até erro alto)

**Métricas:**

* Taxa de erro
* Latência
* Queda de RPS

**Critérios:**

* Identificar ponto onde erro > 5%

---

# 📊 Métricas padrão para todos os testes

* http_req_duration
* p95 / p99
* http_req_failed
* RPS (throughput)
* checks

---

# ⚠ Observações importantes

### 1. API pública tem limitações

* Pode sofrer variações externas
* Não representa ambiente real

---

### 2. Sem acesso a infraestrutura

Você NÃO verá:

* CPU
* Memória
* Banco

👉 análise baseada em comportamento externo

---

### 3. Fluxo deve simular usuário real

Sempre que possível:

```text
login → listar → ação
```

👉 evita testes irreais

---

### 4. Testes são complementares

Nenhum teste sozinho responde tudo:

* Load → comportamento normal
* Stress → limite
* Spike → picos
* Soak → estabilidade

---

# 🧠 Conclusão

Esses casos de teste permitem:

✔ Simular cenários reais
✔ Medir capacidade da API
✔ Identificar gargalos
✔ Validar estabilidade
✔ Criar base para automação (CI/CD)
