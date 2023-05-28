import {
  baseURL,
  longTimeout,
  mediumTimeout,
  shortTimeout,
  defaultTimeout,
  LBSuperAdmin,
  LBSuperAdminPassword,
  paginationTest,
  leobotConfigTest,
  randInt,
  configCardTest,
  RexR3ZoneConfig,
  r3ConfigTest,
  LBTech,
  LBTechPassword,
  LBSales,
  LBSalesPassword,
  MDAdmin,
  MDAdminPassword,
  LDAdmin,
  LDAdminPassword,
  CCAdmin,
  CCAdminPassword
} from '../../../support/Region Constants/constants.js';
const user = CCAdmin;
const password = CCAdminPassword;

import * as c from '../../../support/Live Tests Commands/r3WorksiteViewOnly.js';
import * as d from '../../../support/Live Tests Commands/r3Worksite.js';

context('Testing cc admin Robots r3  worksite map config testing', () => {
  beforeEach(() => {
    c.beforeEach(baseURL, user, password);
  });
  it('no edit and add buttons', () => {
    c.noEditAddButton();
  });
  it('view map', () => {
    c.viewMap();
  });

  it('download map, ignore this result', { retries: 0 }, () => {
    c.downloadMap();
  });
  it('check for 4 files are downloaded correctly', () => {
    d.checkDownload();
  });
});
