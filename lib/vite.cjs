'use strict';

var getGitRepInfo = require('git-repo-info');
var child_process = require('child_process');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

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

// todo: 导出 vite 插件， 功能是在 build 时候注入 share 内的 getProjectInfo 信息到window
function injectLastestProjectInfoForVitePlugin(inputOptions) {
    return {
        name: 'lastestProjectInfoPlugin',
        transformIndexHtml: function (html) {
            var projectInfo = getProjectInfo();
            var injectInfo = JSON.stringify(getProjectInfo());
            if (inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.extraInfo) {
                injectInfo = JSON.stringify(__assign(__assign({}, projectInfo), inputOptions.extraInfo));
            }
            var injectHtml = "setTimeout(() => {\n        printInfo(projectInfo)\n      }, 100);";
            var printInfo = "function printInfo(injectInfo) {\n        console.log('[latest-project-info] logInfo:');\n        console.log(injectInfo);\n      };";
            var res = html;
            res = res.replace('</body>', " \n          <script>\n            (function() {\n              const projectInfo = ".concat(injectInfo, ";\n              ").concat(injectHtml, "\n              ").concat(printInfo, "\n            })()\n          </script>\n        </body>\n      "));
            return res;
        },
    };
}

module.exports = injectLastestProjectInfoForVitePlugin;
