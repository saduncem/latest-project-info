'use strict';

var getGitRepInfo = require('git-repo-info');
var child_process = require('child_process');

/**
 * 补0
 * @param {Number} num 需要操作的数
 */
function appendZero(num) {
    if (num < 10) {
        return "0".concat(num);
    }
    return num;
}
/**
 * 格式化日期
 * @param {Date} time 日期
 */
function formatDate(time) {
    var year = time.getFullYear();
    var month = appendZero(time.getMonth() + 1);
    var date = appendZero(time.getDate());
    var week = '日一二三四五六'.charAt(time.getDay());
    var hour = appendZero(time.getHours());
    var minute = appendZero(time.getMinutes());
    var second = appendZero(time.getSeconds());
    return "".concat(year, "-").concat(month, "-").concat(date, "(\u5468").concat(week, ") ").concat(hour, ":").concat(minute, ":").concat(second);
}

var getProjectInfo = function () {
    // 获取时间
    var buildTime = formatDate(new Date());
    // 获取项目名称
    var url = child_process.execSync('git ls-remote --get-url origin').toString().split('/');
    var repositry = url[url.length - 1].replace(/\n|\r|.git/g, '');
    // 获取 git 信息
    var _a = getGitRepInfo(), commitMessage = _a.commitMessage, committer = _a.committer, committerDate = _a.committerDate, branch = _a.branch;
    return {
        repositry: repositry,
        buildTime: buildTime,
        gitRepoInfo: { commitMessage: commitMessage, committer: committer, committerDate: committerDate, branch: branch },
    };
};

exports.getProjectInfo = getProjectInfo;
