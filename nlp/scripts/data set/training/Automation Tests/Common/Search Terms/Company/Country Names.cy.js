import { companyTermsSearch } from '../../../../../support/Automation Tests Commands/Common Commands/searchCommands.js'
import { companyViewBeforeEach } from '../../../../../support/Automation Tests Commands/Company Commands/companyViewCommands.js'
import { baseURL, commonlyUsedCCCompanyWorksite, LBSuperAdmin, LBSuperAdminPassword } from '../../../../../support/Region Constants/constants.js'


//search terms
const companyString = commonlyUsedCCCompanyWorksite['companyName']
const companySearchSubstrings = [companyString, companyString.substring(2), companyString.substring(5)]
const countryString = 'Singapore'
const countrySearchSubstrings = [countryString, countryString.substring(4), countryString.substring(2), countryString.substring(0, 7)]
let today = new Date()
const DateCreated = ["" + today.getFullYear(), "" + (today.getFullYear() - 1), "" + (today.getFullYear() - 2), ("" + today.getFullYear()).substring(2), ("" + (today.getFullYear() - 1)).substring(2), ("" + (today.getFullYear() - 2)).substring(2)]


context("Search tests (Company)", () => {
    context('LB Super Admin', () => {
        beforeEach(() => {
            companyViewBeforeEach(baseURL, LBSuperAdmin, LBSuperAdminPassword)
        })
        it('Search for country ' + countryString + ' and its substrings', () => {
            companyTermsSearch(countrySearchSubstrings, 100)
        })
        // it('search for date created',()=>{
        //     companyViewBeforeEach(baseURL, user, password)
        //     cy.wrap(DateCreated).each(($term)=>{
        //         searchForTerm($term)
        //     })
        // })
    })
})
