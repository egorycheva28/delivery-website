describe('UI-tests', () => {
    beforeEach(() => {
        cy.visit('https://egorycheva28.github.io/delivery-website/#/');
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
                cy.get('input[placeholder="Введите номер телефона"]').type(phone);
                cy.get('input[placeholder="Введите пароль"]').type(password);

                // Авторизация
                cy.contains('Войти').click();

                // Проверка на наличие предупреждения
                cy.get('.text-red-600').should('be.visible').and('contain.text', 'Поле должно быть заполнено');
            });
        });
    });
})