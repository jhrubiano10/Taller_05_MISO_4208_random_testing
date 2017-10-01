describe('Los estudiantes under monkeys - Random Buttons', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        randomClickButton(10);
    })
})
function randomClickButton(monkeysLeft) {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    if(monkeysLeft > 0) {
        cy.get('button').then($buttons => {
            var randomButton = $buttons.get(getRandomInt(0, $buttons.length));
            if(!Cypress.Dom.isHidden(randomButton)) {
                cy.wrap(randomButton).click({force: true});
                monkeysLeft--;
            }
            setTimeout(randomClickButton, 1000, monkeysLeft);
        });
    }
}