import { uuid } from 'uuidv4'
import * as robotCreate from '../../../../support/Automation Tests Commands/Robot Commands/robotCreateCommands.js'
import { baseURL, robotFamilyTypes } from '../../../../support/Region Constants/constants.js'
import { robotCreateUsers } from '../../../../support/Region Constants/userPrivileges.js'


context('Robot tests (Create)', () => {
    robotCreateUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                robotCreate.robotCreateBeforeEach(baseURL, user.username, user.password, user.role)
            })
            it('Validate unable to create different robot types from the same family with the same serial no. in bulk submission', () => {
                robotCreate.cannotCreateDifferentRobotTypeWithSameSerialBulkSubmission()
            })
            it('Validate unable to create same robot types from the same family with the same serial no. in bulk submission', () => {
                robotCreate.cannotCreateSameRobotTypeWithSameSerialBulkSubmission()
            })
        })
    })
})
