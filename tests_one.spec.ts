import { test, expect, Page, Locator } from '@playwright/test';

interface Elements {       //определяет, какие свойства и методы должен иметь объект, а также их типы
    locator: (page: Page) => Locator;
    name: string;
    text: string;
    attribute: {
        type: string;
        value: string;
    };
}

const elements = [    //Иттерация
    {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Playwright logo Playwright' }), // Объявили перем елементс, которой присвоили ссылку на иттерированный объект
        name: 'Playwright logo link',
        text: 'Playwright',
        attribute: {
            type: 'href',
            value: '/',
        }
    },
    {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }), // Объявили перем елементс, которой присвоили ссылку на иттерированный объект
        name: 'Docs link',
        text: 'Docs',
        attribute: {
            type: 'href',
            value: '/docs/intro',
        }
    },
    {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }), // Объявили перем елементс, которой присвоили ссылку на иттерированный объект
        name: 'API link',
        text: 'API',
        attribute: {
            type: 'href',
            value: '/docs/api/class-playwright',
        }  
    },
    {
        locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }), // Объявили перем елементс, которой присвоили ссылку на иттерированный объект
        name: 'Node.js button',
        text: 'Node.js',
    },
    {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Community' }), // Объявили перем елементс, которой присвоили ссылку на иттерированный объект
        name: 'Community link',
        text: 'Community',
        attribute: {
            type: 'href',
            value: '/community/welcome',
        }
    },
    {
        locator: (page: Page): Locator => page.getByLabel('GitHub repository'), // Объявили перем елементс, которой присвоили ссылку на иттерированный объект
        name: 'GitHub icon',
        attribute: {
            type: 'href',
            value: 'https://github.com/microsoft/playwright',
        }
    },
    {
        locator: (page: Page): Locator => page.getByLabel('Discord server'), // Объявили перем елементс, которой присвоили ссылку на иттерированный объект
        name: 'Discord icon',
        attribute: {
            type: 'href',
            value: 'https://aka.ms/playwright/discord',
        }
    },
    {
        locator: (page: Page): Locator => page.getByLabel('Switch between dark and light'), // Объявили перем елементс, которой присвоили ссылку на иттерированный объект
        name: 'Lightmode icon',
    },
    {
        locator: (page: Page): Locator => page.getByLabel('Search (Command+K)'), // Объявили перем елементс, которой присвоили ссылку на иттерированный объект
        name: 'Search input',    
    },

]

test.describe('Тесты главной страницы', () =>{
    test.beforeEach(async ({page}) =>{        //Создание хука для перехода на гл страницу для всех тестов в describe
        await page.goto('https://playwright.dev/');
    });

    test('Проверка отображения элементов новигации хедер', async ({ page }) => {
        elements.forEach(({ locator, name }) => {                                         // Передаем локатор из elements
            test.step(`Проверка отображения элемента ${name}`, async () => {           // (Для динамического формирования тайтла) Для каждой итеррации используем уникальное значение name из elements
                await expect.soft(locator(page)).toBeVisible();   //Если не будет работать, то добавить { timeout: 5000 }
            });
        });
      });
      
      test('Проверка наименования элементов новигации хедер', async ({ page }) => {
        elements.forEach(({ locator, name, text }) => { 
            if (text) {
                test.step(`Проверка названия элемента ${name}`, async () => {         
                    await expect.soft(locator(page)).toContainText(text);   
                });        
            }  
        });
      });
      
      test('Проверка атрибута href элементов новигации хедер', async ({ page }) => {
        elements.forEach(({ locator, name, attribute }) => { 
            if (attribute) {
                test.step(`Проверка атрибута href элемента ${name}`, async () => {         
                    await expect.soft(locator(page)).toHaveAttribute(attribute?.type, attribute?.value);   
                });        
            }  
        });
      });
      
      test('Проверка переключения лайт модал', async ({ page }) => {
          await page.getByLabel('Switch between dark and light').click();
          await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'dark');
      });
      
      test('Проверка заголовка страницы', async ({ page }) => {
          await expect.soft(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
          await expect.soft(page.getByRole('heading', { name: 'Playwright enables reliable' })).toContainText('Playwright enables reliable end-to-end testing for modern web apps.');
      });
      
      test('Проверка кнопки "Get started"', async ({ page }) => {
          await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
          await expect.soft(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');
          await expect.soft(page.getByRole('link', { name: 'Get started' })).toHaveAttribute('href', '/docs/intro');
      });
});


//.soft - мягкое утверждение для проверок, те если одина проверка упала, то все сл проверки все равно пройдут тест
//.step — это метод Playwright, который позволяет логически группировать действия внутри теста и добавлять в отчёт информацию о каждом этапе
