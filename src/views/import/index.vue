<template>
  <div>
    <upload-excel :on-success="handleSuccess" />
  </div>
</template>

<script>
import { reqUserBatch } from '@/api/employees'
export default {
  methods: {
    async handleSuccess({ header, results }) {
      // console.log(header, results)
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const arr = []
      results.forEach(res => {
        const obj = {}
        // console.log(res)
        for (const key in res) {
          if (key === '入职日期') {
            console.log(this.formatExcelDate(res[key], '-'))
          }
          obj[userRelations[key]] = res[key]
        }
        // console.log(obj)
        arr.push(obj)
      })
      // console.log(arr)
      const res = await reqUserBatch(arr)
      console.log(res)
    },
    formatExcelDate(numb, format) {
      const time = new Date((numb) * 24 * 3600000 + 1) // 毫秒
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + (month < 10 ? '0' + month : month) + format + (date < 10 ? '0' + date : date)
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style>

</style>
