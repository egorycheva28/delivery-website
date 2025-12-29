describe('UI-tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4173/#/');
        cy.viewport(1280, 768);
    });
    //Проверка входа при пустых полях
    //phone - номер телефона
    //password - пароль
    describe(`Проверка входа при пустых полях`, () => {
        it('Выдает предупреждение', () => {
            cy.get('.cursor-pointer').contains('Войти').click();

            // Авторизация
            cy.get('[role="dialog"]').contains('Войти').click();

            // Проверка на наличие предупреждения
            cy.get('[data-slot="form-message"]')
                .should('be.visible')
                .and('contain.text', 'Поле должно быть заполнено');
        });
    });

    const testLoginData = [
        {
            phone: '88005553538',
            password: 'password123'
        }
    ];
    describe(`Проверка входа`, () => {
        testLoginData.forEach(({ phone, password }) => {
            it('Проверка данных пользователя при авторизации', () => {
                cy.get('button.cursor-pointer').contains('Войти').click();

                // Проверяем, что модальное окно открылось
                cy.get('[role="dialog"]').should('be.visible');

                // Ввод данных в форму
                if (phone !== "") cy.get('input[placeholder="Введите номер телефона"]').type(phone);
                if (password !== "") cy.get('input[placeholder="Введите пароль"]').type(password);

                // Авторизация
                cy.get('[role="dialog"]').contains('Войти').click();

                // Проверяем, что модальное окно исчезло
                cy.get('[role="dialog"]').should('not.exist');
            })
        })
    })

    describe('Взаимодействие с корзиной', () => {
        it('Добавление товаров в корзину', () => {
            // Берем первое блюдо
            cy.get('[data-slot="card"].product-card', { timeout: 3000 })
                .should('have.length.greaterThan', 0)
                .first()
                .as('firstProduct');

            // Добавляем первое блюдо в корзину
            cy.get('@firstProduct').within(() => {
                cy.get('button')
                    .contains('Добавить в корзину')
                    .click();

                // Проверяем что товар добавился (счетчик блюда должен увеличиться)
                cy.get('p.dish-counter', { timeout: 3000 })
                    .should('be.visible')
                    .and('contain.text', '1');
            });

            // Добавляем еще один товар (например, второй в списке)
            cy.get('[data-slot="card"].product-card')
                .eq(1)
                .within(() => {
                    cy.get('button')
                        .contains('Добавить в корзину')
                        .click();

                    // Проверяем что товар добавился (счетчик корзины блюда увеличиться)
                    cy.get('p.dish-counter', { timeout: 3000 })
                        .should('be.visible')
                        .and('contain.text', '1');
                });

            // Переходим в корзину
            cy.get('a[href="#/basket"]').click();

            // Проверяем содержимое корзины
            cy.url().should('include', '/basket');
            cy.get('div.dish-into-basket', { timeout: 3000 }).should('have.length', 2);

            // Проверяем общую сумму
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

        it('Удаление всех товаров из корзины', () => {
            cy.get('[data-slot="card"].product-card', { timeout: 3000 })
                .should('have.length.greaterThan', 0)
                .first()
                .as('firstProduct');

            // Добавляем первое блюдо в корзину
            cy.get('@firstProduct').within(() => {
                cy.get('button')
                    .contains('Добавить в корзину')
                    .click();

                // Проверяем что товар добавился (счетчик блюда должен увеличиться)
                cy.get('p.dish-counter', { timeout: 3000 })
                    .should('be.visible')
                    .and('contain.text', '1');
            });

            // Добавляем еще один товар (например, второй в списке)
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

            // Переходим в корзину
            cy.get('a[href="#/basket"]').click();

            cy.get('button.cursor-pointer').contains('Удалить все').click();

            // Проверяем что корзина пуста
            cy.get('p.empty-text-message')
                .should('be.visible')
                .and('contain.text', 'Корзина пуста');
        })

        it('Изменение цены в корзине', () => {
            let initialPrice = '';
            let updatedPrice = '';

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

            cy.get('p.total-price').invoke('text')
                .then((name) => {
                    initialPrice = name.trim();
                });

            // Добавляем товар
            cy.get('@cartItem').within(() => {
                cy.get('button')
                    .contains('+')
                    .click();
            });

            cy.get('p.total-price').invoke('text')
                .then((name) => {
                    updatedPrice = name.trim();

                    // Проверяем что цена изменилась
                    expect(initialPrice).to.not.equal(updatedPrice);
                });
        });
    });

    describe('Проверка недоступных блюд', () => {
        it('Проверка через массив данных', () => {
            // Получаем данные через API
            cy.request('POST', 'http://localhost:8080/api/foods/filter')
                .then((response) => {
                    expect(response.status).to.eq(200);
                    const dishes = response.body;
                    const unavailableDishes = dishes.filter(dish => dish.isAvailable === false);

                    // Для каждого недоступного блюда ищем его карточку по имени
                    unavailableDishes.forEach((dish) => {
                        // Ищем карточку по названию блюда
                        cy.get('[data-slot="card"].product-card')
                            .contains('.text-center.text-xl', dish.name)
                            .parents('[data-slot="card"].product-card')
                            .first()
                            .within(() => {
                                // Проверяем кнопку "Блюдо не доступно"
                                cy.get('button')
                                    .contains('Блюдо не доступно')
                                    .should('exist')
                                    .and('be.visible')
                                    .and('be.disabled');
                            });
                    });

                    // Также проверяем, что у доступных блюд есть кнопка "Добавить в корзину"
                    const availableDishes = dishes.filter(dish => dish.isAvailable === true);
                    if (availableDishes.length > 0) {
                        cy.get('[data-slot="card"].product-card')
                            .contains('.text-center.text-xl', availableDishes[0].name)
                            .parents('[data-slot="card"].product-card')
                            .first()
                            .within(() => {
                                cy.get('button')
                                    .contains('Добавить в корзину')
                                    .should('exist')
                                    .and('be.visible')
                                    .and('not.be.disabled');
                            });
                    }
                });
        });
    })

    describe('Проверка уникальности данных карточек блюд', () => {
        beforeEach(() => {
            cy.get('[data-slot="card"].product-card', {timeout: 10000}).should('have.length.at.least', 2);
        });

        it('Две разные карточки должны иметь разные данные', () => {
            // Получаем данные из первых двух карточек
            const firstCardData = {};
            const secondCardData = {};

            // Собираем данные с первой карточки
            cy.get('[data-slot="card"].product-card').eq(0).within(() => {
                // Название блюда
                cy.get('.text-center.text-xl')
                    .invoke('text')
                    .then((name) => {
                        firstCardData.name = name.trim();
                    });

                // Цена
                cy.get('.absolute.top-0.right-0')
                    .invoke('text')
                    .then((price) => {
                        firstCardData.price = price.trim();
                    });

                // Описание
                cy.get('p.line-clamp-3')
                    .invoke('text')
                    .then((description) => {
                        firstCardData.description = description.trim();
                    });

                // Рейтинг (можно получить по количеству заполненных звезд)
                cy.get('div.absolute.top-0.left-0.overflow-hidden')
                    .then(($stars) => {
                        firstCardData.filledStarsCount = $stars.length;
                    });

                // URL изображения
                cy.get('img')
                    .invoke('attr', 'src')
                    .then((src) => {
                        firstCardData.imageSrc = src;
                    });

                // Статус кнопки (доступно/недоступно)
                cy.get('button').then(($button) => {
                    if ($button.text().includes('Блюдо не доступно')) {
                        firstCardData.isAvailable = false;
                        firstCardData.buttonText = 'Блюдо не доступно';
                    } else {
                        firstCardData.isAvailable = true;
                        firstCardData.buttonText = $button.text().trim();
                    }
                });
            }).then(() => {
                // Собираем данные со второй карточки
                cy.get('[data-slot="card"].product-card').eq(1).within(() => {
                    // Название блюда
                    cy.get('.text-center.text-xl')
                        .invoke('text')
                        .then((name) => {
                            secondCardData.name = name.trim();
                        });

                    // Цена
                    cy.get('.absolute.top-0.right-0')
                        .invoke('text')
                        .then((price) => {
                            secondCardData.price = price.trim();
                        });

                    // Описание
                    cy.get('p.line-clamp-3')
                        .invoke('text')
                        .then((description) => {
                            secondCardData.description = description.trim();
                        });

                    // Рейтинг
                    cy.get('div.absolute.top-0.left-0.overflow-hidden')
                        .then(($stars) => {
                            secondCardData.filledStarsCount = $stars.length;
                        });

                    // URL изображения
                    cy.get('img')
                        .invoke('attr', 'src')
                        .then((src) => {
                            secondCardData.imageSrc = src;
                        });

                    // Статус кнопки
                    cy.get('button').then(($button) => {
                        if ($button.text().includes('Блюдо не доступно')) {
                            secondCardData.isAvailable = false;
                            secondCardData.buttonText = 'Блюдо не доступно';
                        } else {
                            secondCardData.isAvailable = true;
                            secondCardData.buttonText = $button.text().trim();
                        }
                    });
                }).then(() => {
                    // Проверяем, что данные разные
                    cy.log('Данные первой карточки:', firstCardData);
                    cy.log('Данные второй карточки:', secondCardData);

                    // Основная проверка: названия должны быть разные
                    expect(firstCardData.name).to.not.equal(secondCardData.name);

                    // Дополнительные проверки (не обязательные, но желательные)
                    // Проверяем, что цены могут быть одинаковые (это нормально)
                    // Но хотя бы одно из полей должно отличаться
                    const areDifferent =
                        firstCardData.name !== secondCardData.name ||
                        firstCardData.price !== secondCardData.price ||
                        firstCardData.description !== secondCardData.description ||
                        firstCardData.imageSrc !== secondCardData.imageSrc;

                    expect(areDifferent).to.be.true;

                    // Логируем различия
                    if (firstCardData.name !== secondCardData.name) {
                        cy.log(`Разные названия: "${firstCardData.name}" и "${secondCardData.name}"`);
                    }
                    if (firstCardData.price !== secondCardData.price) {
                        cy.log(`Разные цены: "${firstCardData.price}" и "${secondCardData.price}"`);
                    }
                    if (firstCardData.description !== secondCardData.description) {
                        cy.log('Разные описания');
                    }
                    if (firstCardData.imageSrc !== secondCardData.imageSrc) {
                        cy.log('Разные изображения');
                    }
                });
            });
        });
    })

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

    describe('Проверка недоступности оценки для блюд с couldRate = false', () => {
        it('Найти первое блюдо с couldRate = false и проверить его', () => {
            let foundNonRatableDish = false;
            let checkedCount = 0;
            const maxChecks = 5;

            function checkDish(index) {
                if (index >= maxChecks || foundNonRatableDish) return;

                cy.visit('http://localhost:4173/#/');

                cy.intercept('GET', '**/api/foods/*').as('getDishDetails');

                cy.get('[data-slot="card"].product-card').eq(index).then(($card) => {
                    // Получаем название блюда из карточки
                    cy.wrap($card).within(() => {
                        cy.get('.text-center.text-xl').invoke('text').as('dishName');
                    });

                    // Кликаем на карточку
                    cy.wrap($card).find('a.cursor-pointer').click();

                    cy.wait('@getDishDetails').then((interception) => {
                        const dish = interception.response.body;
                        checkedCount++;

                        if (dish.couldRate === false) {
                            foundNonRatableDish = true;
                            cy.log(`Найдено блюдо без возможности оценки: "${dish.name}"`);

                            // Проверяем интерфейс
                            cy.get('button')
                                .contains('Поставить оценку блюду')
                                .should('not.exist');
                        } else {
                            cy.log(`Блюдо "${dish.name}" доступно для оценки, проверяем следующее...`);
                            checkDish(index + 1);
                        }
                    });
                });
            }

            // Начинаем проверку с первого блюда
            checkDish(0);

            // После всех проверок
            cy.then(() => {
                if (!foundNonRatableDish) {
                    cy.log(`Проверено ${checkedCount} блюд, все доступны для оценки`);
                }
            });
        });
    })

    describe('Проверка сохранения сортировок при добавлении новых', () => {
        it('Сортировка по цене сохраняется при выборе категории', () => {
            // 1. Выбираем сортировку по цене (возрастание)
            cy.get('button[role="combobox"]').eq(1).click();
            cy.get('[data-slot="select-content"]')
                .find('[data-slot="select-item"]')
                .eq(2)
                .click();

            // 2. Выбираем категорию
            cy.get('button[role="combobox"]').eq(0).click();
            cy.get('[data-slot="select-content"]')
                .find('[data-slot="select-item"]')
                .eq(1)
                .click();

            // 3. Проверяем, что сортировка по цене осталась
            cy.get('button[role="combobox"]')
                .contains('Цена')
                .should('exist');

            // 4. Проверяем, что цены по-прежнему отсортированы по возрастанию
            let previousPrice =  Infinity;
            cy.get('[data-slot="card"].product-card').each(($card) => {
                cy.wrap($card).within(() => {
                    cy.get('.absolute.top-0.right-0')
                        .invoke('text')
                        .then((priceText) => {
                            const price = parseInt(priceText.replace('₽', '').trim());
                            expect(price).to.be.at.most(previousPrice);
                            previousPrice = price;
                        });
                });
            });
        });

        it('Фильтр поиска сохраняется при сортировке', () => {
            const searchTerm = 'Салат';

            // 1. Вводим поисковый запрос
            cy.get('input[placeholder="Поиск..."]').type(searchTerm);
            cy.wait(500);

            // 2. Выбираем сортировку по рейтингу
            cy.get('button[role="combobox"]').eq(1).click();
            cy.get('[data-slot="select-content"]')
                .contains('[data-slot="select-item"]', 'Рейтинг')
                .first()
                .click();

            // 3. Проверяем, что поисковый запрос остался в поле
            cy.get('input[placeholder="Поиск..."]')
                .should('have.value', searchTerm);

            // 4. Проверяем, что отображаются только блюда с поисковым запросом
            cy.get('[data-slot="card"].product-card').each(($card) => {
                cy.wrap($card).within(() => {
                    cy.get('.text-center.text-xl')
                        .invoke('text')
                        .should('include', searchTerm);
                });
            });
        });

        it('Комбинирование фильтров: поиск + категория + сортировка', () => {
            const searchTerm = 'Куриная грудка';

            // 1. Поиск
            cy.get('input[placeholder="Поиск..."]').type(searchTerm);
            cy.wait(500);

            // 2. Категория
            cy.get('button[role="combobox"]').eq(0).click();
            cy.get('[data-slot="select-content"]')
                .find('[data-slot="select-item"]')
                .eq(1)
                .click();

            // 3. Сортировка
            cy.get('button[role="combobox"]').eq(1).click();
            cy.get('[data-slot="select-content"]')
                .contains('[data-slot="select-item"]', 'Рейтинг')
                .last() // убывание рейтинга
                .click();

            // 4. Проверяем все фильтры
            cy.get('input[placeholder="Поиск..."]')
                .should('have.value', searchTerm);

            cy.get('button[role="combobox"]')
                .contains('Рейтинг')
                .should('exist');

            // Проверяем, что все блюда соответствуют поиску
            cy.get('[data-slot="card"].product-card').each(($card) => {
                cy.wrap($card).within(() => {
                    cy.get('.text-center.text-xl')
                        .invoke('text')
                        .should('include', searchTerm);
                });
            });
        });

        it('Сброс всех фильтров', () => {
            // Устанавливаем несколько фильтров
            cy.get('input[placeholder="Поиск..."]').type('Тест');
            cy.wait(500);

            cy.get('button[role="combobox"]').eq(1).click();
            cy.get('[data-slot="select-content"]')
                .contains('[data-slot="select-item"]', 'Цена')
                .first()
                .click();

            // Сбрасываем поиск
            cy.get('input[placeholder="Поиск..."]').clear();
            cy.wait(500);

            // Сбрасываем сортировку
            cy.get('button[role="combobox"]').eq(1).click();
            cy.get('[data-slot="select-content"]')
                .contains('[data-slot="select-item"]', 'Без сортировки')
                .click();

            // Проверяем сброс
            cy.get('input[placeholder="Поиск..."]')
                .should('have.value', '');

            cy.get('button[role="combobox"]')
                .contains('Без сортировки')
                .should('exist');
        });
    });
})