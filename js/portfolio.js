/**
 * portfolio.js — Lógica específica da página portfolio.html
 * Responsável pelo filtro de projetos (manipulação de DOM/eventos)
 */
(function () {
  "use strict";

  function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".portfolio-card");
    const noResults = document.getElementById("no-results");

    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;

        // Atualiza estado dos botões (acessível com aria-pressed)
        filterBtns.forEach(b => {
          b.classList.remove("active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");

        // Filtra os cards
        let visible = 0;

        cards.forEach(card => {
          const match = filter === "all" || card.dataset.category === filter;
          card.hidden = !match;
          if (match) visible++;
        });

        // Mensagem de sem resultados (acessível com aria-live)
        if (noResults) {
          noResults.hidden = visible > 0;
        }
      });
    });
  }

  // Inicializa após DOM pronto
  document.addEventListener("DOMContentLoaded", initPortfolioFilter);
})();
