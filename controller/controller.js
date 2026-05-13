/**
 * CONTROLLER — Organiza o fluxo e a comunicação entre Model e View
 * Responsável por: eventos, manipulação de DOM, lógica de negócio
 */
const AppController = {

  /* ────────────────────────────────
     INICIALIZAÇÃO
  ──────────────────────────────── */
  init() {
    this.renderProfile();
    this.renderSkills();
    this.renderProjects();
    this.renderContact();
    this.initMobileMenu();
    this.initSmoothScroll();
    this.initScrollReveal();
    this.initContactForm();
    this.initKeyboardNav();

    console.log("✅ AppController inicializado com sucesso.");
  },

  /* ────────────────────────────────
     RENDERIZAÇÃO DO PERFIL
  ──────────────────────────────── */
  renderProfile() {
    const data = ProfileModel.profile;

    // Injeta dados de perfil
    this.setText("profile-name", data.name);
    this.setText("profile-role", data.role);
    this.setText("profile-bio", data.bio);
    this.setText("nav-name", data.name);
    this.setText("footer-name", data.name);

    // Avatar com iniciais como fallback
    const avatar = document.getElementById("profile-initials");
    if (avatar) avatar.textContent = data.initials;

    // Meta acessível
    document.title = `Portfólio — ${data.name}`;
  },

  /* ────────────────────────────────
     RENDERIZAÇÃO DAS HABILIDADES
  ──────────────────────────────── */
  renderSkills() {
    const container = document.getElementById("skills-list");
    if (!container) return;

    const fragment = document.createDocumentFragment();

    ProfileModel.profile.skills.forEach(skill => {
      const li = document.createElement("li");
      li.className = "skill-tag";
      li.textContent = skill;
      fragment.appendChild(li);
    });

    container.appendChild(fragment);
  },

  /* ────────────────────────────────
     RENDERIZAÇÃO DOS PROJETOS
  ──────────────────────────────── */
  renderProjects() {
    const container = document.getElementById("projects-grid");
    if (!container) return;

    const fragment = document.createDocumentFragment();

    ProfileModel.projects.forEach((project, index) => {
      const article = document.createElement("article");
      article.className = "project-card";
      article.setAttribute("aria-label", `Projeto: ${project.title}`);
      article.style.animationDelay = `${index * 0.1}s`;

      // Tags como lista para semântica
      const tagsHTML = project.tags
        .map(tag => `<li class="project-tag">${tag}</li>`)
        .join("");

      article.innerHTML = `
        <div class="card-icon" aria-hidden="true">${project.icon}</div>
        <h3 class="card-title">${project.title}</h3>
        <p class="card-description">${project.description}</p>
        <ul class="project-tags" aria-label="Tecnologias utilizadas">
          ${tagsHTML}
        </ul>
        <a href="${project.link}" class="card-link" aria-label="Ver projeto: ${project.title}">
          Ver projeto <span aria-hidden="true">→</span>
        </a>
      `;

      fragment.appendChild(article);
    });

    container.appendChild(fragment);
  },

  /* ────────────────────────────────
     RENDERIZAÇÃO DO CONTATO
  ──────────────────────────────── */
  renderContact() {
    const data = ProfileModel.contact;
    this.setText("contact-email", data.email);
    this.setText("contact-location", data.location);

    const githubLink = document.getElementById("contact-github");
    const linkedinLink = document.getElementById("contact-linkedin");

    if (githubLink) {
      githubLink.href = `https://${data.github}`;
      githubLink.textContent = data.github;
    }
    if (linkedinLink) {
      linkedinLink.href = `https://${data.linkedin}`;
      linkedinLink.textContent = data.linkedin;
    }
  },

  /* ────────────────────────────────
     MENU MOBILE
  ──────────────────────────────── */
  initMobileMenu() {
    const toggleBtn = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    if (!toggleBtn || !navMenu) return;

    toggleBtn.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("nav-open");
      toggleBtn.setAttribute("aria-expanded", isOpen.toString());
      toggleBtn.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");

      // Foco no primeiro item ao abrir (acessibilidade)
      if (isOpen) {
        const firstLink = navMenu.querySelector("a");
        if (firstLink) firstLink.focus();
      }
    });

    // Fecha ao clicar em link
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("nav-open");
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.setAttribute("aria-label", "Abrir menu");
      });
    });
  },

  /* ────────────────────────────────
     SCROLL SUAVE
  ──────────────────────────────── */
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });

        // Mantém foco acessível após scroll
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    });
  },

  /* ────────────────────────────────
     SCROLL REVEAL (animação de entrada)
  ──────────────────────────────── */
  initScrollReveal() {
    const elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach(el => observer.observe(el));
  },

  /* ────────────────────────────────
     FORMULÁRIO DE CONTATO
  ──────────────────────────────── */
  initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleFormSubmit(form);
    });

    // Validação em tempo real
    form.querySelectorAll("input, textarea").forEach(field => {
      field.addEventListener("blur", () => this.validateField(field));
      field.addEventListener("input", () => this.clearFieldError(field));
    });
  },

  handleFormSubmit(form) {
    let isValid = true;

    form.querySelectorAll("[required]").forEach(field => {
      if (!this.validateField(field)) isValid = false;
    });

    if (!isValid) {
      const firstError = form.querySelector("[aria-invalid='true']");
      if (firstError) firstError.focus();
      return;
    }

    // Simulação de envio bem-sucedido
    const btn = form.querySelector("button[type='submit']");
    const status = document.getElementById("form-status");

    btn.disabled = true;
    btn.textContent = "Enviando…";

    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.textContent = "Enviar Mensagem";
      if (status) {
        status.textContent = "✅ Mensagem enviada com sucesso!";
        status.className = "form-status success";
        status.removeAttribute("hidden");
        status.focus();
        setTimeout(() => status.setAttribute("hidden", ""), 5000);
      }
    }, 1200);
  },

  validateField(field) {
    const errorId = `${field.id}-error`;
    let errorEl = document.getElementById(errorId);

    if (!errorEl) {
      errorEl = document.createElement("span");
      errorEl.id = errorId;
      errorEl.className = "field-error";
      errorEl.setAttribute("role", "alert");
      field.parentNode.appendChild(errorEl);
    }

    if (!field.value.trim()) {
      field.setAttribute("aria-invalid", "true");
      field.setAttribute("aria-describedby", errorId);
      errorEl.textContent = "Este campo é obrigatório.";
      return false;
    }

    if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      field.setAttribute("aria-invalid", "true");
      errorEl.textContent = "Informe um e-mail válido.";
      return false;
    }

    field.removeAttribute("aria-invalid");
    errorEl.textContent = "";
    return true;
  },

  clearFieldError(field) {
    field.removeAttribute("aria-invalid");
    const errorEl = document.getElementById(`${field.id}-error`);
    if (errorEl) errorEl.textContent = "";
  },

  /* ────────────────────────────────
     NAVEGAÇÃO VIA TECLADO
  ──────────────────────────────── */
  initKeyboardNav() {
    // ESC fecha o menu mobile
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const navMenu = document.getElementById("nav-menu");
        const toggleBtn = document.getElementById("menu-toggle");
        if (navMenu && navMenu.classList.contains("nav-open")) {
          navMenu.classList.remove("nav-open");
          toggleBtn.setAttribute("aria-expanded", "false");
          toggleBtn.focus();
        }
      }
    });
  },

  /* ────────────────────────────────
     UTILITÁRIO
  ──────────────────────────────── */
  setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }
};
