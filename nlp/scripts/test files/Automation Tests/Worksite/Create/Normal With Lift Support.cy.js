import { baseURL } from '../../../../support/Region Constants/constants.js'
import { worksiteCreateUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as worksiteCreate from '../../../../support/Automation Tests Commands/Worksite Commands/worksiteCreateCommands.js'


// Not all users that can create worksites can delete worksites, only super admin and technicians can delete worksites
context('Worksite tests (Create)', () => {
    worksiteCreateUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                worksiteCreate.worksiteCreateBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it('Successfully create a demo worksite with lift support, then delete the same worksite afterwords as users with delete worksite rights, then verify the delete worksite api call', () => {
                worksiteCreate.createNormalWorksiteWithLiftSupport(user.role)
            })
            // it("Create worksite but with the required validation checks", () => {
            //     worksite.createWorksiteNo()
            // })      
        })
    })
})

