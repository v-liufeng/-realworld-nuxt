import Vue from 'vue'
import dayjs from "dayjs"

// 时间过滤器
Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
    return dayjs(value).format(format)
})
