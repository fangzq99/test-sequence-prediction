import { baseURL } from '../../../../support/Region Constants/constants.js'
import { robotDownloadCertificateUsers } from '../../../../support/Region Constants/userPrivileges.js'
import * as robotCertificate from '../../../../support/Automation Tests Commands/Robot Commands/robotCertificateCommands.js'


context('Robot certificate download test (All robot types): LB Super Admin', () => {
    robotDownloadCertificateUsers.forEach(user => {
        context(user.role, () => {
            beforeEach(() => {
                robotCertificate.certificateBeforeEach(baseURL, user.username, user.password, user.role)
            })
            // NOTE: This does not work for some reason, rework it
            // it("download for leobot and verify it is successful", () => {
            //     robotCertificate.leobotDownload()
            // })
            if (/super admin/i.test(user.role)) {
                it.skip("(Only super admin) download for r3 and verify it is successful", () => {
                    robotCertificate.r3Download()
                })
                it.skip("(Only super admin) download for rex and verify it is successful", () => {
                    robotCertificate.rexDownload()
                })
            }
            else {
                it("cannot download cert leobot", () => {
                    robotCertificate.leoNoDownload()
                }),
                    it("cannot download cert r3", () => {
                        robotCertificate.r3NoDownload()
                    }),
                    it("cannot download cert rex", () => {
                        robotCertificate.rexNoDownload()
                    })
            }
        })
    })
})

