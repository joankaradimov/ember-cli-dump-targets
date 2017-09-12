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
};
