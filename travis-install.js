/* eslint-disable max-len */
'use strict';

const exec = require('child_process').execSync;

const env = process.env;

const info = {
  // The GitHub repo slug
  repoSlug: env.TRAVIS_REPO_SLUG,
  // The name of the current branch
  branchName: env.TRAVIS_BRANCH,
  // Is this the first push on this branch
  // i.e. the Greenkeeper commit
  firstPush: !env.TRAVIS_COMMIT_RANGE,
  // Is this a regular build
  correctBuild: env.TRAVIS_PULL_REQUEST === 'false',
  // Should the lockfile be uploaded from this build
  uploadBuild:
    env.TRAVIS_JOB_NUMBER &&
    env.TRAVIS_JOB_NUMBER.endsWith(`.${env.BUILD_LEADER_ID || 1}`),
};

function isGreenkeeperBranch() {
  if (!info.branchName) {
    console.error(
      'No branch details set, so assuming not a Greenkeeper branch',
    );
    return false;
  }

  if (!info.branchName.startsWith('greenkeeper')) {
    console.log(`${info.branchName} is not a greenkeeper branch`);
    return false;
  }

  return true;
}

function execCmd(cmd) {
  return exec(cmd, { stdio: [
    process.stdin,
    process.stdout,
    process.stderr,
  ] });
}
module.exports = function() {
  if (isGreenkeeperBranch()) {
    console.log('found greenkeeper branch build, use npm install');
    return execCmd('npm install');
  }
  console.log('running npm ci');
  return execCmd('npm ci');
};

if (require.main === module) {
  module.exports();
}
