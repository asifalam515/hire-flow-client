import { test, expect } from '@playwright/test';

test.describe('Messaging Feature', () => {
  const dummyConversations = [
    {
      id: 'conv-1',
      candidateId: 'user-1',
      recruiterId: 'recruiter-1',
      company: { id: 'comp-1', name: 'TechNova Inc.', logoUrl: '' },
      messages: [
        {
          id: 'msg-1',
          content: 'Hello, are you still interested?',
          type: 'TEXT',
          createdAt: new Date().toISOString(),
          senderId: 'recruiter-1'
        }
      ],
      _count: { messages: 1 }
    }
  ];

  const dummyMessages = [
    {
      id: 'msg-1',
      content: 'Hello, are you still interested?',
      type: 'TEXT',
      createdAt: new Date().toISOString(),
      senderId: 'recruiter-1',
      conversationId: 'conv-1'
    }
  ];

  test.beforeEach(async ({ page, context }) => {
    // Set localStorage to simulate logged-in user
    await context.addInitScript(() => {
      window.localStorage.setItem('AuthStore', JSON.stringify({
        state: {
          user: { id: 'user-1', firstName: 'Jane', lastName: 'Doe', role: 'CANDIDATE' },
          isAuthenticated: true,
          activeRole: 'candidate'
        },
        version: 0
      }));
      window.localStorage.setItem('accessToken', 'dummy-token');
    });

    // Mock API endpoints
    await page.route('**/messages/conversations', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, data: dummyConversations })
      });
    });

    await page.route('**/messages/conversations/conv-1/messages', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, data: dummyMessages })
        });
      } else {
        await route.continue();
      }
    });

    await page.route('**/messages/conversations/conv-1/read', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      });
    });

    await page.route('**/messages/conversations/conv-1/messages', async (route) => {
      if (route.request().method() === 'POST') {
        const postData = JSON.parse(route.request().postData() || '{}');
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            data: {
              id: 'msg-2',
              content: postData.content,
              type: 'TEXT',
              createdAt: new Date().toISOString(),
              senderId: 'user-1',
              conversationId: 'conv-1'
            }
          })
        });
      }
    });

    // Mock Socket.IO to prevent connection errors in tests
    await page.route('**/socket.io/**', async (route) => {
      await route.fulfill({ status: 200, body: 'ok' });
    });

    await page.goto('/candidates/dashboard/messages', { waitUntil: 'domcontentloaded', timeout: 60000 });
  });

  test('should load conversation list and messages, and send a new message', async ({ page }) => {
    // 1. Verify Conversation List Renders
    await expect(page.locator('text=TechNova Inc.')).toBeVisible();
    await expect(page.locator('text=Hello, are you still interested?').first()).toBeVisible();

    // 2. Click the conversation to load messages
    await page.locator('text=TechNova Inc.').click();

    // Wait for the active chat area to display
    await expect(page.locator('h2').filter({ hasText: 'TechNova Inc.' })).toBeVisible();
    
    // The previous message should be in the chat area
    // 'first()' or similar might be needed if it appears in both sidebar and main area,
    // so we can look inside the chat area container.
    const chatArea = page.locator('.flex-1.flex.flex-col').last();
    await expect(chatArea.locator('text=Hello, are you still interested?')).toBeVisible();

    // 3. Send a new message
    const messageInput = page.getByPlaceholder('Write a message...');
    await messageInput.fill('Yes, I am available for an interview.');
    await messageInput.press('Enter');

    // 4. Verify optimistic UI update
    await expect(chatArea.locator('text=Yes, I am available for an interview.')).toBeVisible();
    
    // Take a screenshot of the results
    await page.screenshot({ path: 'tests/e2e/artifacts/messages-chat.png', fullPage: true });
  });
});
