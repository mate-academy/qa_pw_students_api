# Stundents API testing

## Table of contents

- [Description](#description)
- [Preparation](#preparation)
- [Main Task](#main-task)
- [Task Reporting](#task-reporting)

## Description

In this task, you will create your first API tests for the `/todos` endpoint of the [StudentsAPI](https://documenter.getpostman.com/view/6914900/2s93RQSZNT#intro). 

## Preparation

1. Open the forked repo in VSCode.
2. Create a new branch by running `git checkout -b task_solution`.
3. Run the installation commands:
   - `npm ci`
     - `npx playwright install`

## Main Task

1. Create new tests within the `tests/studentsApi/todos`:

- `getAllTodos.spec.js`;
- `getNotCompletedTodosForUser.spec.js`; 
- `getCompletedTodosForUser.spec.js`;

2. Follow the test steps in comments of each spec file.
3. Use `tests/studentsApi/goods/**.spec.js` files as example.
4. Create class `TodosAPI.js` under the `src/api` and add all the methods for work with the `/todo` endpoint. Use `GoodsAPI.js` as exapmle.
5. Add step wrappers for methods in the `TodosAPI.js` class.
6. Create `tests/_fixtures/fixturesTodosApi.ts` file with fixture `todosAPI`. Do not forget to merge new fixture file to the ``tests/_fixtures/fixtures.ts`.
7. Look at the `GoodsAPI.js` and `TodosAPI.js` classes and find duplicated methods.
8. Create parent class `BaseAPI.js` and move all common methods to it.
9. Run all your tests and make sure they pass.

## Task Reporting

1. Add and commit all your updates.
2. Push the code to the origin.
3. Create a PR for your changes.
4. Keep implementing suggestions from code review until your PR is approved.
