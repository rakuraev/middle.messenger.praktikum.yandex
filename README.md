# Messanger

### Как запустить проект

1. Установить зависимости

```bash
$ npm install
```

2. Запустить проект в `DEV` режиме, с HMR

```bash
$ npm run dev
```

3. Собрать проект и запустить сервер на Express.js

```bash
$ npm run start
```

### Используемые технологии:

1. Шаблонизатор `HandleBars`
2. Сборщик `Parcel v2`
3. Стили через `PostCss`
4. Верстка по `БЭМу`(Вернее как я это понял из Быстрого старта по документации)
5. `Node.js v16.14.2`
6. TypeScript
7. [Ссылка на макет прототипа ](https://www.figma.com/file/neCdz9gSrpb302shOpMF5W/PacanskiyMessanger?node-id=4686%3A2)
8. [Docker контейнер в Яндекс.Облаке](https://bbafhnomc82dmdlgaio4.containers.yandexcloud.net/)
9. Попытался имлементировать архитектуру [Feature-Sliced Design](https://feature-sliced.design/ru/)

### Страницы доступны по роутам

```
/ - LoginPage
/signup - SignupPage
/chat - ChatPage
/profile - ProfilePage
```
