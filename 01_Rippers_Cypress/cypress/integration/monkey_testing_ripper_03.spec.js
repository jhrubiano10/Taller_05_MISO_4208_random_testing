describe('Los estudiantes under monkeys - Random Selects', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        cy.contains('Ingresar').click();
        cy.wait(2000);
        randomOptions(10);
    })
})
function randomOptions(monkeysLeft) {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    if(monkeysLeft > 0) {
        cy.get('.cajaSignUp select').then($selects => {
            var randomSelect = $selects.get(getRandomInt(0, $selects.length));
            var valueTypeSelector = randomSelect[randomSelect.id !== "" ? "id" : "name"];
            var typeSelector = randomSelect.id !== "" ? "id" : "name";
            cy.get(`select[${typeSelector}=${valueTypeSelector}]`).then(($option) => {
                let size = Cypress.$(`select[${typeSelector}=${valueTypeSelector}] > option`).size();
                let option = Cypress.$(`select[${typeSelector}=${valueTypeSelector}] > option:eq(${getRandomInt(0, size)})`).val();
                if(option !== "--------------------") {
                    cy.get(`select[${typeSelector}=${valueTypeSelector}]`).select(option);
                    monkeysLeft--;
                }
                setTimeout(randomOptions, 1000, monkeysLeft);
            });            
        });
    }
}