import { baseURL, linkedCompanyAndWorksite } from "../../../../support/Region Constants/constants.js"
import { companyStatusUsers } from "../../../../support/Region Constants/userPrivilegesSmokeTests.js"
import * as companyStatus from '../../../../support/Smoke Tests Commands/Dashboard Check Commands/companyStatusCommands.js'


const LionsBotParentName = linkedCompanyAndWorksite['lionsBotParent']['companyName']
const lionsBotParentLevel = linkedCompanyAndWorksite['lionsBotParent']['companyLevel']
const MasterDistributorName = linkedCompanyAndWorksite['lionsBotParent']['masterDistributor1']['companyName']
const MasterDistributorLevel = linkedCompanyAndWorksite['lionsBotParent']['masterDistributor1']['companyLevel']
const LocalDealerName = linkedCompanyAndWorksite['lionsBotParent']['masterDistributor1']['localDealer1']['companyName']
const LocalDealerLevel = linkedCompanyAndWorksite['lionsBotParent']['masterDistributor1']['localDealer1']['companyLevel']
const CleaningContractor1Name = linkedCompanyAndWorksite['lionsBotParent']['masterDistributor1']['localDealer1']['cleaningContractor1']['companyName']
const CleaningContractor1Level = linkedCompanyAndWorksite['lionsBotParent']['masterDistributor1']['localDealer1']['cleaningContractor1']['companyLevel']
const CleaningContractor1Worksite1Name = linkedCompanyAndWorksite['lionsBotParent']['masterDistributor1']['localDealer1']['cleaningContractor1']['worksiteName']
const CleaningContractor1Worksite2Name = linkedCompanyAndWorksite['lionsBotParent']['masterDistributor1']['localDealer1']['cleaningContractor1']['worksite2Name']
const CleaningContractor1Worksite3Name = linkedCompanyAndWorksite['lionsBotParent']['masterDistributor1']['localDealer1']['cleaningContractor1']['worksite3Name']
const CleaningContractor2Name = linkedCompanyAndWorksite['lionsBotParent']['masterDistributor1']['localDealer1']['cleaningContractor2']['companyName']
const CleaningContractor2Level = linkedCompanyAndWorksite['lionsBotParent']['masterDistributor1']['localDealer1']['cleaningContractor2']['companyLevel']
const CleaningContractor2Worksite1Name = linkedCompanyAndWorksite['lionsBotParent']['masterDistributor1']['localDealer1']['cleaningContractor1']['worksiteName']
const CleaningContractor2Worksite21Name = linkedCompanyAndWorksite['lionsBotParent']['masterDistributor1']['localDealer1']['cleaningContractor1']['worksite2Name']
const CleaningContractor2Worksite3Name = linkedCompanyAndWorksite['lionsBotParent']['masterDistributor1']['localDealer1']['cleaningContractor1']['worksite3Name']


// NOTE: only CC worksites needs to be checked since only they are used,
// also for other roles, the worksites is linked to the their current company
// so you won't see them as the ones we are using are only the CC ones
context('Companies worksites check for region: ' + baseURL, () => {
    companyStatusUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                companyStatus.companyStatusBeforeEach(user.username, user.password, user.role)
            })
            // if (/LB/i.test(user.role)){
            //     it('Check LB companies worksites data', () => {
            //         companyStatus.verifyWorksites(user.role, LionsBotParentName, [CleaningContractor1Worksite1Name, CleaningContractor1Worksite2Name, CleaningContractor1Worksite3Name])
            //     })
            // }
            // else if (/MD/i.test(user.role)){
            //     it('Check MD companies worksites data', () => {
            //         companyStatus.verifyWorksites(user.role, MasterDistributorName, [CleaningContractor1Worksite1Name, CleaningContractor1Worksite2Name, CleaningContractor1Worksite3Name])
            //     })
            // }
            // else if (/LD/i.test(user.role)){
            //     it('Check LD companies worksites data', () => {
            //         companyStatus.verifyWorksites(user.role, LocalDealerName, [CleaningContractor1Worksite1Name, CleaningContractor1Worksite2Name, CleaningContractor1Worksite3Name])
            //     })
            // }
            // NOTE: Only CC users have worksites data for now
            if (/CC/i.test(user.role)) {
                it('Check CC company worksites data', () => {
                    companyStatus.verifyWorksites(user.role, CleaningContractor1Name, [CleaningContractor1Worksite1Name, CleaningContractor1Worksite2Name, CleaningContractor1Worksite3Name])
                })
            }
        })
    })
})