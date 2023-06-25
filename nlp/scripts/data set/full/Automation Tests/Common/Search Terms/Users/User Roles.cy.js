import { userSearchTerms } from '../../../../../support/Automation Tests Commands/Common Commands/searchCommands.js'
import { userViewBeforeEach } from '../../../../../support/Automation Tests Commands/User Commands/userViewCommands.js'
import { assignUsersOperatorFirstName, baseURL, companyUserCo, LBSuperAdmin, LBSuperAdminPassword, mediumTimeout } from '../../../../../support/Region Constants/constants.js'

// Search terms
const detailsTerms = ['0001', '0002', '0003', assignUsersOperatorFirstName, assignUsersOperatorFirstName.substring(5), assignUsersOperatorFirstName.substring(0, 8), 'sales', 'admin', 'tech', 'super', 'superadmin', 'cleaner', 'openapi', 'standard']
const moreTerms = ['N/A', 'expert', 'trainer', '.4', '0', '.5', '2022', LBSuperAdmin, LBSuperAdmin.substring(0, 4)]
const emailStrings = ['@lionsbot.page', '@lionsbot.']
const userNameSubstrings = ['0001', '0002', '0003', assignUsersOperatorFirstName, assignUsersOperatorFirstName.substring(5), assignUsersOperatorFirstName.substring(0, 8)]
const userTypeStrings = ['sales', 'admin', 'tech', 'super', 'superadmin', 'cleaner', 'openapi', 'standard']
const companySubstrings = [companyUserCo, companyUserCo.substring(4), companyUserCo.substring(0, 6)]
const statusStrings = ['active', 'inactive', 'tive', 'inact', 'tive']
const certificate = ['N/A', 'trainer', 'expert']
let today = new Date()
const DateCreated = ["" + today.getFullYear(), "" + (today.getFullYear() - 1), "" + (today.getFullYear() - 2), ("" + today.getFullYear()).substring(2), ("" + (today.getFullYear() - 1)).substring(2), ("" + (today.getFullYear() - 2)).substring(2)]


context("Search tests (Users)", () => {
    context('LB Super Admin', () => {
        beforeEach(() => {
            userViewBeforeEach(baseURL, LBSuperAdmin, LBSuperAdminPassword)
        })
        it('Search for user type strings: ' + userTypeStrings, () => {
            userSearchTerms(userTypeStrings, 100)
        })
        // it('certificate test', () => {
        //     userViewBeforeEach(baseURL, user, password)
        //     cy.wrap(certificate).each($term => {
        //         searchForTerm($term)
        //     })
        // })
        // it('date created test', () => {
        //     userViewBeforeEach(baseURL, user, password)
        //     cy.wrap(DateCreated).each($term => {
        //         searchForTerm($term)
        //     })
        // })
    })
})
