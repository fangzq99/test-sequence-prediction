import * as robotUpdateConfig from '../../../../../support/Automation Tests Commands/Robot Commands/robotUpdateConfigCommands.js'
import { baseURL, commonlyUsedRobots } from '../../../../../support/Region Constants/constants.js'
import { robotUpdateConfigsUsers } from '../../../../../support/Region Constants/userPrivileges.js'


context('Robot tests (Update configs)(Rex)', () => {
    robotUpdateConfigsUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                robotUpdateConfig.robotUpdateBeforeEach(baseURL, user.username, user.password, user.role, commonlyUsedRobots['rex']['100'])
            })
            it("rex map zone settings, deselect map or select all, check disabled or enabled, for first zone check only Custom and Best reveal settings, in bulk edit Custom and Best we edit custom spray setting and then check for the update on the main card", () => {
                let settings = ['custom_1', 'custom_2', 'eco', 'max', 'dry']
                let specials = ['custom_1', 'custom_2']
                let normal = ['eco', 'max', 'dry']
                robotUpdateConfig.equalizerZoneLevelConfig(settings, normal, specials)
            })
            it('Zone level equalizer elements for Rex', () => {
                robotUpdateConfig.zoneLevelEqualizerElements(commonlyUsedRobots['rex']['100'])
            })
        })
    })
})
