## Как запустить

`npm run dev` - для запуска

## Javascript Boilerplate

Универсальная сборка для выполнения домашних заданий на курсе по Javascript

Позволяет писать код на современном ES

## Что внутри

- полностью настроенная конфигурация для webpack 4 + babel 7
- prettier + eslint - чтобы не заботиться о code-style
- jest - чтобы писать тесты

## Как разрабатывать

- создайте папки со своими проектами/выполненными ДЗ в папке `projects`, например `projects/foo/index.js`
- запустите `npm start`
- откройте `http://localhost:8080/[имя проекта]`, например [http://localhost:8080/foo](http://localhost:8080/foo)
- разрабатывайте с удовольствием, при изменении файлов, страница будет перезагружаться автоматически

## Как тестировать

- пишите в файлах с расширением `.spec.js`, например `foo.spec.js`
- запускайте `npm test` и jest сам найдет все файлы с этим расширением

## Доступные команды

- `start` - запустить сервер для локальной разработки
- `build` - собрать все проекты в папку dist
- `codestyle` - проверить code-style
- `codestyle:fix` - проверить code-style и автоматически исправить замечания, которые можно исправить
- `test` - запустить тесты

## Code-style

Когда вы делаете коммит своих изменений, автоматически будет запущена команда npm run codestyle:fix.
Это позволит автоматически исправить замечания по code-style, которые можно исправить.

Если вы пользуетесь средами разработки IDEA или VSCode, то их можно настроить таким образом, чтобы код автоматически переформатировался и соответствовал code-style каждый раз, когда вы нажимаете `Сохранить`.
Это очень удобно и позволяет практически не заботиться о том, чтобы вручную подгонять code-style к нужному виду.

## Как выполнять ДЗ

1. Поместите папку с ДЗ в `projects`
2. Выполните то, что требуется в описании ДЗ
3. Запустите `npm run test` чтобы запустить тесты, которые поставляются с каждым ДЗ
4. Если тесты прошли успешно - отправьте свой код наставнику (например через pull request на github)

## Proxy

Если вы разрабатываете проект, которому необходим свой бэкенд, то вы можете создать в своем проекте файл `settings.json` с таким содержимым:

```json
{
  "proxy": {
    "/my-project/foo": {
      "target": "http://localhost:8181",
      "pathRewrite": {
        "^/my-project": ""
      }
    }
  }
}
```

Теперь, из кода проекта, можете отправлять запросы по адресу `/my-project/foo` и они будут перенаправляться на `http://localhost:8181/foo` 
