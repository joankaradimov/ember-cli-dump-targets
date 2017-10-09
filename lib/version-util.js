module.exports = {
  parseVersion (versionString) {
    return versionString.split('.').map(Number);
  },

  compareVersions (x, y) {
    let componentsLength = Math.max(x.length, y.length);

    for (let i = 0; i < componentsLength; i++) {
      let xComponent = x[i] || 0;
      let yComponent = y[i] || 0;

      if (xComponent - yComponent !== 0) {
        return xComponent - yComponent;
      }
    }

    return 0;
  },

  getTargetVersion (feature, targetName) {
    if (feature.hasOwnProperty(targetName)) {
      return module.exports.parseVersion(feature[targetName]);
    } else {
      return [Infinity];
    }
  },

  isSupported (feature, targets) {
    for (let targetName in targets) {
      if (targets.hasOwnProperty(targetName)) {
        let targetVersion = module.exports.getTargetVersion(targets, targetName);
        let featureRequiredVersion = module.exports.getTargetVersion(feature, targetName);

        if (module.exports.compareVersions(featureRequiredVersion, targetVersion) > 0) {
          return false;
        }
      }
    }

    return true;
  },
};
