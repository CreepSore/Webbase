# Webbase v2

1. [Web Routes](#web-routes)
2. [Db Models](#db-models)

---

## Web Routes
Relevant files and folders:
  - src/web/*
    - src/web/static
    - src/web/ApiRouter.js
    - src/web/ViewRouter.js

### src/web/static
Static files accessible using `/<css|dependencies|js|favicon.jpg>` per default.
Adding more files and folders is possible and will be bound automatically and during runtime.

### src/web/ApiRouter.js
Used to define API routes. Default is `v1`.  

Default Endpoints:
  - Models

### src/web/ViewRouter.js
Used to define frontend views.
See `src/web/view/baseRouter.js` for examples.

---

## Db Models
Relevant files and folders:
  - src/loader/SequelizeLoader.js
  - src/model/*

To create a new model you have to define it as a new class inside the `src/model/` folder. After that you have to initialize it inside the `src/loader/SequelizeLoader.js:start()` function

Default Models:
  - Version

### Version
Implements metadata of installed components. Can be used to automatically merge new components.

