import { baseURL } from '../../../support/Region Constants/constants.js'
import { leobotScheduleUsers } from '../../../support/Region Constants/userPrivileges.js'
// Have a blank day to test on !
import * as leobotSchedule from '../../../support/Automation Tests Commands/Schedule Commands/scheduleLeoBotCommands.js'


export function ScheduleLeoBotTestSuite({
    users = undefined
}){
    context.skip('Schedule tests (LeoBot)', () => {
        users.forEach(user => {
            context(user.role, () => {
                before(() => {
                    // we want to ensure that robotScheduleTest is can be scheduled 
                    leobotSchedule.enableSchedule()
                })
                beforeEach(() => {
                    leobotSchedule.scheduleBeforeEach(baseURL, user.username, user.password)
                })
                it("add new non repeating schedule modal error messages of time and add new schedule successfully and delete it", () => {
                    leobotSchedule.createScheduleErrMsgDel()
                })
                it("now create an overlapping non repeating schedules and try to save, assert to error message, click cancel instead and assert no error message, delete the first schedule", () => {
                    leobotSchedule.overlappingSchedulesEditCancelDel()
                })
                it('create another non repeating schedule and edit and delete it', () => {
                    leobotSchedule.createEditDelDaily()
                })
                it('create repeating schedule starting today, edit it and delete it', () => {
                    leobotSchedule.createRepeatEditDelPlan()
                })
                it('create repeating overlapping schedule, assert conflict message, try again, click cancel, then delete first schedule', () => {
                    leobotSchedule.createOverlappingRepeatingEditCancelDel()
                })
                it('create repeating, click delete, cancel, then delete just this event', () => {
                    leobotSchedule.createRepeatingDelOnlyThisEvent()
                })
            })
        })
    })
}


export function ScheduleLeoBotDisableScheduleTestSuite({
    users = undefined
}){
    context.skip("Schedule tests (Disable schedule function)(LeoBot)", () => {
        users.forEach(user => {
            context(user.role, () => {
                before(() => {
                    leobotSchedule.disableSchedule()
                })
                it("check for no leoray,r3,leopull,rex", () => {
                    leobotSchedule.scheduleBeforeEach(baseURL, user.username, user.password)
                    leobotSchedule.onlyEnabledLeobotsCanSchedule()
                })
            })
        })
    })
}


ScheduleLeoBotTestSuite({
    users: leobotScheduleUsers
})


ScheduleLeoBotDisableScheduleTestSuite({
    users: leobotScheduleUsers
})