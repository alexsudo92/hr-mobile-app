import { Interaction, InteractionType } from '@/types';

export const interactions: Interaction[] = [
  // Иванов Алексей Петрович - Frontend Developer
  {
    id: '018e32d3-7e69-7e33-bf5f-48d1a0fb6c39',
    candidateId: '018e32d3-7e69-7e29-15bf-ae3df08b2c6f',
    date: new Date('2024-01-16T10:00:00'),
    type: InteractionType.RecievedMail,
    byId: '019ac280-13e8-7dcf-82f4-1e14f24d94ad',
    message: 'Кандидат откликнулся на вакансию Frontend Developer',
  },
  {
    id: '018e32d3-7e69-7e34-c06f-59e2b1fc7d4a',
    candidateId: '018e32d3-7e69-7e29-15bf-ae3df08b2c6f',
    date: new Date('2024-01-17T14:30:00'),
    type: InteractionType.SentCall,
    byId: '019ac280-13e8-7dcf-82f4-2e15f24d94ad',
    message: 'Первичный скрининг, обсуждение опыта работы с React и TypeScript',
  },
  {
    id: '018e32d3-7e69-7e35-d17f-6af3c2fd8e5b',
    candidateId: '018e32d3-7e69-7e29-15bf-ae3df08b2c6f',
    date: new Date('2024-01-19T11:00:00'),
    type: InteractionType.Interview,
    byId: '019ac280-13e8-7dcf-82f4-1e14f24d94ad',
    message: 'Техническое собеседование с командой разработки',
  },

  // Петрова Мария Сергеевна - Backend Developer
  {
    id: '018e32d3-7e69-7e36-e28f-7b04d3fe9f6c',
    candidateId: '018e32d3-7e69-7e2a-26cf-bf4e19c3d7a0',
    date: new Date('2024-01-22T09:15:00'),
    type: InteractionType.RecievedMail,
    byId: '019ac280-13e8-7dcf-82f4-2e15f24d94ad',
    message: 'Отклик на вакансию Backend Developer',
  },
  {
    id: '018e32d3-7e69-7e37-f39f-8c15e4ffa07d',
    candidateId: '018e32d3-7e69-7e2a-26cf-bf4e19c3d7a0',
    date: new Date('2024-01-23T16:45:00'),
    type: InteractionType.SentSms,
    byId: '019ac280-13e8-7dcf-82f4-1e14f24d94ad',
    message: 'Назначено техническое задание по Node.js и PostgreSQL',
  },
  {
    id: '018e32d3-7e69-7e38-04af-9d26f500b18e',
    candidateId: '018e32d3-7e69-7e2a-26cf-bf4e19c3d7a0',
    date: new Date('2024-01-25T13:00:00'),
    type: InteractionType.Interview,
    byId: '019ac280-13e8-7dcf-82f4-2e15f24d94ad',
    message: 'Собеседование с тимлидом backend-отдела',
  },

  // Сидоров Дмитрий Владимирович - Менеджер по продажам
  {
    id: '018e32d3-7e69-7e39-15bf-ae37f601c29f',
    candidateId: '018e32d3-7e69-7e2b-37df-c05f2ad4e8b1',
    date: new Date('2024-02-02T08:30:00'),
    type: InteractionType.RecievedMail,
    byId: '019ac280-13e8-7dcf-82f4-1e14f24d94ad',
    message: 'Новый отклик на вакансию менеджера по продажам',
  },
  {
    id: '018e32d3-7e69-7e3a-26cf-bf48f702d3a0',
    candidateId: '018e32d3-7e69-7e2b-37df-c05f2ad4e8b1',
    date: new Date('2024-02-03T11:20:00'),
    type: InteractionType.SentCall,
    byId: '019ac280-13e8-7dcf-82f4-2e15f24d94ad',
    message: 'Знакомство, обсуждение опыта в Сбермаркете',
  },

  // Козлова Анна Игоревна - DevOps инженер
  {
    id: '018e32d3-7e69-7e3b-37df-c05ff803e4b1',
    candidateId: '018e32d3-7e69-7e2c-48ef-d16a3be5f9c2',
    date: new Date('2024-01-12T14:00:00'),
    type: InteractionType.RecievedMail,
    byId: '019ac280-13e8-7dcf-82f4-2e15f24d94ad',
    message: 'Отклик на вакансию DevOps инженера',
  },
  {
    id: '018e32d3-7e69-7e3c-48ef-d16bf904f5c2',
    candidateId: '018e32d3-7e69-7e2c-48ef-d16a3be5f9c2',
    date: new Date('2024-01-15T10:00:00'),
    type: InteractionType.Interview,
    byId: '019ac280-13e8-7dcf-82f4-1e14f24d94ad',
    message: 'Техническое собеседование по Kubernetes и AWS',
  },
  {
    id: '018e32d3-7e69-7e3d-59ff-e27cfa05f6d3',
    candidateId: '018e32d3-7e69-7e2c-48ef-d16a3be5f9c2',
    date: new Date('2024-01-18T17:30:00'),
    type: InteractionType.Offer,
    byId: '019ac280-13e8-7dcf-82f4-2e15f24d94ad',
    message: 'Выставлено офферное предложение на 200000 руб.',
  },

  // Федоров Артем Олегович - UX/UI дизайнер
  {
    id: '018e32d3-7e69-7e3e-6a0f-f38dfb06f7e4',
    candidateId: '018e32d3-7e69-7e2d-59ff-e27b4cf60ad3',
    date: new Date('2024-02-11T12:15:00'),
    type: InteractionType.RecievedMail,
    byId: '019ac280-13e8-7dcf-82f4-1e14f24d94ad',
    message: 'Отклик на вакансию UX/UI дизайнера',
  },
  {
    id: '018e32d3-7e69-7e3f-7b1f-049efc07f8f5',
    candidateId: '018e32d3-7e69-7e2d-59ff-e27b4cf60ad3',
    date: new Date('2024-02-12T15:45:00'),
    type: InteractionType.Interview,
    byId: '019ac280-13e8-7dcf-82f4-2e15f24d94ad',
    message: 'Просмотр портфолио, обсуждение опыта в СберДизайне',
  },
  {
    id: '018e32d3-7e69-7e40-8c2f-15affd08f906',
    candidateId: '018e32d3-7e69-7e2d-59ff-e27b4cf60ad3',
    date: new Date('2024-02-14T11:00:00'),
    type: InteractionType.Hired,
    byId: '019ac280-13e8-7dcf-82f4-1e14f24d94ad',
    message: 'Кандидат принят на работу на условиях part-time',
  },

  // Никитина Елена Валерьевна - Стажер-разработчик
  {
    id: '018e32d3-7e69-7e41-9d3f-26b0fe09fa17',
    candidateId: '018e32d3-7e69-7e2e-6a0f-f38c5da71be4',
    date: new Date('2024-02-06T13:20:00'),
    type: InteractionType.RecievedMail,
    byId: '019ac280-13e8-7dcf-82f4-2e15f24d94ad',
    message: 'Студент 4 курса НГУ откликнулся на стажировку',
  },
  {
    id: '018e32d3-7e69-7e42-ae4f-37c1ff0afb28',
    candidateId: '018e32d3-7e69-7e2e-6a0f-f38c5da71be4',
    date: new Date('2024-02-07T10:30:00'),
    type: InteractionType.SentCall,
    byId: '019ac280-13e8-7dcf-82f4-1e14f24d94ad',
    message: 'Собеседование с ментором, оценка базовых навыков',
  },

  // Волков Павел Александрович - Аналитик данных
  {
    id: '018e32d3-7e69-7e43-bf5f-48d2000bfc39',
    candidateId: '018e32d3-7e69-7e2f-7b1f-049d6eb82cf5',
    date: new Date('2024-01-26T16:00:00'),
    type: InteractionType.RecievedMail,
    byId: '019ac280-13e8-7dcf-82f4-1e14f24d94ad',
    message: 'Отклик на вакансию аналитика данных',
  },
  {
    id: '018e32d3-7e69-7e44-c06f-59e3010cfd4a',
    candidateId: '018e32d3-7e69-7e2f-7b1f-049d6eb82cf5',
    date: new Date('2024-01-29T14:00:00'),
    type: InteractionType.Interview,
    byId: '019ac280-13e8-7dcf-82f4-2e15f24d94ad',
    message: 'Кейс-интервью по аналитике и SQL',
  },

  // Григорьева Ольга Дмитриевна - Маркетолог
  {
    id: '018e32d3-7e69-7e45-d17f-6af4020dfe5b',
    candidateId: '018e32d3-7e69-7e30-8c2f-15ae7fc93d06',
    date: new Date('2024-02-16T09:45:00'),
    type: InteractionType.RecievedMail,
    byId: '019ac280-13e8-7dcf-82f4-2e15f24d94ad',
    message: 'Отклик на вакансию маркетолога',
  },
  {
    id: '018e32d3-7e69-7e46-e28f-7b05030eff6c',
    candidateId: '018e32d3-7e69-7e30-8c2f-15ae7fc93d06',
    date: new Date('2024-02-19T11:30:00'),
    type: InteractionType.Interview,
    byId: '019ac280-13e8-7dcf-82f4-1e14f24d94ad',
    message: 'Собеседование с руководителем маркетингового отдела',
  },
  {
    id: '018e32d3-7e69-7e47-f39f-8c16040fa07d',
    candidateId: '018e32d3-7e69-7e30-8c2f-15ae7fc93d06',
    date: new Date('2024-02-21T16:15:00'),
    type: InteractionType.Rejected,
    byId: '019ac280-13e8-7dcf-82f4-2e15f24d94ad',
    message: 'Кандидат не подошел по требованиям к опыту работы',
  },

  // Белов Сергей Николаевич - Системный администратор
  {
    id: '018e32d3-7e69-7e48-04af-9d27050fb18e',
    candidateId: '018e32d3-7e69-7e31-9d3f-26bf8eda4e17',
    date: new Date('2024-02-01T15:10:00'),
    type: InteractionType.RecievedMail,
    byId: '019ac280-13e8-7dcf-82f4-1e14f24d94ad',
    message: 'Новый отклик на вакансию системного администратора',
  },
  {
    id: '018e32d3-7e69-7e49-15bf-ae380610c29f',
    candidateId: '018e32d3-7e69-7e31-9d3f-26bf8eda4e17',
    date: new Date('2024-02-02T12:00:00'),
    type: InteractionType.SentSms,
    byId: '019ac280-13e8-7dcf-82f4-2e15f24d94ad',
    message: 'Отправлено приглашение на техническое собеседование',
  },

  // Смирнова Ирина Викторовна - Менеджер по продукту
  {
    id: '018e32d3-7e69-7e4a-26cf-bf490711d3a0',
    candidateId: '018e32d3-7e69-7e32-ae4f-37c09feb5f28',
    date: new Date('2024-02-13T10:30:00'),
    type: InteractionType.RecievedMail,
    byId: '019ac280-13e8-7dcf-82f4-2e15f24d94ad',
    message: 'Отклик на вакансию менеджера по продукту',
  },
  {
    id: '018e32d3-7e69-7e4b-37df-c05a0812e4b1',
    candidateId: '018e32d3-7e69-7e32-ae4f-37c09feb5f28',
    date: new Date('2024-02-14T15:00:00'),
    type: InteractionType.Interview,
    byId: '019ac280-13e8-7dcf-82f4-1e14f24d94ad',
    message: 'Собеседование с продукт-директором',
  },
  {
    id: '018e32d3-7e69-7e4c-48ef-d16b0913f5c2',
    candidateId: '018e32d3-7e69-7e32-ae4f-37c09feb5f28',
    date: new Date('2024-02-16T18:00:00'),
    type: InteractionType.Offer,
    byId: '019ac280-13e8-7dcf-82f4-2e15f24d94ad',
    message: 'Выставлен оффер с зарплатой 190000 руб.',
  },
];
