import { formatDate } from './utils';
import getGitRepInfo from 'git-repo-info';
import { execSync } from 'child_process';

const getProjectInfo = function () {
  // 获取时间
  const buildTime = formatDate(new Date());

  // 获取项目名称
  const url = execSync('git ls-remote --get-url origin').toString().split('/');
  const repositry = url[url.length - 1].replace(/\n|\r|.git/g, '');

  // 获取 git 信息
  const { commitMessage, committer, committerDate, branch } = getGitRepInfo();
  return {
    repositry,
    buildTime,
    gitRepoInfo: { commitMessage, committer, committerDate, branch },
  };
};

export default getProjectInfo;
