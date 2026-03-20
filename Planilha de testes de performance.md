# 📊 Planilha de Teste de Performance

Ter uma planilha de acompanhamento dos testes de performance é fundamental para transformar dados brutos em **insights estratégicos**.

No contexto deste projeto (k6 + API ServeRest), a planilha será utilizada como fonte central de análise, comparação e tomada de decisão.

---

## 📊 1. Organização e Visibilidade dos Dados

A planilha será utilizada para registrar todas as métricas coletadas durante a execução dos testes com k6, como:

* Tempo de resposta (médio, p95, p99)
* Throughput (RPS)
* Taxa de erro (%)
* Número de usuários virtuais (VUs)
* Tipo de teste executado (load, stress, spike, etc.)
* Duração do teste
* Endpoint testado

➡️ Como não há acesso à infraestrutura da API pública (ServeRest), o foco será em:

* Métricas do lado do cliente (k6)
* Comportamento percebido da API

---

## 📈 2. Análise Comparativa entre Testes

A planilha permitirá comparar diferentes execuções, como:

* Testes com cargas diferentes (ex: 100 vs 500 usuários)
* Testes de tipos distintos (load vs stress)
* Resultados antes e depois de ajustes nos scripts
* Execuções locais vs ambiente público

➡️ Isso ajuda a identificar:

* Evolução da performance
* Comportamento sob diferentes cenários
* Limites da API testada

---

## 🧠 3. Identificação de Gargalos

Mesmo sem acesso a logs internos, a planilha permite identificar gargalos com base em padrões como:

* Aumento do tempo de resposta com crescimento de carga
* p95 e p99 elevados
* Crescimento da taxa de erro em momentos específicos
* Queda de throughput sob alta concorrência

➡️ Com isso, é possível inferir:

* Saturação do servidor
* Limitações de escalabilidade
* Possíveis gargalos em endpoints específicos

---

## 📁 4. Histórico para Auditoria e Evolução

A planilha servirá como histórico técnico do projeto, permitindo:

* Acompanhar a evolução dos testes ao longo do tempo
* Registrar diferentes cenários executados
* Documentar limites identificados
* Revisitar análises futuras

➡️ Também pode ser usada para:

* Construção de portfólio (GitHub)
* Demonstração prática de conhecimento em QA de Performance
* Base para estudos mais avançados

---

## 🤝 5. Comunicação com o Time

A planilha facilita a comunicação entre áreas técnicas, permitindo responder rapidamente:

* Qual cenário teve pior performance?
* Qual endpoint apresentou maior latência?
* Em qual carga o sistema começou a falhar?
* O sistema é estável?

➡️ Isso melhora:

* Clareza nas análises
* Alinhamento entre QA, Dev e DevOps
* Tomada de decisão baseada em dados

---

## 📌 Estrutura sugerida da planilha

| Teste   | Tipo   | VUs | Duração | RPS | p95   | p99    | Erro (%) | Endpoint  | Observações |
| ------- | ------ | --- | ------- | --- | ----- | ------ | -------- | --------- | ----------- |
| Teste 1 | Load   | 100 | 10m     | 120 | 200ms | 350ms  | 0.5%     | /login    | Estável     |
| Teste 2 | Stress | 500 | 5m      | 300 | 800ms | 1200ms | 5%       | /produtos | Degradação  |

---

## 🧠 Observação Estratégica

Mesmo sendo um projeto com API pública e sem acesso à infraestrutura, a planilha cumpre um papel essencial:

✔ Organiza dados de forma profissional
✔ Permite análise comparativa real
✔ Ajuda a identificar gargalos sem logs
✔ Demonstra maturidade em testes de performance
