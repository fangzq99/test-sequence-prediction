import { baseURL, commonlyUsedCCCompanyWorksite, commonlyUsedCCCompanyWorksite2 } from '../../../../support/Region Constants/constants.js'
import { worksiteStatusUsers } from '../../../../support/Region Constants/userPrivilegesSmokeTests'
import * as worksiteStatus from '../../../../support/Smoke Tests Commands/Dashboard Check Commands/worksiteStatusCommands.js'


const worksitesList = [
    commonlyUsedCCCompanyWorksite['worksiteName'],
    commonlyUsedCCCompanyWorksite['worksite2Name'],
    commonlyUsedCCCompanyWorksite['worksite3Name'],
    commonlyUsedCCCompanyWorksite2['worksiteName'],
    commonlyUsedCCCompanyWorksite2['worksite2Name'],
    commonlyUsedCCCompanyWorksite2['worksite3Name']
]


context('Worksites exist in search for region: ' + baseURL, () => {
    worksiteStatusUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                worksiteStatus.worksiteStatusBeforeEach(user.username, user.password, user.role)
            })
            it('Search for all worksites and ensure their names are correct', () => {
                worksiteStatus.verifyWorksiteExistence(worksitesList)
            })
        })
    })
})