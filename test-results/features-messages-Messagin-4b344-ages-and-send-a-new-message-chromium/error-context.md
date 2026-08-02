# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: features/messages.spec.ts >> Messaging Feature >> should load conversation list and messages, and send a new message
- Location: tests/e2e/features/messages.spec.ts:106:7

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "http://localhost:3000/candidates/dashboard/messages", waiting until "domcontentloaded"

```

# Test source

```ts
  3   | test.describe('Messaging Feature', () => {
  4   |   const dummyConversations = [
  5   |     {
  6   |       id: 'conv-1',
  7   |       candidateId: 'user-1',
  8   |       recruiterId: 'recruiter-1',
  9   |       company: { id: 'comp-1', name: 'TechNova Inc.', logoUrl: '' },
  10  |       messages: [
  11  |         {
  12  |           id: 'msg-1',
  13  |           content: 'Hello, are you still interested?',
  14  |           type: 'TEXT',
  15  |           createdAt: new Date().toISOString(),
  16  |           senderId: 'recruiter-1'
  17  |         }
  18  |       ],
  19  |       _count: { messages: 1 }
  20  |     }
  21  |   ];
  22  | 
  23  |   const dummyMessages = [
  24  |     {
  25  |       id: 'msg-1',
  26  |       content: 'Hello, are you still interested?',
  27  |       type: 'TEXT',
  28  |       createdAt: new Date().toISOString(),
  29  |       senderId: 'recruiter-1',
  30  |       conversationId: 'conv-1'
  31  |     }
  32  |   ];
  33  | 
  34  |   test.beforeEach(async ({ page, context }) => {
  35  |     // Set localStorage to simulate logged-in user
  36  |     await context.addInitScript(() => {
  37  |       window.localStorage.setItem('AuthStore', JSON.stringify({
  38  |         state: {
  39  |           user: { id: 'user-1', firstName: 'Jane', lastName: 'Doe', role: 'CANDIDATE' },
  40  |           isAuthenticated: true,
  41  |           activeRole: 'candidate'
  42  |         },
  43  |         version: 0
  44  |       }));
  45  |       window.localStorage.setItem('accessToken', 'dummy-token');
  46  |     });
  47  | 
  48  |     // Mock API endpoints
  49  |     await page.route('**/messages/conversations', async (route) => {
  50  |       await route.fulfill({
  51  |         status: 200,
  52  |         contentType: 'application/json',
  53  |         body: JSON.stringify({ success: true, data: dummyConversations })
  54  |       });
  55  |     });
  56  | 
  57  |     await page.route('**/messages/conversations/conv-1/messages', async (route) => {
  58  |       if (route.request().method() === 'GET') {
  59  |         await route.fulfill({
  60  |           status: 200,
  61  |           contentType: 'application/json',
  62  |           body: JSON.stringify({ success: true, data: dummyMessages })
  63  |         });
  64  |       } else {
  65  |         await route.continue();
  66  |       }
  67  |     });
  68  | 
  69  |     await page.route('**/messages/conversations/conv-1/read', async (route) => {
  70  |       await route.fulfill({
  71  |         status: 200,
  72  |         contentType: 'application/json',
  73  |         body: JSON.stringify({ success: true })
  74  |       });
  75  |     });
  76  | 
  77  |     await page.route('**/messages/conversations/conv-1/messages', async (route) => {
  78  |       if (route.request().method() === 'POST') {
  79  |         const postData = JSON.parse(route.request().postData() || '{}');
  80  |         await route.fulfill({
  81  |           status: 201,
  82  |           contentType: 'application/json',
  83  |           body: JSON.stringify({
  84  |             success: true,
  85  |             data: {
  86  |               id: 'msg-2',
  87  |               content: postData.content,
  88  |               type: 'TEXT',
  89  |               createdAt: new Date().toISOString(),
  90  |               senderId: 'user-1',
  91  |               conversationId: 'conv-1'
  92  |             }
  93  |           })
  94  |         });
  95  |       }
  96  |     });
  97  | 
  98  |     // Mock Socket.IO to prevent connection errors in tests
  99  |     await page.route('**/socket.io/**', async (route) => {
  100 |       await route.fulfill({ status: 200, body: 'ok' });
  101 |     });
  102 | 
> 103 |     await page.goto('/candidates/dashboard/messages', { waitUntil: 'domcontentloaded', timeout: 60000 });
      |                ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  104 |   });
  105 | 
  106 |   test('should load conversation list and messages, and send a new message', async ({ page }) => {
  107 |     // 1. Verify Conversation List Renders
  108 |     await expect(page.locator('text=TechNova Inc.')).toBeVisible();
  109 |     await expect(page.locator('text=Hello, are you still interested?').first()).toBeVisible();
  110 | 
  111 |     // 2. Click the conversation to load messages
  112 |     await page.locator('text=TechNova Inc.').click();
  113 | 
  114 |     // Wait for the active chat area to display
  115 |     await expect(page.locator('h2').filter({ hasText: 'TechNova Inc.' })).toBeVisible();
  116 |     
  117 |     // The previous message should be in the chat area
  118 |     // 'first()' or similar might be needed if it appears in both sidebar and main area,
  119 |     // so we can look inside the chat area container.
  120 |     const chatArea = page.locator('.flex-1.flex.flex-col').last();
  121 |     await expect(chatArea.locator('text=Hello, are you still interested?')).toBeVisible();
  122 | 
  123 |     // 3. Send a new message
  124 |     const messageInput = page.getByPlaceholder('Write a message...');
  125 |     await messageInput.fill('Yes, I am available for an interview.');
  126 |     await messageInput.press('Enter');
  127 | 
  128 |     // 4. Verify optimistic UI update
  129 |     await expect(chatArea.locator('text=Yes, I am available for an interview.')).toBeVisible();
  130 |     
  131 |     // Take a screenshot of the results
  132 |     await page.screenshot({ path: 'tests/e2e/artifacts/messages-chat.png', fullPage: true });
  133 |   });
  134 | });
  135 | 
```