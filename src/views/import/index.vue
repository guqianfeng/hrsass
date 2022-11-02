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
          obj[userRelations[key]] = res[key]
        }
        // console.log(obj)
        arr.push(obj)
      })
      // console.log(arr)
      const res = await reqUserBatch(arr)
      console.log(res)
    }
  }
}
</script>

<style>

</style>
