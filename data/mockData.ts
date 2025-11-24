import { EmploymentStatus, JobData, JobStatus } from "@/types";

export const jobData: JobData[] = [
  {
    name: "Frontend Developer",
    startSalary: 60000,
    endSalary: 90000,
    description: "Разработка пользовательских интерфейсов для веб-приложений с использованием React и TypeScript",
    education: "Высшее техническое образование",
    employment: EmploymentStatus.FullTime,
    workHours: 40,
    branch: "IT",
    tags: ["JavaScript", "React", "TypeScript", "CSS", "HTML"],
    postDate: new Date("2024-01-15"),
    endDate: new Date("2024-02-15"),
    status: JobStatus.Open,
    requirements: [
      "Опыт работы с React от 2 лет",
      "Знание TypeScript",
      "Понимание принципов REST API",
      "Опыт работы с системой контроля версий Git"
    ]
  },
  {
    name: "Backend Developer",
    startSalary: 70000,
    endSalary: 110000,
    description: "Разработка серверной части веб-приложений на Node.js и Python",
    education: "Высшее техническое образование",
    employment: EmploymentStatus.Remote,
    workHours: 35,
    branch: "IT",
    tags: ["Node.js", "Python", "PostgreSQL", "Docker", "AWS"],
    postDate: new Date("2024-01-10"),
    endDate: new Date("2024-03-10"),
    status: JobStatus.Open,
    requirements: [
      "Опыт разработки на Node.js или Python",
      "Знание реляционных баз данных",
      "Опыт работы с Docker",
      "Понимание принципов микросервисной архитектуры"
    ]
  },
  {
    name: "Маркетинг менеджер",
    startSalary: 45000,
    endSalary: 65000,
    description: "Разработка и реализация маркетинговых стратегий для продвижения продукции компании",
    education: "Высшее образование в области маркетинга",
    employment: EmploymentStatus.FullTime,
    workHours: 40,
    branch: "Маркетинг",
    tags: ["SMM", "Аналитика", "Контент-маркетинг", "SEO"],
    postDate: new Date("2024-01-05"),
    endDate: new Date("2024-01-25"),
    status: JobStatus.Closed,
    requirements: [
      "Опыт работы в маркетинге от 1 года",
      "Знание инструментов аналитики",
      "Навыки работы с социальными сетями",
      "Опыт разработки маркетинговых кампаний"
    ]
  },
  {
    name: "Стажер в отдел разработки",
    startSalary: 25000,
    endSalary: 30000,
    description: "Обучение и участие в реальных проектах под руководством опытных разработчиков",
    education: "Студент старших курсов технических специальностей",
    employment: EmploymentStatus.Internship,
    workHours: 20,
    branch: "IT",
    tags: ["Обучение", "Стажировка", "JavaScript", "Python"],
    postDate: new Date("2024-01-20"),
    endDate: new Date("2024-03-20"),
    status: JobStatus.Open,
    requirements: [
      "Базовые знания программирования",
      "Желание обучаться и развиваться",
      "Наличие портфолио с учебными проектами",
      "Готовность работать в команде"
    ]
  },
  {
    name: "Бухгалтер (неполный день)",
    startSalary: 35000,
    endSalary: 45000,
    description: "Ведение первичной документации, подготовка отчетности, работа с клиентами",
    education: "Высшее экономическое образование",
    employment: EmploymentStatus.PartTime,
    workHours: 20,
    branch: "Финансы",
    tags: ["Бухгалтерия", "1С", "Отчетность", "Налоги"],
    postDate: new Date("2024-01-12"),
    endDate: new Date("2024-02-12"),
    status: JobStatus.OnHold,
    requirements: [
      "Опыт работы бухгалтером от 1 года",
      "Знание 1С:Бухгалтерия",
      "Понимание налогового законодательства",
      "Внимательность к деталям"
    ]
  },
  {
    name: "DevOps инженер",
    startSalary: 90000,
    endSalary: 140000,
    description: "Настройка и поддержка CI/CD процессов, управление инфраструктурой, мониторинг систем",
    education: "Высшее техническое образование",
    employment: EmploymentStatus.Remote,
    workHours: 40,
    branch: "IT",
    tags: ["Kubernetes", "Docker", "AWS", "CI/CD", "Terraform"],
    postDate: new Date("2024-01-08"),
    endDate: new Date("2024-02-28"),
    status: JobStatus.Open,
    requirements: [
      "Опыт работы с облачными платформами",
      "Знание контейнеризации и оркестрации",
      "Опыт настройки CI/CD",
      "Знание инструментов инфраструктуры как код"
    ]
  },
  {
    name: "UI/UX дизайнер",
    startSalary: 50000,
    endSalary: 80000,
    description: "Создание пользовательских интерфейсов и прототипов для мобильных и веб-приложений",
    education: "Высшее образование в области дизайна",
    employment: EmploymentStatus.FullTime,
    workHours: 40,
    branch: "Дизайн",
    tags: ["Figma", "UI/UX", "Прототипирование", "Adobe Creative Suite"],
    postDate: new Date("2023-12-20"),
    endDate: new Date("2024-01-20"),
    status: JobStatus.Closed,
    requirements: [
      "Опыт работы в UI/UX дизайне от 2 лет",
      "Портфолио с реализованными проектами",
      "Знание Figma и Adobe Creative Suite",
      "Понимание принципов юзабилити"
    ]
  }
];