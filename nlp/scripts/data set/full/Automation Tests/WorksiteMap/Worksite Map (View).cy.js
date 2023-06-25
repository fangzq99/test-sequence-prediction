import { baseURL } from '../../../support/Region Constants/constants.js'
import { worksiteMapViewUsers } from '../../../support/Region Constants/userPrivileges.js'
import * as worksiteMapView from '../../../support/Automation Tests Commands/Worksitemap Commands/worksiteMapViewCommands.js'



context('Worksites maps tests', () => {
    worksiteMapViewUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                worksiteMapView.worksiteMapViewBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it('no create or edit or delete buttons', () => {
                worksiteMapView.noCreateEditDeleteButton()
            })
            it('view maps', () => {
                worksiteMapView.viewMap()
            })
            it('check download', () => {
                worksiteMapView.checkDownload()
            })
        })
    })
})
