<template>
  <div>
    <!-- 工作日历, 年和月 -->
    <div class="select-box">
      <el-select v-model="currentYear" size="small" style="width: 120px; margin-right: 10px" @change="changeHandle">
        <!-- 年份取给定年份的, 前五年 + 后五年 -->
        <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="currentMonth" size="small" style="width: 120px;" @change="changeHandle">
        <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
      </el-select>
    </div>
    <!-- { "isSelected": true, "type": "current-month", "day": "2022-11-03" } -->
    <el-calendar v-model="currentDate">
      <template #dateCell="{ data, date }">
        <div class="date-content">
          <span class="text">{{ data.day | time }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {
    time(val) {
      const str = val.split('-')[2]
      return str.startsWith('0') ? str.slice(1) : str
    }
  },
  props: {
    startDate: {
      type: Date,
      default: () => {
        return new Date()
      }
    }
  },
  data() {
    return {
      currentYear: null, // 当前年份
      currentMonth: null, // 当前月份
      currentDate: null
    }
  },
  computed: {
    yearList() {
      return Array.from({ length: 11 }, (item, index) => this.currentYear + index - 5)
    }
  },
  watch: {
    currentDate(newValue) {
      this.currentYear = newValue.getFullYear()
      this.currentMonth = newValue.getMonth() + 1
    }

  },
  created() {
    this.currentYear = this.startDate.getFullYear() // 得到当前年份
    this.currentMonth = this.startDate.getMonth() + 1 // 当前月份
    this.changeHandle()
  },
  methods: {
    isWeek(date) {
      return [0, 6].includes(date.getDay())
    },
    changeHandle() {
    //   console.log(this.currentYear, this.currentMonth)
      this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}-01`)
    }
  }
}
</script>

<style lang="scss" scoped>
.select-box {
  display: flex;
  justify-content: flex-end;
}

::v-deep .el-calendar-day {
  height:  auto;
 }
::v-deep .el-calendar-table__row td::v-deep .el-calendar-table tr td:first-child, ::v-deep .el-calendar-table__row td.prev{
  border: none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
::v-deep .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
::v-deep .el-calendar__header {
   display: none
}
</style>
