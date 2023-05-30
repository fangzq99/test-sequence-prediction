import { baseURL } from "../../../../support/Region Constants/constants.js"
import { companyViewUsers } from "../../../../support/Region Constants/userPrivileges.js"
import { paginationTest } from "../../../../support/generalCommands.js"
import * as companyView from '../../../../support/Automation Tests Commands/Company Commands/companyViewCommands.js'


context("Company tests (View)", () => {
    companyViewUsers.forEach((user) => {
        context(user.role, () => {
            beforeEach(() => {
                companyView.companyViewBeforeEach(baseURL, user.username, user.password, user.role)
            })
            if (!/CC/.test(user.role)) {
                it("(Excluding CC) sticky details, more, search elements", () => {
                    companyView.sticky()
                })
                it("(Excluding CC) *  test search filter input 000000000 and check for no data", () => {
                    companyView.filterNoData()
                })
                it("(Excluding CC) search a worksite and a company", () => {
                    companyView.filterCompany()
                })
                it("(Excluding CC) validate the columns of Details and More", () => {
                    companyView.validateCompanyPageColumns()
                })
                if (/LD Admin/.test(user.role) || /MD Admin/.test(user.role) || /LB Standard/.test(user.role)) {
                    it("(Excluding CC)(Only LD Admin/MD Admin/LB Standard) no add company button", () => {
                        companyView.noAdd()
                    })
                    it("(Excluding CC)(Only LD Admin/MD Admin/LB Standard) search for Company click on company, inspect company, show that no edit and no add company button", () => {
                        companyView.searchInspectNoEditBtnCompany()
                    })
                }
                it("(Excluding CC)* and * next and prev page and select page", () => {
                    paginationTest
                })
                it.skip("(Excluding CC) *  check the ascending ordering", { retries: 0 }, () => {
                    companyView.companyPageascendingOrder()
                })
                it.skip("(Excluding CC) * check the descending ordering", { retries: 0 }, () => {
                    companyView.companyPageDescendingOrder()
                })
            }
            else if (/CC/.test(user.role)) {
                it("check company detailed view", () => {
                    companyView.companyViewCC()
                })
            }
        })
    })
})

