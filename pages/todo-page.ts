import { type Locator, type Page } from "@playwright/test";

export class TodoPage {
  readonly page: Page;
  readonly inputField: Locator;
  readonly todoItems: Locator;
  readonly todoLabels: Locator;
  readonly todoCheckboxes: Locator;
  readonly todoCount: Locator;
  readonly clearCompleted: Locator;
  readonly filters: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputField = page.locator(".new-todo");
    this.todoItems = page.locator(".todo-list li");
    this.todoLabels = page.locator(".todo-list label");
    this.todoCheckboxes = page.locator(".todo-list .toggle");
    this.todoCount = page.locator(".todo-count");
    this.clearCompleted = page.locator(".clear-completed");
    this.filters = page.locator(".filters a");
  }

  async navigate(): Promise<void> {
    await this.page.goto("examples/preact/dist/");
  }

  async addTodo(text: string): Promise<void> {
    await this.inputField.fill(text);
    await this.inputField.press("Enter");
  }

  async getTodoCount(): Promise<number> {
    const countText = await this.todoCount.textContent();
    if (countText && countText.includes("item")) {
      const match = countText.split(" ")[0];
      return match ? parseInt(match) : 0;
    }
    return 0;
  }

  async completeTodo(index: number = 0): Promise<void> {
    await this.todoCheckboxes.nth(index).click();
  }

  async getTodoText(index: number = 0): Promise<string> {
    return (await this.todoLabels.nth(index).textContent()) || "";
  }

  async isTodoCompleted(index: number = 0): Promise<boolean> {
    return await this.todoItems
      .nth(index)
      .evaluate((el) => el.classList.contains("completed"));
  }

  async getTodosCount(): Promise<number> {
    return await this.todoItems.count();
  }
}
