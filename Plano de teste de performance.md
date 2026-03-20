# 📄 PLANO DE TESTE DE PERFORMANCE

## 1️⃣ Objetivo do Teste

Validar o comportamento da API ServeRest sob diferentes níveis de carga, garantindo estabilidade, tempo de resposta adequado e baixa taxa de erro.

**Deve responder:**

* Verificar se a API suporta múltiplos usuários simultâneos
* Identificar limites de capacidade (breakpoint)
* Detectar degradação de performance sem acesso a logs internos

**Exemplo:**

> Validar se a API suporta até 500 usuários simultâneos mantendo p95 abaixo de 500ms e taxa de erro inferior a 1%, garantindo estabilidade em cenários de uso real.

---

## 2️⃣ Escopo

### Incluído:

* API de Login (`POST /login`)
* API de Usuários (`GET /usuarios`)
* API de Produtos (`GET /produtos`)
* API de Carrinhos (`POST /carrinhos`)
* Fluxo completo: login → consulta → ação

👉 Esses endpoints representam cenários reais de uso da API ServeRest ([LinkedIn][1])

---

### Não incluído:

* Logs internos da aplicação (não disponíveis)
* Monitoramento de infraestrutura real (ambiente público)
* Banco de dados interno
* Controle de concorrência real da infra

⚠ Importante: o ambiente online possui dados compartilhados e reset diário ([GitHub][2])

---

## 3️⃣ Requisitos do Teste

* Ambiente de testes configurado (k6)
* Scripts validados
* Massa de dados dinâmica (usuários aleatórios)
* Internet estável (API pública)
* Monitoramento via métricas do k6
* (Opcional) uso local da API para testes mais agressivos

⚠ Testes pesados devem ser feitos localmente para não impactar o serviço público ([GitHub][2])

---

## 4️⃣ Tipos de Teste de Performance

### 🔹 Teste de Carga

* 100–500 usuários simultâneos
* Ramp-up: 2 minutos
* Duração: 10 minutos
  👉 Validar comportamento normal

---

### 🔹 Teste de Spike

* Pico de 50 → 500 usuários em poucos segundos
* Duração: 5 minutos
  👉 Avaliar recuperação após pico

---

### 🔹 Teste de Stress

* Aumentar até falhar (ex: 1000+ usuários)
  👉 Identificar ponto de ruptura

---

### 🔹 Teste de Soak (Endurance)

* 100 usuários
* Duração: 30–60 minutos
  👉 Detectar degradação ao longo do tempo

---

### 🔹 Teste de Scalability

* Crescimento gradual (50 → 500 usuários)
  👉 Avaliar escalabilidade

---

### 🔹 Teste de Throughput

* Foco em RPS (ex: 100 req/s)
  👉 Medir capacidade da API

---

### 🔹 Teste de Breakpoint

* Aumentar carga até erro massivo
  👉 Identificar limite máximo

---

## 5️⃣ Métricas de Performance

⚠ Como não há acesso a logs ou infraestrutura, o foco é **100% em métricas externas (client-side)**

### Aplicação (principais)

* **Tempo de resposta (http_req_duration)**
* **p95 / p99 (latência crítica)**
* **Throughput (RPS)**
* **Taxa de erro (http_req_failed)**
* **Checks (validação funcional)**

---

### Métricas estratégicas por tipo de teste

#### 🔹 Load / Spike

* Estabilidade do p95
* Variação de latência
* Erros durante picos

#### 🔹 Stress / Breakpoint

* Crescimento da latência
* Aumento de erro (%)
* Tempo até falha

#### 🔹 Soak

* Tendência de degradação
* Consistência ao longo do tempo

#### 🔹 Throughput

* Máximo RPS sustentável
* Latência sob alta taxa

---

### Limitação importante

Sem acesso ao `/status` local, não será possível medir:

* CPU
* Memória
* Conexões internas

👉 Essas métricas só existem localmente ([GitHub][2])

---

## 6️⃣ Plano de Execução

1. Validar scripts k6
2. Definir cenários (scenarios)
3. Executar testes progressivos
4. Monitorar métricas em tempo real
5. Coletar resultados
6. Gerar relatório

### Ferramentas:

* k6 (carga)
* Grafana Cloud (opcional)
* Logs do próprio k6

### Ambiente:

* API pública (limitado)
* Local (recomendado para testes mais pesados)

---

## 7️⃣ Critérios de Sucesso e Falha

### Critérios de Sucesso:

* p95 ≤ 500ms
* Taxa de erro ≤ 1%
* Sistema responde consistentemente
* Sem falhas em endpoints críticos

---

### Critérios de Falha:

* p95 > 500ms
* Taxa de erro > 1%
* Timeout ou indisponibilidade
* Falha em login ou operações principais

---

## 8️⃣ Recursos Necessários

### Humanos:

* QA de Performance
* Desenvolvedor (para análise)

---

### Técnicos:

* k6
* Scripts de teste
* Ambiente de execução
* (Opcional) Grafana

---

## 9️⃣ Relatório de Teste

Deve conter:

* Objetivo
* Cenários executados
* Métricas coletadas
* Gráficos (latência, RPS, erro)
* Pontos de degradação
* Limites identificados
* Recomendações

---

# 🧠 Observação Estratégica

Esse plano considera um cenário **realista de mercado**:

✔ API pública (sem acesso interno)
✔ Testes baseados em comportamento externo
✔ Foco em métricas reais de usuário
✔ Uso de ferramentas modernas (k6 + Grafana)
