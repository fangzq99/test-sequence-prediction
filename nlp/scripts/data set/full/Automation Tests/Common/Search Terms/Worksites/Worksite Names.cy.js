import { worksitesTermsSearch } from '../../../../../support/Automation Tests Commands/Common Commands/searchCommands.js'
import { worksiteViewBeforeEach } from '../../../../../support/Automation Tests Commands/Worksite Commands/worksiteViewCommands.js'
import { baseURL, companyUserCo, companyUserWork, LBSuperAdmin, LBSuperAdminPassword } from '../../../../../support/Region Constants/constants.js'

//search terms
const companySearchSubstrings = [companyUserCo, companyUserCo.substring(2), companyUserCo.substring(5), companyUserWork, companyUserWork.substring(4), companyUserCo.substring(0, 5)]
const createdUserSearchSubstrings = [LBSuperAdmin, LBSuperAdmin.substring(3), LBSuperAdmin.substring(1)]
const worksiteSearchSubstrings = [companyUserWork, companyUserWork.substring(5), companyUserWork.substring(0, 6)]
let today = new Date()
const DateCreated = ["" + today.getFullYear(), "" + (today.getFullYear() - 1), "" + (today.getFullYear() - 2), ("" + today.getFullYear()).substring(2), ("" + (today.getFullYear() - 1)).substring(2), ("" + (today.getFullYear() - 2)).substring(2)]


context("Search tests (Worksites)", () => {
    context('LB Super Admin', () => {
        beforeEach(() => {
            worksiteViewBeforeEach(baseURL, LBSuperAdmin, LBSuperAdminPassword)
        })
        it('Search for worksite: ' + worksiteSearchSubstrings + ' and its substrings', () => {
            worksitesTermsSearch(worksiteSearchSubstrings, 100)
        })
        //     it('date created or modified', () => {
        //         worksiteViewBeforeEach(baseURL, user, password)
        //         cy.wrap(DateCreated).each($term => {
        //             searchForTerm($term)
        //         })
        //     })
    })
})
