describe('UI-tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4173/#/');
        cy.viewport(1280, 768);
    });
    //Проверка входа при пустых полях
    //phone - номер телефона
    //password - пароль
    const testWrongData = [
        {
            phone: '',
            password: ''
        }
    ];
    testWrongData.forEach(({ phone, password }) => {
        describe(`Проверка входа при пустых полях`, () => {
            it('Выдает предупреждение', () => {
                cy.get('.cursor-pointer').contains('Войти').click();
                // Ввод данных в форму
                if (phone !== "") cy.get('input[placeholder="Введите номер телефона"]').type(phone);
                if (password !== "") cy.get('input[placeholder="Введите пароль"]').type(password);

                // Авторизация
                cy.get('[role="dialog"]').contains('Войти').click();

                // Проверка на наличие предупреждения
                cy.get('[data-slot="form-message"]')
                    .should('be.visible')
                    .and('contain.text', 'Поле должно быть заполнено');
            });
        });
    });

    describe('Взаимодействие с корзиной', () => {
        it('Добавление товаров в корзину', () => {
            // 2. Берем первое блюдо
            cy.get('[data-slot="card"].product-card', { timeout: 3000 })
                .should('have.length.greaterThan', 0)
                .first()
                .as('firstProduct');

            // 3. Добавляем первое блюдо в корзину
            cy.get('@firstProduct').within(() => {
                cy.get('button')
                    .contains('Добавить в корзину')
                    .click();

                // 4. Проверяем что товар добавился (счетчик блюда должен увеличиться)
                cy.get('p.dish-counter', { timeout: 3000 })
                    .should('be.visible')
                    .and('contain.text', '1');
            });

            // 5. Добавляем еще один товар (например, второй в списке)
            cy.get('[data-slot="card"].product-card')
                .eq(1)
                .within(() => {
                    cy.get('button')
                        .contains('Добавить в корзину')
                        .click();

                    // 6. Проверяем что товар добавился (счетчик корзины блюда увеличиться)
                    cy.get('p.dish-counter', { timeout: 3000 })
                        .should('be.visible')
                        .and('contain.text', '1');
                });

            // 7. Переходим в корзину
            cy.get('a[href="#/basket"]').click();

            // 8. Проверяем содержимое корзины
            cy.url().should('include', '/basket');
            cy.get('div.dish-into-basket', { timeout: 3000 }).should('have.length', 2);

            // 9. Проверяем общую сумму
            cy.get('p.total-price')
                .should('be.visible')
                .and('contain.text', '₽');
        });

        it('Удаление товаров из корзины', () => {
            // Добавляем товары
            cy.get('[data-slot="card"].product-card', { timeout: 5000 })
                .should('have.length.greaterThan', 0)
                .first()
                .as('firstProduct');

            cy.get('@firstProduct').within(() => {
                cy.get('button')
                    .contains('Добавить в корзину')
                    .click();

                // 4. Проверяем что товар добавился (счетчик блюда должен увеличиться)
                cy.get('p.dish-counter', { timeout: 3000 })
                    .should('be.visible')
                    .and('contain.text', '1');
            });

            // Переходим в корзину
            cy.get('a[href="#/basket"]').click();

            // Ждем загрузки корзины
            cy.url().should('include', '/basket');
            cy.get('div.dish-into-basket', { timeout: 3000 }).should('have.length', 1).as('cartItem');

            // Удаляем товар
            cy.get('@cartItem').within(() => {
                cy.get('button')
                    .contains('Удалить блюдо')
                    .click();
            });

            // Проверяем что корзина пуста
            cy.get('p.empty-text-message')
                .should('be.visible')
                .and('contain.text', 'Корзина пуста');
        });
    });

    const testMakingOrder = [
        {
            address: 'Ленина 973',
            phoneNumber: '88005553538',
            password: 'password123',
            paymentMethod: 'Картой на сайте',
        }
    ];

    describe('Оформление заказа', () => {
        testMakingOrder.forEach(({address, phoneNumber, password, paymentMethod,}) => {
            it('Оформление заказа с данными', () => {
                // Добавляем товары
                cy.get('[data-slot="card"].product-card', { timeout: 5000 })
                    .should('have.length.greaterThan', 0)
                    .first()
                    .as('firstProduct');

                cy.get('@firstProduct').within(() => {
                    cy.get('button')
                        .contains('Добавить в корзину')
                        .click();

                    // 4. Проверяем что товар добавился (счетчик блюда должен увеличиться)
                    cy.get('p.dish-counter', { timeout: 3000 })
                        .should('be.visible')
                        .and('contain.text', '1');
                });

                // Переходим в корзину
                cy.get('a[href="#/basket"]').click();

                // Ждем загрузки корзины
                cy.url().should('include', '/basket');
                cy.get('div.dish-into-basket', { timeout: 3000 }).should('have.length', 1);

                // Заполняем поля
                if (address !== "") cy.get('input[placeholder="Введите адрес доставки"]').type(address);
                if (phoneNumber !== "") cy.get('input[placeholder="Введите номер телефона"]').type(phoneNumber);
                if (password !== "") cy.get('input[placeholder="Введите пароль"]').type(password);
                if (paymentMethod !== "") {
                    cy.get('button[role="combobox"]').click();
                    cy.get('[data-slot="select-content"]', { timeout: 5000 }).should('be.visible');
                    cy.get(`[data-slot="select-item"]`).contains(paymentMethod).should('be.visible').click();
                    cy.get('button[role="combobox"]').should('not.contain', 'Выберите способ оплаты');
                }

                cy.get('button').contains('Оформить заказ').click();

                cy.get('#succest-making-order-dialog').should('exist').and('be.visible');
            })
        })
    })
})