import dayjs from 'dayjs'
export const formatTime = (value, str = 'YYYY-MM-DD') => dayjs(value).format(str)
