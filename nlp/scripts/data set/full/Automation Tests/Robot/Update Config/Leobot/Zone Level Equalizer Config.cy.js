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
            it("leobot map zone settings, deselect map or select all, check disabled or enabled, for first zone check only Custom and Best reveal settings, in bulk edit Custom and Best we edit all sliders and then check for the update on the main card", () => {
                let settings = ['Best', 'Custom', 'Eco', 'Wet', 'Power', 'Dry', 'Remote']
                let specials = ['Custom', 'Best']
                let normal = ['Eco', 'Wet', 'Power', 'Dry', 'Remote']
                robotUpdateConfig.equalizerZoneLevelConfig(settings, normal, specials, EqualizerConfigCard, EqualizerConfigItem)
            })
            it('Zone level equalizer elements for Leobot', () => {
                robotUpdateConfig.zoneLevelEqualizerElements(commonlyUsedRobots['leoBot']['3277'])
            })
        })
    })
})