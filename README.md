# 🚀 Projeto de Teste de Performance com k6 + Grafana

## 📌 Sobre o projeto

Este projeto tem como objetivo simular um ambiente **realista de testes de performance**, utilizando ferramentas amplamente usadas no mercado.

A proposta vai além de apenas executar testes básicos — o foco é:

* Entender métricas de performance na prática
* Identificar gargalos de sistema
* Simular comportamento real de usuários
* Integrar testes em pipelines de CI/CD
* Trabalhar com observabilidade usando dashboards

A API utilizada para os testes será o **Serverest**, que permite simular cenários reais de autenticação, CRUD e fluxos de usuário.

---

## 🧪 Tecnologias utilizadas

* **k6** → ferramenta de teste de carga e performance
* **Grafana** → visualização de métricas e dashboards
* **GitHub Actions** → execução automatizada (CI/CD)
* **Api do serverest** → api que foi utilizada
  
---

## 🎯 Objetivos do projeto

Este projeto foi criado com foco em **aprendizado prático e evolução profissional**, simulando situações reais de mercado.

### Principais objetivos:

✔ Criar testes de carga realistas
✔ Utilizar múltiplos cenários (scenarios)
✔ Trabalhar com diferentes executors
✔ Definir thresholds (critérios de sucesso)
✔ Monitorar métricas em tempo real
✔ Identificar gargalos de performance
✔ Automatizar testes via CI/CD

---

## 🧱 Estrutura do projeto

```
performance-project
│
├── tests
│   ├── load-test.js
│   ├── spike-test.js
│   └── stress-test.js
│
├── data
│   └── users.json
│
├── config
│   └── env.js
│
├── dashboards
│   └── grafana-dashboard.json
│
├── .github
│   └── workflows
│       └── k6.yml
│
└── README.md
```

---

## 🔄 Tipos de testes implementados

### 🔹 Load Test

Simula tráfego normal do sistema.

### 🔹 Spike Test

Simula picos repentinos de usuários.

### 🔹 Stress Test

Leva o sistema ao limite para identificar falhas.

### 🔹 Soak Test (opcional)

Executa testes por longos períodos para identificar vazamentos de memória.

---

## ⚙️ Como executar os testes

Antes de executar os testes, certifique-se de ter o k6 instalado.

📥 Instalação oficial:
[https://k6.io/docs/getting-started/installation/](https://k6.io/docs/getting-started/installation/)

📘 Documentação completa:
[https://k6.io/docs/](https://k6.io/docs/)

---

### 🔹 Rodar localmente

Execute um teste simples diretamente no seu ambiente:

```
k6 run tests/load-test.js
k6 run test/smoke-users.js
```

Esse comando irá:

* Executar o script definido
* Exibir métricas no terminal em tempo real
* Mostrar resumo ao final da execução

---

### 🔹 Usando variáveis de ambiente

Permite rodar o mesmo teste em diferentes ambientes (dev, staging, prod):

```
k6 run -e BASE_URL=https://serverest.dev tests/load-test.js
```

No código, você acessa via:

```
const BASE_URL = __ENV.BASE_URL;
```

📘 Referência:
[https://k6.io/docs/using-k6/environment-variables/](https://k6.io/docs/using-k6/environment-variables/)

---

### 🔹 Executando com diferentes cenários

Você pode rodar testes específicos passando parâmetros:

```
k6 run -e TEST_TYPE=spike tests/spike-test.js
```

Ou configurar múltiplos cenários diretamente no script com `scenarios`.

📘 Referência:
[https://k6.io/docs/using-k6/scenarios/](https://k6.io/docs/using-k6/scenarios/)

---

### 🔹 Enviando métricas para o Grafana Cloud

Para visualizar métricas em dashboards:

```
k6 run --out cloud tests/load-test.js
```

Pré-requisitos:

* Conta no Grafana Cloud
* Token configurado

📘 Guia oficial:
[https://k6.io/docs/cloud/](https://k6.io/docs/cloud/)

---

### 🔹 Executando testes na nuvem

Executa o teste diretamente na infraestrutura do k6 Cloud:

```
k6 cloud run tests/load-test.js
```

Vantagens:

* Escala maior de usuários virtuais
* Execução distribuída
* Dashboards automáticos

---

### 🔹 Integração com CI/CD (GitHub Actions)

Os testes podem ser executados automaticamente via pipeline:

Exemplo básico:

```
- name: Run k6 test
  run: k6 run tests/load-test.js
```

Você também pode:

* Falhar o pipeline com thresholds
* Rodar testes em PRs
* Gerar relatórios automáticos

📘 Referência:
[https://k6.io/docs/integrations/github-actions/](https://k6.io/docs/integrations/github-actions/)

---


## 📊 Métricas analisadas

Durante os testes, são avaliadas métricas essenciais para entender o comportamento do sistema sob diferentes tipos de carga:

### 🔹 Métricas básicas

* **Tempo de resposta (latência)** → tempo total de cada requisição
* **Percentis (p95, p99)** → comportamento das requisições mais lentas
* **Taxa de erro (http_req_failed)** → percentual de falhas
* **Throughput (req/s)** → requisições por segundo
* **Tempo de espera (waiting time)** → tempo de processamento no servidor

---

### 🔹 Métricas para Load e Spike Test

* Estabilidade da latência sob carga crescente
* Variação de p95/p99 durante picos
* Taxa de erro durante aumento repentino de usuários

---

### 🔹 Métricas para Stress e Breakpoint Test

* Ponto de degradação do sistema
* Aumento exponencial de latência
* Crescimento da taxa de erro
* Tempo até falha total

---

### 🔹 Métricas para Capacity e Scalability Test

* Máximo de VUs suportados
* Throughput máximo estável
* Relação entre aumento de carga vs tempo de resposta

---

### 🔹 Métricas para Soak / Endurance Test

* Estabilidade ao longo do tempo
* Tendência de aumento de latência
* Possíveis vazamentos de memória (indiretos)
* Queda gradual de performance

---

### 🔹 Métricas para Volume Test

* Tempo de resposta com payloads grandes
* Impacto no throughput
* Uso de recursos sob alto volume de dados

---

### 🔹 Métricas para API Throughput Test

* Máximo de requisições por segundo (RPS)
* Tempo médio sob alta taxa de requisições
* Taxa de erro sob carga constante


---

## 🎯 Thresholds (critérios de sucesso)

Exemplo:

```
http_req_failed: ['rate < 0.01']
http_req_duration: ['p(95) < 500']
```

O teste falha automaticamente se os critérios não forem atendidos.

---

## 📈 Observabilidade com Grafana

Os dados coletados são enviados para dashboards que permitem:

* Visualizar performance em tempo real
* Identificar gargalos
* Analisar comportamento sob carga

---

## 🔁 CI/CD com GitHub Actions

Os testes são executados automaticamente a cada push:

* Execução dos testes k6
* Validação de thresholds
* Falha automática do pipeline em caso de degradação

---

## 🧠 Aprendizados esperados

Este projeto foi pensado para desenvolver habilidades como:

* Performance testing na prática
* Análise de métricas
* Observabilidade
* Automação de testes
* Pensamento crítico sobre gargalos

---

## 💡 Próximos passos

* Integrar com banco de dados real
* Criar cenários mais complexos
* Simular usuários reais com dados dinâmicos

---

## 📌 Conclusão

Este projeto representa uma abordagem prática e profissional para testes de performance, aproximando o ambiente de estudo da realidade do mercado.

Mais do que rodar testes, o objetivo é **entender o comportamento do sistema sob carga e tomar decisões baseadas em dados**.
