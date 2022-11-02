<template>
  <div>
    <upload-excel :on-success="handleSuccess" />
  </div>
</template>

<script>
import { reqUserBatch } from '@/api/employees'
export default {
  methods: {
    handleSuccess({ header, results }) {
      // console.log(header, results)
      const type = this.$route.query.type
      // console.log(type)
      if (type === 'user') {
        this.userBatch(header, results)
      }
    },
    async userBatch(header, results) {
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
          const enKey = userRelations[key]
          if (['timeOfEntry', 'correctionTime'].includes(enKey)) {
            obj[enKey] = this.formatExcelDate(res[key], '-')
          } else {
            obj[enKey] = res[key]
          }
        }
        // console.log(obj)
        arr.push(obj)
      })
      // console.log(arr)
      await reqUserBatch(arr)
      this.$message.success('恭喜批量导入成功')
      this.$router.push('/employees')
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
