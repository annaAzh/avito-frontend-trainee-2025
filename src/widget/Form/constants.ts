import { ExtraFields } from './types';

const realEstate_propertyType = [
  {
    id: 1,
    value: 'Квартира',
  },
  {
    id: 2,
    value: 'Комната',
  },
  {
    id: 3,
    value: 'Дом, Дача, Коттедж',
  },
  {
    id: 4,
    value: 'Земельный участок',
  },
  {
    id: 5,
    value: 'Гараж и машиноместо',
  },
  {
    id: 6,
    value: 'Коммерческая недвижимость',
  },
  {
    id: 7,
    value: 'Недвижимость за рубежом',
  },
  {
    id: 8,
    value: 'Отель',
  },
];

const auto_brand = [
  { id: 1, value: 'Audi164' },
  { id: 2, value: 'BMW' },
  { id: 3, value: 'Changan' },
  { id: 4, value: 'Chery' },
  { id: 5, value: 'Chevrolet' },
  { id: 6, value: 'Datsun' },
  { id: 7, value: 'Ford' },
  { id: 8, value: 'Geely' },
  { id: 9, value: 'HAVAL' },
  { id: 10, value: 'Honda' },
  { id: 11, value: 'Hyundai' },
  { id: 12, value: 'Kia' },
  { id: 13, value: 'Land Rover' },
  { id: 14, value: 'Lexus' },
  { id: 15, value: 'Mazda' },
  { id: 16, value: 'Mercedes-Benz' },
  { id: 17, value: 'Mitsubishi' },
  { id: 18, value: 'Nissan' },
  { id: 19, value: 'Opel' },
  { id: 20, value: 'Peugeot' },
  { id: 21, value: 'Renault' },
  { id: 22, value: 'Skoda' },
  { id: 23, value: 'SangYong' },
  { id: 24, value: 'Suzuki' },
  { id: 25, value: 'Toyota' },
  { id: 26, value: 'Volkswagen' },
  { id: 27, value: 'ВАЗ (LADA)' },
  { id: 28, value: 'ГАЗ' },
];

const services_serviceType = [
  {
    id: 1,
    value: 'Ремонт',
  },
  {
    id: 2,
    value: 'Уборка',
  },
  {
    id: 3,
    value: 'Доставка',
  },
  {
    id: 4,
    value: 'Электрика',
  },
  {
    id: 5,
    value: 'Сантехника',
  },
  {
    id: 6,
    value: 'Грузоперевозки',
  },
  {
    id: 7,
    value: 'Ремонт техники',
  },
  {
    id: 8,
    value: 'Юридические услуги',
  },
  {
    id: 9,
    value: 'Косметология',
  },
  {
    id: 10,
    value: 'Обучение и курсы',
  },
  {
    id: 11,
    value: 'Строительство',
  },
  {
    id: 12,
    value: 'Вывоз мусора',
  },
  {
    id: 13,
    value: 'Дизайн интерьера',
  },
  {
    id: 14,
    value: 'Фото и видеосъемка',
  },
  {
    id: 15,
    value: 'Курьерские услуги',
  },
  {
    id: 16,
    value: 'Репетиторство',
  },
  {
    id: 17,
    value: 'Автосервис',
  },
  {
    id: 18,
    value: 'Ландшафтный дизайн',
  },
  {
    id: 19,
    value: 'Пошив одежды',
  },
  {
    id: 20,
    value: 'Прокат авто',
  },
];

const realEstate: ExtraFields[] = [
  {
    id: 1,
    name: 'propertyType',
    label: 'Тип недвижимости',
    required: true,
    type: 'string',
    domElement: 'select',
    items: realEstate_propertyType,
  },
  {
    id: 2,
    name: 'area',
    label: 'Площадь(кв. м)',
    required: true,
    type: 'number',
    domElement: 'input',
  },
  {
    id: 3,
    name: 'rooms',
    label: 'Количество комнат',
    required: true,
    type: 'number',
    domElement: 'input',
  },
  {
    id: 4,
    name: 'price',
    label: 'Цена',
    required: true,
    type: 'number',
    domElement: 'input',
  },
];
const auto: ExtraFields[] = [
  {
    id: 1,
    name: 'brand',
    label: 'Марка',
    required: true,
    type: 'string',
    domElement: 'select',
    items: auto_brand,
  },
  { id: 2, name: 'model', label: 'Модель', required: true, type: 'string', domElement: 'input' },
  { id: 3, name: 'year', label: 'Год выпуска', required: true, type: 'number', domElement: 'input' },
  { id: 4, name: 'mileage', label: 'Пробег(км)', required: false, type: 'number', domElement: 'input' },
];

const services: ExtraFields[] = [
  {
    id: 1,
    name: 'serviceType',
    label: 'Тип услуги',
    required: true,
    type: 'string',
    domElement: 'select',
    items: services_serviceType,
  },
  { id: 2, name: 'experience', label: 'Опыт работы (лет)', required: true, type: 'number', domElement: 'input' },
  { id: 3, name: 'cost', label: 'Стоимость', required: true, type: 'number', domElement: 'input' },
  { id: 4, name: 'workSchedule', label: 'График работы', required: false, type: 'string', domElement: 'input' },
];

export { realEstate_propertyType, auto_brand, realEstate, auto, services_serviceType, services };
