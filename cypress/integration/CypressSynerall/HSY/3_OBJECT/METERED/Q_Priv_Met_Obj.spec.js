import CustomerPage from '../../../../../page-objects/HSY/CustomerPage'
import ObjectPage from '../../../../../page-objects/HSY/ObjectPage'

describe('Logs in and adds a new metered object', () => {
    let customerPage = new CustomerPage()

    let objectPage = new ObjectPage()
    before(function() {
        objectPage.login()
    })

    it('should create new metered object', () => {
        customerPage.createPrivateCustomer()
        objectPage.cloneObjAndChangeOwner()
    })
})