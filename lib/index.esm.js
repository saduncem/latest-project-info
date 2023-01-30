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
    return {
        buildTime: buildTime,
    };
};

export { getProjectInfo };
