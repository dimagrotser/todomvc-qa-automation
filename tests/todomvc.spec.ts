import { test, expect } from "@playwright/test";
import { TodoPage } from "../pages/todo-page.js";

test.describe("TodoMVC Tests", () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.navigate();
  });

  test("TS-1: should allow me to add todo items", async () => {
    const todoText = "Buy milk";
    await todoPage.addTodo(todoText);

    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoLabels.first()).toHaveText(todoText);

    const todoCount = await todoPage.getTodoCount();
    expect(todoCount).toBe(1);

    const isCompleted = await todoPage.isTodoCompleted();
    expect(isCompleted).toBe(false);
  });

  test("TS-2: should allow me to mark items as complete", async () => {
    const todoText = "Read a book";
    await todoPage.addTodo(todoText);

    const initialCount = await todoPage.getTodoCount();
    expect(initialCount).toBe(1);

    await todoPage.completeTodo();

    const isCompleted = await todoPage.isTodoCompleted();
    expect(isCompleted).toBe(true);

    const finalCount = await todoPage.getTodoCount();
    expect(finalCount).toBe(0);
  });

  test.skip("TS-3: should allow me to add multiple items", async () => {
    const todos = ["Task 1", "Task 2", "Task 3"];

    for (const todo of todos) {
      await todoPage.addTodo(todo);
    }

    await expect(todoPage.todoItems).toHaveCount(3);

    for (let i = 0; i < todos.length; i++) {
      const todoText = await todoPage.getTodoText(i);
      expect(todoText).toBe(todos[i]);
    }

    const activeCount = await todoPage.getTodoCount();
    expect(activeCount).toBe(3);
  });

  test.skip("TS-4: should allow me to filter tasks", async () => {
    await todoPage.addTodo("Active task 1");
    await todoPage.addTodo("Active task 2");
    await todoPage.addTodo("Completed task");

    await todoPage.completeTodo(2);

    const activeCount = await todoPage.getTodoCount();
    expect(activeCount).toBe(2);
  });
});
