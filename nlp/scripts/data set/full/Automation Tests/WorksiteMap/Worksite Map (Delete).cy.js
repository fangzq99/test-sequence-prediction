import { baseURL } from '../../../support/Region Constants/constants.js'
import { worksiteMapDeleteUsers } from '../../../support/Region Constants/userPrivileges.js'
import * as r3worksite from '../../../support/Live Tests Commands/r3Worksite.js'
import * as worksiteMapDelete from '../../../support/Automation Tests Commands/Worksitemap Commands/worksiteMapDeleteCommands.js'



context("Worksite maps tests (Part 1)", () => {
    worksiteMapDeleteUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                worksiteMapDelete.worksiteMapDeleteBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it("draft deploy delete", () => {
                worksiteMapDelete.draftDeploy()
            })
            it("create draft and delete it", () => {
                worksiteMapDelete.createDraftDelete()
            })
            it("create map and delete it", () => {
                worksiteMapDelete.createMapDelete()
            })
            it("create map view, assign homepoint and delete it", () => {
                worksiteMapDelete.createViewEdit()
            })
            it("create map, update, check the disabled buttons, and error messages", () => {
                worksiteMapDelete.createUpdateMapDelete()
            })
        })
    })
})




context("Worksite maps tests (Part 2)", () => {
    worksiteMapDeleteUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                worksiteMapDelete.worksiteMapDeleteBeforeEachPart2(baseURL, user.username, user.password, user.role)
            })
            it("check editmap clean up map page", () => {
                worksiteMapDelete.checkEditMap()
            })
            it("check only can upload png", () => {
                r3worksite.onlyPng()
            })
            it("error messages on create map", () => {
                r3worksite.errorMessages()
            })
            it("error messages on update map", () => {
                worksiteMapDelete.checkUpdateMapIllegalInput()
            })
            it("check download", () => {
                worksiteMapDelete.checkDownload()
            })
        })
    })
})

