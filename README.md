# todomvc-qa-automation
QA Automation tests for TodoMVC using TypeScript and Playwright Home task implementation with STD documentation and E2E tests

# Software Test Document (STD) - TodoMVC Application

Application Information

 - Application Name: TodoMVC - Application
 - URL: [https://todomvc.com/examples/preact/dist/](https://todomvc.com/examples/preact/dist/)
 - Type of Testing: Functional & End-to-End Testing

---

> TS-1: Add a New Task

Objective

Verify the functionality of adding new tasks to the todo list, ensuring proper data persistence and UI updates.

Test Steps

1. Go to the TodoMVC application URL
2. Find the main input field (placeholder: "What needs to be done?")
3. Fill in the input field with the text "Buy groceries"
4. Press the Enter key to submit the task
5. Check to see the task in the list
 
Expected Results

- The task "Buy groceries" is the first item of the todo list
- The task counter at the bottom updates to show "1 item left"
- The input field clears and is ready for new input
- The task shows with an empty checkbox, incomplete state
- The footer section appears (in case it was previously hidden) 

Notes & Edge Cases

- Test with empty input (should not create task)
- Test with very long task descriptions
- Test with special characters in task text
- Check if the input field values persist after refreshing the page

---  

> TS-2: Marking Task as Complete

Objective

Test the functionality of completing tasks and manage the state accordingly everywhere in the app.  

Test Steps
  
1. Add the new task "Read documentation" to the list.
2. Click the circular checkbox to the left of the task
3. Observe the visual changes to the task item
4. Check the task counter update
5. Switch to "Completed" filter view

Expected Results

- The task appears with strike-through text formatting
- The checkbox shows a checkmark state (✓)
- The task counter goes down to "0 items left."
- The task shows up in the "Completed" filter view
- The task disappears from the "Active" filter view
- The "Clear completed" button becomes visible 

Notes & Edge Cases

- Test clearing a completed task returns it to active
- Test with multiple tasks in different completion states
- Verify counter accuracy across mixed states of tasks
- Check persistence of completion state after page refresh 

---  

> TS-3: Deleting a Task

Objective

Ensure the user can permanently remove tasks from the list with proper UI feedback and state updates.

Test Steps

1. Add a task "Temporary task" to the list
2. Hover over a task item to show the delete button
3. Click the red "X" button on the right side of the task
4. Check if the task has been removed from the interface.
5. Check the task counter update

Expected Results  

- The task is completely removed from the to-do list
- The task counter updates to reflect the removal
- The task does not appear in any filter view: All/Active/Completed
- The Delete button appears only on hover, not always visible.
- No error or console messages display when deleting

Notes & Edge Cases

- Test deleting the only task on the list
- Test deleting a completed task versus an active task
- Check Delete button visibility conditions
- Test rapid consecutive deletions
- Verify the list behavior once all tasks have been deleted

---  

> TS-4: Task Filtering and View Management

Objective  

Verify that filtering behaves properly by categorizing the tasks into finished versus unfinished and then displaying them appropriately.

Test Steps

1. Add three tasks: "Active Task 1", "Active Task 2", "Complete Task"
2. Mark "Complete Task" as complete using its checkbox
3. Click the "Active" filter button
4. Click the "Completed" filter button
5. Return to the "All" filter view
6. Task count verification in every view

Expected Results
  
- All Filter: shows all 3 tasks
- Active Filter: Shows only "Active Task 1" and "Active Task 2"
- Completed Filter: Shows only "Complete Task"
- Task counter always displays "2 items left" regardless of the view
- Filter buttons maintain proper active state styling
- State of task completion is kept when toggling filters

Notes & Edge Cases

- Test filtering with empty states (no active/no completed tasks)
- Verify URL updates with filter parameters (/#/active, /#/completed)
- Test filter persistence after refreshing the page
- Confirm filter behavior with mixed task states
- Check filter responsiveness with large task lists
  
---

## Test Automation Implementation

### Selected Scenarios for Automation:

**Test Scenario 1:** Adding a New Task

**Test Scenario 2:** Marking Task as Completed

### Technology Stack:

- **Language:** TypeScript
- **Framework:** Playwright
- **Pattern:** Page Object Model

### Key Features:

- Multi-browser testing (Chrome, Firefox, Safari)
- HTML reporting
- Parallel test execution
- Type-safe selectors and assertions

### File Structure:

```
todo-qa-automation-ts/
├── tests/
│   └── todomvc.spec.ts          # Test implementations
├── pages/
│   └── todo-page.ts             # Page Object Model
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies
└── README.md                    # Setup and run instructions
```

### Test Coverage:

✅ Adding single and multiple tasks

✅ Completing tasks and verifying state changes

✅ Task counter validation

✅ Task text verification

✅ Multi-browser compatibility

---

## Setup and Run Instructions

### Prerequisites:

- Node.js (v18 or higher)
- pnpm package manager

### Installation:

1. Clone the repository:
```bash
git clone https://github.com/dimagrotser/todomvc-qa-automation.git
cd todomvc-qa-automation
```

2. Install dependencies:
```bash
pnpm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

### Running Tests:

**Run all tests in headless mode:**
```bash
pnpm test
```

**Run tests in headed mode (visible browser):**
```bash
pnpm run test:headed
```

**View test report:**
```bash
pnpm run test:report
```

### Additional Commands:

**Run tests in a specific browser:**
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

**Run tests in debug mode:**
```bash
npx playwright test --debug
```

**Run specific test file:**
```bash
npx playwright test tests/todomvc.spec.ts
```

### Test Reports:

- HTML reports are automatically generated in the `playwright-report/` directory
- Test results are stored in the `test-results/` directory
- Open the report with `pnpm run test:report` to view detailed test execution results

---  