/**
 * 时间差计算类
 * 
 * @author Charles
 * @since 2020-5-3
 * @version 1.0
 */
class TimeElapse {

    private delta: number;

    private static unitList = [`年`, `个月`, `天`, `小时`, `分钟`, `秒`];

    private static diffList = [`前`, `后`];

    private diffType: number;

    private static alias = {
        "1 天前": "昨天",
        "1 年前": "去年",
        "1 天后": "明天",
        "1 年后": "明年"
    };

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
    public constructor(date1: Date, date2?: Date) {
        
        if (date2 === undefined) {
            date2 = date1;
            date1 = new Date();
        }

        this.delta = Math.abs(date1.getTime() - date2.getTime());
        this.diffType = date1.getTime() < date2.getTime() ? 1 : 0;
    }

    toString(): string {

        const dateDelta = this.delta;

        let seconds = dateDelta / 1000;
        const minutes = seconds / 60;
        const hours = minutes / 60;
        const days = hours / 24;
        const months = days / 30;
        const years = days / 365;

        if (seconds <= 0) {
            seconds = 1;
        }

        const deltaList = [Math.floor(years), Math.floor(months), Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(seconds)];

        var out: string = "";

        for (let index in deltaList) {
            if (deltaList[index] > 0) {
                const newVal = `${deltaList[index]} ${TimeElapse.unitList[index]}${TimeElapse.diffList[this.diffType]}`;
                
                out = TimeElapse.alias[newVal] === undefined ? newVal : TimeElapse.alias[newVal];
                break;
            }
        }

        return out;
    }

}