/**
 * MODEL — Responsável pelos dados da aplicação
 * Nenhuma lógica de apresentação aqui
 */
const ProfileModel = {
  profile: {
    name: "Tiago Antunes Paz de Oliveira",
    role: "Desenvolvedor Web Full Stack",
    bio: "Estudante de Sistemas para Internet com bagagem prévia em Jornalismo. Sou apaixonado por resolver problemas reais através do código, construindo desde APIs robustas no back--end até interfaces dinâmicas e acessíveis no front-end.",
    initials: "TA",
    skills: ["JavaScript (ES6+)", "Node.js", "Express.js", "Angular", "MySQL", "Prisma ORM", "PHP", "Git/GitHub"]
  },

  projects: [
    {
      id: 1,
      title: "Suki Doces E-commerce",
      description: "Desenvolvimento de uma loja virtual para um negócio familiar. Atuação de ponta a ponta: estruturação do banco de dados, criação dos endpoints da API e deploy do front-end.",
      tags: ["Node.js", "Express", "Angular"],
      icon: "🛒",
      link: "#"
    },
    {
      id: 2,
      title: "API RESTful no Render",
      description: "Construção e deploy de uma API escalável utilizando o ecossistema JavaScript, com rotas bem estruturadas e foco em performance e integração.",
      tags: ["API", "JavaScript", "Render"],
      icon: "⚙️",
      link: "#"
    },
    {
      id: 3,
      title: "Sistema de Gestão (CRUD)",
      description: "Aplicação focada em gestão corporativa e banco de dados relacional. Estruturada no padrão MVC utilizando servidor local (XAMPP).",
      tags: ["PHP", "MySQL", "POO"],
      icon: "📊",
      link: "#"
    },
    {
      id: 4,
      title: "Otimização e Acessibilidade",
      description: "Auditoria e implementação de melhorias de SEO e acessibilidade em projetos web, integrando ferramentas como Lighthouse e plugins do VLibras.",
      tags: ["HTML Semântico", "Acessibilidade", "Lighthouse"],
      icon: "♿",
      link: "#"
    }
  ],

  contact: {
    email: "tiagoantunes1974@gmail.com",
    github: "https://github.com/TiagoAntunes-Dev",
    linkedin: "https://www.linkedin.com/in/tiago-antunes-paz-de-oliveira-174687254/",
    location: "Santo André, SP — Brasil"
  }
};
