import * as robotUpdateConfig from '../../../../../support/Automation Tests Commands/Robot Commands/robotUpdateConfigCommands.js'
import { baseURL, commonlyUsedRobots } from '../../../../../support/Region Constants/constants.js'
import { robotUpdateConfigsUsers, robotUpdateConfigsUsersEU } from '../../../../../support/Region Constants/userPrivileges.js'


const EqualizerConfigCard = '@EqualizerConfigCard'
const EqualizerConfigItem = 'div[class^="index_previewContainer"]'


context('Robot tests (Update configs)(LeoBot)', () => {
    let users
    if (baseURL.includes('eu')) {
        users = robotUpdateConfigsUsersEU
    }
    else {
        users = robotUpdateConfigsUsers
    }
    users.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                robotUpdateConfig.robotUpdateBeforeEach(baseURL, user.username, user.password, user.role, commonlyUsedRobots['leoBot']['57'])
            })
            it('Validate LeoBot page elements', () => {
                robotUpdateConfig.robotPageElements(commonlyUsedRobots['leoBot']['57'], user.role)
            })
        })
    })
})