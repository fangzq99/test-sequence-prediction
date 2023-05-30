import { baseURL, currentRegion, linkedCompanyAndWorksite } from "../../../../support/Region Constants/constants.js"
import { companyStatusUsers } from "../../../../support/Region Constants/userPrivilegesSmokeTests"
import * as companyStatus from '../../../../support/Smoke Tests Commands/Dashboard Check Commands/companyStatusCommands.js'


const LionsBotParentName = linkedCompanyAndWorksite['lionsBotParent']['companyName']
const lionsBotParentLevel = linkedCompanyAndWorksite['lionsBotParent']['companyLevel']
const MasterDistributorName = linkedCompanyAndWorksite['lionsBotParent']['masterDistributor1']['companyName']
const MasterDistributorLevel = linkedCompanyAndWorksite['lionsBotParent']['masterDistributor1']['companyLevel']
const LocalDealerName = linkedCompanyAndWorksite['lionsBotParent']['masterDistributor1']['localDealer1']['companyName']
const LocalDealerLevel = linkedCompanyAndWorksite['lionsBotParent']['masterDistributor1']['localDealer1']['companyLevel']
const CleaningContractor1Name = linkedCompanyAndWorksite['lionsBotParent']['masterDistributor1']['localDealer1']['cleaningContractor1']['companyName']
const CleaningContractor1Level = linkedCompanyAndWorksite['lionsBotParent']['masterDistributor1']['localDealer1']['cleaningContractor1']['companyLevel']
const CleaningContractor2Name = linkedCompanyAndWorksite['lionsBotParent']['masterDistributor1']['localDealer1']['cleaningContractor2']['companyName']
const CleaningContractor2Level = linkedCompanyAndWorksite['lionsBotParent']['masterDistributor1']['localDealer1']['cleaningContractor2']['companyLevel']


context('Companies tier information check for region: ' + baseURL, () => {
    companyStatusUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                companyStatus.companyStatusBeforeEach(user.username, user.password, user.role)
            })
            if (/LB/i.test(user.role)) {
                it('Check LB companies tier', () => {
                    companyStatus.verifyCompaniesTier(user.role, LionsBotParentName)
                })
            }
            else if (/MD/i.test(user.role)) {
                it('Check MD companies tier', () => {
                    companyStatus.verifyCompaniesTier(user.role, MasterDistributorName)
                })
            }
            else if (/LD/i.test(user.role)) {
                it('Check LD companies tier', () => {
                    companyStatus.verifyCompaniesTier(user.role, LocalDealerName)
                })
            }
            else if (/CC/i.test(user.role)) {
                it('Check CC company tier', () => {
                    companyStatus.verifyCompaniesTier(user.role)
                })
            }
        })
    })
})