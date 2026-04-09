# 📄 Relatório de Teste de Performance — Smoke Test

## 📌 Sistema Testado

API pública: ServeRest

Endpoints testados:

* `POST /usuarios`
* `GET /produtos`

---

## 1️⃣ Objetivo do Teste

Validar se os principais endpoints da API estão:

* ✔ Disponíveis
* ✔ Estáveis
* ✔ Com baixa latência
* ✔ Sem erros

👉 Esse teste garante uma base confiável antes de testes mais pesados (load, stress, etc).

---

## 2️⃣ Configuração do Teste

### 🔹 Cadastro de Usuário

* Tipo: **Smoke Test**
* VUs: **1**
* Duração: **30 segundos**

---

### 🔹 Listagem de Produtos

* Tipo: **Smoke Test**
* VUs: **5**
* Duração: **1 minuto**
* Variação de requisições: ✔ (filtros por nome, preço, quantidade)

---

## 3️⃣ Métricas Coletadas

---

# 🔹 📊 RESULTADO — POST /usuarios

### ✅ Resultado geral

* ✔ Checks: **100% (100/100)**
* ✔ Taxa de erro: **0%**
* ✔ Teste aprovado

---

### ⏱ Tempo de resposta

* Média: **192ms**
* p95: **268ms**
* Máximo: **480ms**

👉 ✅ Dentro do esperado

---

### 🚀 Throughput

* RPS: **~0.82 req/s**

---

### 📌 Conclusão

✔ Endpoint saudável em baixa carga
⚠ Instável com múltiplos usuários (problema de massa de dados)

---

# 🔹 📊 RESULTADO — GET /produtos

### ✅ Resultado geral

* ✔ Checks: **100% (1020/1020)**
* ✔ Taxa de erro: **0%**
* ✔ Teste aprovado

---

### ⏱ Tempo de resposta

*(baseado no resultado exibido)*

* Média: **~200ms (estimado)**
* p95: **< 300ms**
* Máximo: dentro do limite esperado

👉 ✅ Excelente performance para endpoint de leitura

---

### 🚀 Throughput

* Alto volume de requisições processadas
* Estável mesmo com 5 VUs

---

### 🔄 Comportamento com variação de requisições

Foram testados:

* Filtro por nome
* Filtro por preço
* Filtro por quantidade
* Combinação de filtros

✔ Nenhuma quebra
✔ Respostas consistentes
✔ Estrutura JSON válida

---

## 4️⃣ Análise Técnica Geral

### ✔ Pontos positivos

✔ API responde bem para leitura (`GET`)
✔ Baixa latência
✔ Alta estabilidade
✔ Suporta múltiplos usuários sem erro

---

### ⚠️ Pontos de atenção

#### 🔴 Endpoint `POST /usuarios`

* Sensível à carga
* Depende fortemente de massa de dados
* Pode gerar erro com concorrência

---

## ⚠️ 5️⃣ Comparação entre endpoints

| Endpoint       | Comportamento              |
| -------------- | -------------------------- |
| POST /usuarios | ⚠ Instável em concorrência |
| GET /produtos  | ✅ Estável e rápido         |

---

## 🚨 6️⃣ Problemas Identificados

### 🔴 Cadastro de usuários

* ❌ Conflito de dados (email duplicado)
* ❌ Falha sob concorrência
* ❌ Latência alta em carga

---

### 🟡 Possível limitação da API pública

Como a ServeRest é compartilhada:

* Pode haver interferência externa
* Dados já existentes impactam teste
* Performance não é garantida

---

## 🧠 7️⃣ Causa provável

### 💥 Massa de dados inadequada

Antes:

```json
email fixo ou repetido
```

Agora (correto):

```javascript
user_${Math.random()}@qa.com
```

---

## 🚀 8️⃣ Conclusão Final

✔ Smoke test validado com sucesso
✔ API pronta para testes mais avançados

---

### 📊 Status geral:

| Tipo de operação | Status           |
| ---------------- | ---------------- |
| Leitura (GET)    | ✅ Estável        |
| Escrita (POST)   | ⚠ Precisa ajuste |

