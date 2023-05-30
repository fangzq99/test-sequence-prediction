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
            it("leobot personality config, click set personality, click adorable Gauraangi, change ith personality variable, set personality, check for the set personality in the main card", () => {
                robotUpdateConfig.personalityLeobot()
            })
        })
    })
})