import * as overviewPage from '../../../support/Automation Tests Commands/Common Commands/overviewCommands.js'
import { baseURL } from "../../../support/Region Constants/constants.js"
import { completeSetUsers } from '../../../support/Region Constants/userPrivileges.js'



context('Overview page', () => {
    completeSetUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                overviewPage.overviewBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it('Assert the api calls for fetched data and validate the content of the containers', {
                retries: {
                    runMode: 1,
                    openMode: 0,
                }
            }, () => {
                overviewPage.assertApiTitles()
            })
        })
    })
})



