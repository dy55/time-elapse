/**
 * 时间差计算类
 *
 * @author Charles
 * @since 2020-5-3
 * @version 1.0
 */
var TimeElapse = /** @class */ (function () {
    /**
     * 构造函数
     *
     * 输入一个参数时为当前日期减去输入日期
     *
     * 输入两个参数时为前日期减去后日期
     *
     * @param date1 日期1
     * @param date2 日期2
     */
    function TimeElapse(date1, date2) {
        if (date2 === undefined) {
            date2 = date1;
            date1 = new Date();
        }
        this.delta = Math.abs(date1.getTime() - date2.getTime());
        this.diffType = date1.getTime() < date2.getTime() ? 1 : 0;
    }
    TimeElapse.prototype.toString = function () {
        var dateDelta = this.delta;
        var seconds = dateDelta / 1000;
        var minutes = seconds / 60;
        var hours = minutes / 60;
        var days = hours / 24;
        var months = days / 30;
        var years = days / 365;
        if (seconds <= 0) {
            seconds = 1;
        }
        var deltaList = [Math.floor(years), Math.floor(months), Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(seconds)];
        var out = "";
        for (var index in deltaList) {
            if (deltaList[index] > 0) {
                var newVal = deltaList[index] + " " + TimeElapse.unitList[index] + TimeElapse.diffList[this.diffType];
                out = TimeElapse.alias[newVal] === undefined ? newVal : TimeElapse.alias[newVal];
                break;
            }
        }
        return out;
    };
    TimeElapse.unitList = ["\u5E74", "\u4E2A\u6708", "\u5929", "\u5C0F\u65F6", "\u5206\u949F", "\u79D2"];
    TimeElapse.diffList = ["\u524D", "\u540E"];
    TimeElapse.alias = {
        "1 天前": "昨天",
        "1 年前": "去年",
        "1 天后": "明天",
        "1 年后": "明年"
    };
    return TimeElapse;
}());
