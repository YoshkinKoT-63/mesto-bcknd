## Версия 0.0.6

Проектная работа к 15-му спринту

# IP-адрес и домен сервера
### 130.193.49.204 - IP-адрес
### https://yoshkinkot.tk - домен

## Инструкции по запуску: 

Клонирование репозитория:

    git clone https://github.com//YoshkinKoT-63/mesto-final_sprint-15

Установка пакетов:

    npm init
    npm -i express
    npm -i nodemon


Запуск проекта на локальном сервере:

    npm run start
    

Запуск проекта на локальном сервере c хот-релоудом:

    npm run build

## Сервер обрабатывает следующие запросы:

Получение даных всех пользователей из базы:

    GET /users

Получение данных пользователя по id:

    GET /users/:userId

Создание нового пользователя:

    POST /users

Получение всех карточек всех пользователей:

    GET /cards

Создание карточки:

    POST /cards

Удаление карточки:

    DELETE /cards/:cardId
