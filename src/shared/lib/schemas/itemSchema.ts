import { auto_brand, realEstate_propertyType, services_serviceType } from '@/widget/Form/constants';
import { z } from 'zod';

export const baseSchema = z.object({
  name: z
    .string({ required_error: 'Название обязательное поле' })
    .min(2, { message: 'Название должно быть не менее 2 символов' })
    .regex(/[a-zA-ZА-Яа-я]/, { message: 'Используйте только буквы' }),
  description: z
    .string({
      required_error: 'Описание обязательное поле',
    })
    .min(5, { message: 'Описание должно быть не менее 5 символов' }),
  location: z
    .string({
      required_error: 'Локация обязательное поле',
    })
    .min(2, { message: 'Локация должна быть не менее 2 символов' }),

  image: z.string().url('Не валидный URL формат').optional(),

  type: z.enum(['Недвижимость', 'Авто', 'Услуги'], { message: 'Некорректный тип объявления' }),
});

const realEstateSchema = baseSchema.extend({
  type: z.literal('Недвижимость'),

  propertyType: z.enum(realEstate_propertyType.map((el) => el.value) as [string, ...string[]], {
    message: 'Выберите корректный тип недвижимости',
  }),
  area: z.preprocess(
    (value) => (typeof value === 'string' ? Number(value) : value),
    z.number().positive({ message: 'Площадь должна быть положительным числом' }),
  ),
  rooms: z.preprocess(
    (value) => (typeof value === 'string' ? Number(value) : value),
    z.number().int().positive({ message: 'Количество комнат должно быть целым числом' }),
  ),
  price: z.preprocess(
    (value) => (typeof value === 'string' ? Number(value) : value),
    z.number().positive({ message: 'Цена должна быть положительным числом' }),
  ),
});

const autoSchema = baseSchema.extend({
  type: z.literal('Авто'),

  brand: z.enum(auto_brand.map((el) => el.value) as [string, ...string[]], {
    message: 'Выберите корректный тип авто',
  }),

  model: z
    .string({
      required_error: 'Модель  обязательное поле',
    })
    .min(2, { message: 'Модель должна быть не менее 2 символов' }),
  year: z.preprocess(
    (value) => (typeof value === 'string' ? Number(value) : value),
    z
      .number()
      .int()
      .min(1960, { message: 'Год выпуска должен быть не ранее 1960' })
      .max(new Date().getFullYear(), { message: `Год выпуска не может быть позднее ${new Date().getFullYear()}` }),
  ),
  mileage: z.preprocess(
    (value) => (typeof value === 'string' ? Number(value) : value),
    z.number().int().nonnegative().optional(),
  ),
});

const serviceSchema = baseSchema.extend({
  type: z.literal('Услуги'),
  serviceType: z.enum(services_serviceType.map((el) => el.value) as [string, ...string[]], {
    message: 'Выберите корректный тип услуг',
  }),

  experience: z.preprocess(
    (value) => (typeof value === 'string' ? Number(value) : value),
    z.number().int().min(0, { message: 'Опыт не может быть отрицательным' }),
  ),
  cost: z.preprocess(
    (value) => (typeof value === 'string' ? Number(value) : value),
    z.number().positive({ message: 'Стоимость услуги должна быть положительным числом' }),
  ),
  workSchedule: z.string().optional(),
});

export const itemSchema = z.discriminatedUnion('type', [realEstateSchema, autoSchema, serviceSchema]);

export type ItemSchema = z.infer<typeof itemSchema>;
export { realEstateSchema, autoSchema, serviceSchema };
