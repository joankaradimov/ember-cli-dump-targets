/* jshint node: true */
'use strict';

let versionUtil = require('./lib/version-util');

let writeFile = require('broccoli-file-creator');
let BroccoliMergeTrees = require('broccoli-merge-trees');

let getTarget = require('babel-preset-env/lib/targets-parser').default;
let builtinFeatures = require('babel-preset-env/data/built-ins');
let pluginFeatures = require('babel-preset-env/data/plugins');

let getClients = function (features) {
  let result = {};

  for (let featureName in features) {
    Object.assign(result, features[featureName]);
  }

  return Object.keys(result);
}

let compatibleClients = function (features, targets) {
  let clients = getClients(features);
  let resultCompatibility = {};

  for (let featureName in features) {
    if (features.hasOwnProperty(featureName)) {
      let feature = features[featureName];

      if (versionUtil.isSupported(feature, targets)) {
        for (let client of clients) {
          if (feature.hasOwnProperty(client)) {
            let compatibleVersion = versionUtil.parseVersion(feature[client]);
            let currentVersion = resultCompatibility[client] ? versionUtil.parseVersion(resultCompatibility[client]) : [];

            if (versionUtil.compareVersions(compatibleVersion, currentVersion) > 0) {
              resultCompatibility[client] = feature[client];
            }
          } else {
            delete resultCompatibility[client];
          }
        }
      }
    }
  }

  return resultCompatibility;
};

module.exports = {
  name: 'ember-cli-dump-targets',

  treeForPublic: function() {
    let targets = getTarget(this.app.project.targets);
    let features = Object.assign({}, builtinFeatures, pluginFeatures);
    let compatibleTargets = compatibleClients(features, targets);
    let tree = writeFile('targets.json', JSON.stringify(compatibleTargets));

    return new BroccoliMergeTrees([this.app.trees.public, tree]);
  },
};
