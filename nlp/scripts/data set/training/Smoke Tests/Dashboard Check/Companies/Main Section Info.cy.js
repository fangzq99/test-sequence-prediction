import { baseURL, currentRegion, linkedCompanyAndWorksite } from "../../../../support/Region Constants/constants.js"
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
const CleaningContractor2Name = linkedCompanyAndWorksite['lionsBotParent']['masterDistributor1']['localDealer1']['cleaningContractor2']['companyName']
const CleaningContractor2Level = linkedCompanyAndWorksite['lionsBotParent']['masterDistributor1']['localDealer1']['cleaningContractor2']['companyLevel']


context('Companies main data check for region: ' + baseURL, () => {
    companyStatusUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                companyStatus.companyStatusBeforeEach(user.username, user.password, user.role)
            })
            if (/LB/i.test(user.role)) {
                it('Check LB companies main data', () => {
                    companyStatus.verifyCompaniesMainData(user.role, LionsBotParentName, lionsBotParentLevel)
                })
            }
            else if (/MD/i.test(user.role)) {
                it('Check MD companies main data', () => {
                    companyStatus.verifyCompaniesMainData(user.role, MasterDistributorName, MasterDistributorLevel, LionsBotParentName)
                })
            }
            else if (/LD/i.test(user.role)) {
                it('Check LD companies main data', () => {
                    companyStatus.verifyCompaniesMainData(user.role, LocalDealerName, LocalDealerLevel, MasterDistributorName)
                })
            }
            else if (/CC/i.test(user.role)) {
                it('Check CC company main data', () => {
                    companyStatus.verifyCompaniesMainData(user.role, CleaningContractor1Name, CleaningContractor1Level, LocalDealerName)
                })
            }
        })
    })
})