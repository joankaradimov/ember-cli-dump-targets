let versionUtil = require('../lib/version-util');

describe('parseVersion', function () {
  let parseVersion = versionUtil.parseVersion;

  it('splits version numbers correctly', function () {
    expect(parseVersion('4.20')).toEqual([4, 20]);
  });

  it('handles version numbers without dots', function () {
    expect(parseVersion('42')).toEqual([42]);
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
    expect(compareVersions([3, 11], [3, 11, 0, 0])).toEqual(0);
  });

  it('handles versions with different lengths', function () {
    expect(compareVersions([1, 2], [1])).toBeGreaterThan(0);
    expect(compareVersions([1], [1, 5])).toBeLessThan(0);
    expect(compareVersions([1, 0], [1, 2])).toBeLessThan(0);
  });
});

describe('isSupported', function () {
  let isSupported = versionUtil.isSupported;

  it('detects compatible major versions', function () {
    expect(isSupported({node: '6'}, {node: '6'})).toBeTruthy();
    expect(isSupported({node: '6'}, {node: '8'})).toBeTruthy();
  });

  it('detects compatible minor/patch versions', function () {
    expect(isSupported({node: '6'}, {node: '6.0'})).toBeTruthy();
    expect(isSupported({node: '6'}, {node: '6.1'})).toBeTruthy();
    expect(isSupported({node: '6.0'}, {node: '6'})).toBeTruthy();

    expect(isSupported({node: '6.0.1'}, {node: '6.1.0'})).toBeTruthy();
    expect(isSupported({node: '6.0.1'}, {node: '6.1'})).toBeTruthy();
  });

  it('returns true when no targets are specified', function () {
    expect(isSupported({node: '6'}, {})).toBeTruthy();
    expect(isSupported({}, {})).toBeTruthy();
  });

  it('returns false for non-supported versions', function () {
    expect(isSupported({node: '6'}, {node: '5'})).toBeFalsy();
    expect(isSupported({node: '5.1'}, {node: '5'})).toBeFalsy();
  });

  it('returns false for feature hashes without the target client', function () {
    expect(isSupported({}, {node: '6'})).toBeFalsy();
    expect(isSupported({firefox: '40'}, {node: '6'})).toBeFalsy();
  });

  it('handles multiple feature/target clients', function () {
    expect(isSupported({firefox: '40', node: '6'}, {node: '8'})).toBeTruthy();
    expect(isSupported({x: '5', y: '6'}, {x: '5', y: '8'})).toBeTruthy();
  });
});
