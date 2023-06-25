import { robotSearchTerms } from '../../../../../support/Automation Tests Commands/Common Commands/searchCommands.js'
import { robotViewBeforeEach } from '../../../../../support/Automation Tests Commands/Robot Commands/robotViewCommands.js'
import { getDateSearchTerms } from '../../../../../support/generalCommands.js'
import { baseURL, commonlyUsedRobots, companyUserCo, companyUserWork, companyValidationMD, LBSuperAdmin, LBSuperAdminPassword } from '../../../../../support/Region Constants/constants.js'


//search terms
const serialNumSearchSubstrings = [commonlyUsedRobots['leoBot']['57'], commonlyUsedRobots['leoBot']['57'].substring(0, 5), commonlyUsedRobots['leoBot']['57'].substring(4), commonlyUsedRobots['rex']['100'], commonlyUsedRobots['rex']['100'].substring(4), commonlyUsedRobots['rex']['100'].substring(0, 5), commonlyUsedRobots['r3']['592'], commonlyUsedRobots['r3']['592'].substring(5), commonlyUsedRobots['r3']['592'].substring(0, 4)]
const waterStatus = ["OK", 'EMPTY']
const lastonline = getDateSearchTerms()
const worksiteSearchSubstrings = [companyUserWork, companyUserWork.substring(4), companyUserWork.substring(0, 5)]
const companyAndDistributorSearchSubstrings = [companyUserCo, companyUserCo.substring(6), companyUserCo, companyValidationMD.substring(4)]
const yesOrNo = ['yes', 'no', 'ye', 'y', 'n']
const countryString = 'Singapore'
const countrySearchSubstrings = [countryString, countryString.substring(4), countryString.substring(2), countryString.substring(0, 7)]


context("Search tests (Robots)", () => {
    context('LB Super Admin', () => {
        beforeEach(() => {
            robotViewBeforeEach(baseURL, LBSuperAdmin, LBSuperAdminPassword)
        })
        it('Search for serial no.: ' + serialNumSearchSubstrings + ' and its substrings', () => {
            robotSearchTerms(serialNumSearchSubstrings, 100)
        })
        // it('deployed',()=>{        
        //     robotViewBeforeEach(baseURL, user, password)
        //     cy.wrap(yesOrNo).each(($term)=>{
        //         searchForTerm($term,'robots')
        //     })
        // })
        // it('water status',()=>{        
        //     robotViewBeforeEach(baseURL, user, password)
        //     cy.wrap(waterStatus).each(($term)=>{
        //         searchForTerm($term,'robots')
        //     })
        // })
        // it('last online',()=>{        
        //     robotViewBeforeEach(baseURL, user, password)
        //     cy.wrap(lastonline).each(($term)=>{
        //         searchForTerm($term,'robots')
        //     })
        // })
    })
})


