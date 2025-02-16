# Avito Clone - Тестовое задание для стажёра Frontend 2025

## 📌  Запуск проекта

### Локальный запуск проекта

1. **Установите зависимости для сервера:**

```bash
cd server
npm install
```

2. **Запустите сервер:**

```bash
npm start
```

3. **Установите зависимости для клиента:**

```bash
cd ../client
npm install
```

4. **Запустите клиент:**

```bash
npm run dev
```

### Docker-развертывание

1. **Соберите и запустите контейнеры:**

```bash
docker-compose up --build
```

2. **Приложение будет доступно:**

- Клиент: `http://localhost:5173`
- Сервер: `http://localhost:3000`

## 📌 Техническое задание

### Основные требования

- React 18+ с TypeScript
- Роутинг c react-router-dom
- Серверная часть из папки `server`
- Три категории объявлений: недвижимость, авто, услуги
- Многошаговая форма с валидацией
- Пагинация, поиск и фильтрация
- Сохранение формы в черновик

### Маршруты

- `/form` - Создание/редактирование объявлений
- `/list` - Список объявлений (5 на странице)
- `/item/:id` - Детализация объявления

## 📌 Выбор технологий

### Обязательные:

- **React + TypeScript** - Базовый стек для разработки
- **react-router-dom** - Навигация между страницами

### Дополнительные:

1. **Tailwind css + Schad cn ui**

    - Готовые адаптивные компоненты
   - Ускорение разработки интерфейсов
   - Встроенная accessibility

2. **Vite**

   - Молниеносная сборка проекта
   - Горячая перезагрузка модулей
   - Оптимизация production-сборки

3. **Eslint + Prettier + Husky**

   - Поддержание единого стиля кода
   - Автоматическое форматирование кода
   - Предотвращение коммитов с ошибками

4. **Tanstack Query + Axios**

   - Кеширование API-запросов
   - Прерывание API-запросов при переходе на другие страницы

5. **Zod + react-hook-form**
   - Валидация форм с автоматическим определением типа Typescript

6. **Vitest + React Testing Library**
   - Быстрые и изолированные тесты
   - Встроенная поддержка TypeScript

### Оптимизации

   - Кастомная дебаунс функция для поиска по объявлениям


## 📌  Реализовано

   - Размещение объявлений: форма с несколькими шагами для размещения объявлений
   - Список объявлений: отображение всех размещённых объявлений
   - Просмотр объявлений: детальная карточка объявления с возможностью редактирования
   - Редактирование объявлений: изменение существующих объявлений с предзаполненными данными
   - При перезагрузке страницы данные в форме сохраняются в черновик
   - Реализована пагинация (допускается как на клиенте, так и на сервере)
   - Реализована фильтрация по категории объявления
   - Реализована сортировка по названию товара и по фотографиям 

## 📌  Замечание

   - В папке с серверным кодом внесены изменения для разрешения CORS запросов с порта клиента (http://localhost:5173)