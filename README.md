
# 3205.team. Тестовое задание


Task
- 
Разработать одностраничное web-приложение: сайт с формой поиска пользователей в json файле на nodejs сервере.

Features
-
#### Основные(по заданию)
- Имитация долгой обработки запроса на бэке
- Сброс старого запроса при отправке нового
- Валидация формы на сервере
- Маска на поле с номером
#### Дополнительные
- Проектирование клиента по [FSD](https://feature-sliced.design/)
- Кастомный хук сброса запроса
- Кастомный компонент инпута с маской
- Валидация формы на клиенте








## Deploy

Копируем репозиторий

```bash
  git clone https://github.com/kekovina/3205.team-task.git
```

### Frontend
Переходим в директорию с клиентом
```bash
  cd frontend
```
#### Dev

```bash
  npm i
  npm run dev
```

#### Prod

```bash
  npm i
  npm run build
```
Файлы после сборки будут находиться в директории /dist


### Backend
Переходим в директорию с сервером
```bash
  cd backend
```
#### Dev
```bash
  npm i
  npm run dev
```
#### Prod
```bash
  npm i
  npm run build
  npm run start
```


## Tech Stack

**Frontend:** React 18, Vite 5, TypeScript, Formik, TailwindCSS

**Backend:** Node v16.13.2, Express, Yup


## Authors

- [@kekovina](https://github.com/kekovina)

