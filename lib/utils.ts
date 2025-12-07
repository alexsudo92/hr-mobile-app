import { EmploymentType } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const employmentText = (employment: EmploymentType) => {
  switch (employment) {
    case EmploymentType.FullTime:
      return 'Полный рабочий день';
    case EmploymentType.Internship:
      return 'Стажировка';
    case EmploymentType.Remote:
      return 'Удаленная работа';
    case EmploymentType.PartTime:
      return 'Неполный рабочий день';
    default:
      throw new Error('wrong status');
  }
};

export const getPlural = (number: number, forms: [string, string, string]): string => {
  const absNumber = Math.abs(number);
  const lastTwoDigits = absNumber % 100;
  const lastDigit = lastTwoDigits % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return forms[2];
  if (lastDigit === 1) return forms[0];
  if (lastDigit >= 2 && lastDigit <= 4) return forms[1];

  return forms[2];
};
