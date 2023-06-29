const successData = require('../fixtures/successData.json')
const titleData = require('../fixtures/titleData.json')

describe('test form success submit', () => {
    it('open page', () => {
        cy.visit('/')

        const stub = cy.stub()

        cy.on('window:alert', stub)

        cy.isPageOpen()

        cy.setTextField(titleData.why_choose, 'why_choose', successData.why_choose)
        cy.clickNext()

        cy.setTextField(titleData.phone, 'phone', successData.phone)
        cy.clickNext()

        cy.setAddressField(titleData.address, 'address', successData.address)
        cy.clickNext()

        cy.setBoolField(titleData.is_main_bank, 'is_main_bank', successData.is_main_bank)
        cy.clickNext()

        cy.setTextField(titleData.main_bank_why, 'main_bank_why', successData.main_bank_why)
        cy.clickNext()

        cy.setBoolField(titleData.is_investment, 'is_investment', successData.is_investment)
        cy.clickNext()

        cy.setBoolField(titleData.is_investment_plan, 'is_investment_plan', successData.is_investment_plan)
        cy.clickBack()

        cy.setBoolField(titleData.is_investment, 'is_investment', !successData.is_investment)
        cy.clickNext()

        cy.setTextField(titleData.investment_prefer, 'investment_prefer', successData.investment_prefer)

        cy.clickFinish()
        cy.isFinish()


    })
})