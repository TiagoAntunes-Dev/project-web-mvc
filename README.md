# Projeto Prático — Página de Perfil Pessoal

Projeto desenvolvido aplicando **Arquitetura MVC**, **responsividade**, **acessibilidade WCAG AA** e boas práticas de HTML, CSS e JavaScript — sem uso de frameworks.O projeto demonstra boas práticas de desenvolvimento front-end com forte foco em acessibilidade (WCAG AA) e design responsivo.

---

## 📁 Estrutura de Arquivos

```
/project
├── model/
│   └── data.js              ← MODEL: dados do perfil, projetos e contato
├── controller/
│   └── controller.js        ← CONTROLLER: lógica, eventos, fluxo
├── view/
│   ├── index.html           ← VIEW principal (perfil + projetos + contato)
│   └── portfolio.html       ← VIEW secundária (portfólio detalhado)
├── css/
│   ├── style.css            ← Estilos globais (Flexbox, Grid, Media Queries)
│   └── portfolio.css        ← Estilos específicos da página portfolio
├── js/
│   ├── app.js               ← Ponto de entrada (inicializa o Controller)
│   └── portfolio.js         ← Lógica do filtro de projetos
└── images/                  ← Imagens do projeto
```

---

## 🏗️ Arquitetura MVC

### Model (`model/data.js`)
- Armazena **todos os dados** da aplicação: perfil, projetos e contato.
- **Nenhuma lógica de apresentação** — apenas dados puros.
- Centraliza as informações para fácil manutenção.

### View (`view/`)
- HTML **semântico** com tags corretas (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`, `<address>`).
- Estrutura **acessível**: ARIA labels, `alt`, `aria-label`, `aria-expanded`, `aria-live`.
- **Não contém lógica** — recebe dados renderizados pelo Controller.

### Controller (`controller/controller.js`)
- **Orquestra** a comunicação entre Model e View.
- Injeta dados do Model no DOM.
- Gerencia **eventos**: menu mobile, formulário, scroll suave, animações.

---

## 📱 Responsividade

Implementada com:
- **Flexbox** — hero, nav, footer, cards.
- **CSS Grid** — grid de projetos e portfólio.
- **Media Queries**:
  - `≤ 900px`: layout de colunas vira coluna única (hero, contato).
  - `≤ 640px`: menu hambúrguer ativo, grid de 1 coluna, botões 100%.
- `clamp()` para tipografia fluida sem breakpoints extras.

---

## ♿ Acessibilidade (WCAG AA)

| Critério            | Implementação                                              |
|---------------------|------------------------------------------------------------|
| HTML semântico      | `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`   |
| Texto alternativo   | `alt` em imagens, `aria-label` descritivos                 |
| ARIA                | `aria-expanded`, `aria-live`, `aria-pressed`, `role`       |
| Navegação teclado   | `focus-visible`, ESC fecha menu, skip link, foco gerenciado|
| Contraste adequado  | Fundo `#0d1117` + texto `#e6edf3` — ratio > 7:1 (AAA)     |
| Movimento reduzido  | `@media (prefers-reduced-motion: reduce)` aplicado         |

---

## 🚀 Como Abrir

1. Abra o arquivo `view/index.html` diretamente no navegador.
2. Para navegar ao portfólio, clique em "Ver Projetos" ou acesse `view/portfolio.html`.
