export const getTime = () => {
    const Hours = new Date().getHours()
    let message = ''
    if (Hours <= 9) {
        message = '早上好'
    } else if (Hours <= 11) {
        message = '上午好'
    } else if (Hours <= 13) {
        message = '中午好'
    } else if (Hours <= 18) {
        message = '下午好'
    }
    return message
}
