# 📄 Relatório de Teste de Performance — CT-02 (Load Test)

## 📌 Sistema Testado

API pública: ServeRest
Endpoints:

* `POST /login`
* `GET /produtos`
* `POST /usuarios` (utilizado no setup)

---

## 1️⃣ Objetivo do Teste

Validar o comportamento da API sob **uso normal contínuo**, simulando usuários reais executando um fluxo completo:

```text
Cadastro → Login → Listagem de produtos
```

O objetivo foi identificar:

* Estabilidade sob carga
* Tempo de resposta
* Taxa de erro
* Limitações do sistema

---

## 2️⃣ Configuração do Teste

| Parâmetro       | Valor             |
| --------------- | ----------------- |
| Tipo            | Load Test         |
| Ferramenta      | k6                |
| Cenário         | ramping-vus       |
| Ramp-up         | 2 minutos         |
| Duração total   | ~10 minutos       |
| Carga planejada | 50 → 200 VUs ❌    |
| Carga executada | **20 → 70 VUs** ✅ |

👉 A carga foi reduzida devido a limitações da API pública.

---

## 3️⃣ Fluxo do Usuário Simulado

Cada VU executa:

1. Login (`POST /login`)
2. Recebe token
3. Lista produtos (`GET /produtos`)

Além disso:

* Usuários são criados previamente via `setup()`
* Dados dinâmicos evitam conflito

---

## 4️⃣ Critérios de Sucesso

* ✔ p95 ≤ 500ms
* ✔ Taxa de erro ≤ 1%
* ✔ Checks ≥ 99%

---

## 5️⃣ Resultados Obtidos

### ❌ Resultado Geral

* ❌ Checks: **0.29%**
* ❌ Taxa de erro: **99.10%**
* ❌ Teste **REPROVADO**

---

## ⏱ Tempo de resposta

### 🔹 GET /produtos

* Média: **503ms**
* p90: **~659ms**
* p95: **~671ms**

👉 ❌ Acima do limite esperado

---

### 🔹 POST /login

* Média: **~1.97s**
* p95: **~9.72s**

👉 ❌ Extremamente alto → gargalo crítico

---

## 🚀 Throughput

* Requisições totais: **15.560**
* Iterações: **15.540**
* VUs máximos: **70**

---

## 🌐 Taxa de erro

```text
http_req_failed: 99.10%
```

👉 Isso indica falha massiva do sistema sob carga

---

## 6️⃣ Análise Técnica

### 🔴 Problemas críticos identificados

#### 1. Falha massiva no login

* Apenas **~58% sucesso** inicialmente
* Em cargas maiores → praticamente 0%

👉 Impacto:

* Usuário não autentica
* Fluxo quebra completamente

---

#### 2. Respostas inválidas da API

Erro observado:

```text
cannot parse json → invalid character 'S'
```

👉 Significa:

* API retornando texto/erro (não JSON)
* Indício de falha interna (overload)

---

#### 3. Degradação severa de performance

* p95 muito acima do esperado
* latência cresce exponencialmente

---

#### 4. Saturação do sistema

Erro:

```text
connected host has failed to respond
```

👉 Indica:

* timeout
* conexão recusada
* servidor não responde

---

## 🧠 7️⃣ Causa Raiz

O problema não está no teste, mas sim na limitação da API pública.

### Principais fatores:

* Infraestrutura não preparada para carga
* Rate limiting
* Falta de escalabilidade
* Ambiente compartilhado

---

## ⚠️ 8️⃣ Limitação do Ambiente

A API utilizada:

👉 Não é projetada para testes de carga intensos

### Comportamento observado:

| Carga     | Resultado     |
| --------- | ------------- |
| 1–20 VUs  | ✅ Estável     |
| 20–70 VUs | ⚠️ Degradação |
| 70+ VUs   | ❌ Colapso     |

---

## 📊 9️⃣ Conclusão

> O sistema não suporta carga moderada de usuários e apresenta falhas críticas tanto de performance quanto funcionais.

### Principais conclusões:

* ❌ Alta taxa de erro
* ❌ Latência fora do aceitável
* ❌ Falhas de autenticação
* ❌ Respostas inválidas
* ❌ Instabilidade geral

---

## 🚀 🔟 Recomendações

### 🔹 Ajustes no teste

* Aumentar massa de usuários (setup)
* Validar `Content-Type` antes de parsear JSON
* Adicionar logs de erro

---

### 🔹 Melhorias no sistema (hipotético)

* Escalabilidade horizontal
* Cache
* Otimização de queries
* Rate limit controlado
* Monitoramento (APM)

---

## 💡 Insight Profissional

Este teste demonstrou um ponto importante:

> **A degradação não foi apenas de performance, mas também funcional**, com a API retornando respostas inválidas sob carga.

---

## 📌 Status Final

```
- TESTE REPROVADO
```
