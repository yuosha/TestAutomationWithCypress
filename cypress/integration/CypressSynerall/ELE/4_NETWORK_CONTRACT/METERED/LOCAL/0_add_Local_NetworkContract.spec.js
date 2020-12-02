//<reference types="Cypress"/>
import NetworkContractPage from '../../../../../../page-objects/ELE/NetworkContractPage'
//Precondition: object.txt contains ID of an object that has an owner and a local meter installed
describe('Creates network contract', () => {
    let nwContractPage = new NetworkContractPage()
    
    before(function() {
        nwContractPage.login()
    })

    it('should create new unmetered object', () => {
        nwContractPage.createLocalNWContractSaved()
    })
})