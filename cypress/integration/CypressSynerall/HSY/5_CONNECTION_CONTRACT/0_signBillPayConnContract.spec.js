///<reference types="Cypress"/>
import ConnectionContractPage from '../../../../page-objects/HSY/ConnectionContractPage'

//This spec assumes that the object (with a new connected connection contract) has been saved to a file object.txt
describe('Logs in , opens a connection contract, signs & bills it and pays the bill', () => {
    let connContractPage = new ConnectionContractPage()
    before(function() {
        connContractPage.login()
    })

    it('should sign & bill the connection contract and pay the bill(connecting)', () => {
        connContractPage.signBillPay()
    })
})