let versionUtil = require('../lib/version-util');

describe('parseVersion', function () {
  let parseVersion = versionUtil.parseVersion;

  it('splits version numbers correctly', function () {
    expect(parseVersion('4.20')).toEqual([4, 20]);
  });
});

describe('compareVersions', function () {
  let compareVersions = versionUtil.compareVersions;

  it('returns strcmp-style results for trivial versions', function () {
    expect(compareVersions([1], [1])).toEqual(0);
    expect(compareVersions([2], [1])).toBeGreaterThan(0);
    expect(compareVersions([1], [5])).toBeLessThan(0);
  });

  it('ignores trailing zeroes', function () {
    expect(compareVersions([1], [1, 0, 0])).toEqual(0);
  });

  it('handles versions with different lengths', function () {
    expect(compareVersions([1, 2], [1])).toBeGreaterThan(0);
    expect(compareVersions([1], [1, 5])).toBeLessThan(0);
  });
});
