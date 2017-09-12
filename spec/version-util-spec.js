let versionUtil = require('../lib/version-util');

describe('parseVersion', function () {
  let parseVersion = versionUtil.parseVersion;

  it('splits version numbers correctly', function () {
    expect(parseVersion('4.20')).toEqual([4, 20]);
  });
});
