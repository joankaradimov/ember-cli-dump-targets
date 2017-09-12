module.exports = {
  parseVersion (versionString) {
    return versionString.split('.').map(Number);
  },
};
