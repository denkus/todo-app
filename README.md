# Разработка Интернет-приложений - ЛБ - TodoList

## БД на PostgreSQL

1. Запустить Docker-контейнер с БД
    ```
    docker compose up
    ```
2. Подключиться к БД  
    _Host_: localhost  
    _Port_: 5439  
    _Database_: todo_dev  
    _Username_: postgres  
    _Password_: 123456

## API на Node.js + Express

[Инструкция по запуску API](todo-api/README.md)
[Код обработки методов API](todo-api/server.js)

## Web UI на Vue.js

[Инструкция по запуску Web UI](todo-web/README.md)
