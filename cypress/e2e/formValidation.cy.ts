const successData = require('../fixtures/successData.json')
const titleData = require('../fixtures/titleData.json')
const errorData = require('../fixtures/errorData.ts').default

/// <reference types="cypress" />

describe('test form validation', () => {
    it('open page', () => {
        cy.visit('/')

        const stub = cy.stub()
        const clearField = true

        cy.on('window:alert', stub)

        cy.isPageOpen()

        errorData.why_choose.forEach(element => {
            cy.setTextField(titleData.why_choose, 'why_choose', element.value, element.error, clearField)
        })

        cy.setTextField(titleData.why_choose, 'why_choose', successData.why_choose)
        cy.clickNext()


        errorData.phone.forEach(element => {
            cy.setTextField(titleData.phone, 'phone', element.value, element.error, clearField)
        })

        cy.setTextField(titleData.phone, 'phone', successData.phone)
        cy.clickNext()


        errorData.address.forEach(element => {
            cy.setAddressField(titleData.address, 'address', element.value, element.error, clearField)
        })

        cy.setAddressField(titleData.address, 'address', successData.address)
        cy.clickNext()


        errorData.is_main_bank.forEach(element => {
            cy.setBoolField(titleData.is_main_bank, 'is_main_bank', element.value, element.error, clearField)
        })

        cy.setBoolField(titleData.is_main_bank, 'is_main_bank', successData.is_main_bank)
        cy.clickNext()


        errorData.main_bank_why.forEach(element => {
            cy.setTextField(titleData.main_bank_why, 'main_bank_why', element.value, element.error, clearField)
        })

        cy.setTextField(titleData.main_bank_why, 'main_bank_why', successData.main_bank_why)
        cy.clickNext()


        errorData.is_investment.forEach(element => {
            cy.setBoolField(titleData.is_investment, 'is_investment', element.value, element.error, clearField)
        })

        cy.setBoolField(titleData.is_investment, 'is_investment', successData.is_investment)
        cy.clickNext()


        errorData.is_investment_plan.forEach(element => {
            cy.setBoolField(titleData.is_investment_plan, 'is_investment_plan', element.value, element.error, clearField)
        })

        cy.clickBack()

        cy.setBoolField(titleData.is_investment, 'is_investment', !successData.is_investment)
        cy.clickNext()


        errorData.investment_prefer.forEach(element => {
            cy.setTextField(titleData.investment_prefer, 'investment_prefer', element.value, element.error, clearField)
        })

        cy.setTextField(titleData.investment_prefer, 'investment_prefer', successData.investment_prefer)

        cy.clickFinish()


    })
})