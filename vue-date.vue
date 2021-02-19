<template>
  <div class="mainBox">
    <Calendar
      :textTop="['日','一','二','三','四','五','六']"
      @choseDay="clickDay"
      :markDate="markDateArray"
      :agoDayHide="getStartDate(disDate[0])"
      :futureDayHide="disDate[1]"
      :sundayStart='true'>
    </Calendar>
  </div>
</template>
<script>
import Calendar from 'vue-calendar-component'
export default {
  name: 'vue-date',
  props:{
    markDate:{
      type:Array,
      default: []
    },
    disDate:{
      type:Array,
      default: []
    }
  },
  data () {
    return {
      markDateArray:[]
    }
  },
  components: {
    Calendar
  },
  created() {
    window.vuexxx = this
  },
  computed: {
    getStartDate:function (){
      return function (date){
        if (date == 0) return date
        let dateTime = new Date(parseInt(date) * 1000)
        debugger
        return (new Date(dateTime.setDate(dateTime.getDate() - 1)).getTime()/1000).toString()
      }
    }
  },
  methods: {
    clickDay (today) {
      if (~this.markDateArray.indexOf(today)){
        this.markDateArray.splice(this.markDateArray.indexOf(today),1)
      }else {
        this.markDateArray.push(today)
      }
    },
    restMarkDate(){
      this.markDateArray = this.markDate
    },
    returnData(){
      return this.markDateArray
    },
  }
}
</script>
<style lang="scss" scoped>
.mainBox {
  width:100%;
 ::v-deep{ .wh_content_all {
    border-radius:8px;
    border:2px solid #F0F0F0;
    background-color: white !important;
    .wh_top_changge li {
      color: #787878;
      .wh_jiantou1 {
        width: 12px;
        height: 12px;
        border-top: 2px solid #787878;
        border-right: 2px solid #787878;
        transform: rotate(-135deg);
      }
      .wh_jiantou2 {
        width: 12px;
        height: 12px;
        border-top: 2px solid #787878;
        border-right: 2px solid #787878;
        transform: rotate(45deg);
      }
    }
    .wh_content_item {
      height: 55px;
      color: #787878;
      .wh_item_date {
        color:#787878;
      }
      .wh_item_date:hover {
        border-radius: 50%;
        background-color: #409eff;
        color:white;
      }
      .wh_other_dayhide{
        color:#bfbfbf;
      }
      .wh_chose_day {
        background: white;
        color: #787878;
        //margin: auto;
        //border-radius: 10px;
        //background: #409eff;
        //color: white;
        //z-index: 2;
      }
      .wh_isToday{
        background: white;
        color: #409eff;
      }
      .wh_isMark {
        margin: auto;
        border-radius: 10px;
        background: #409eff;
        color: white;
        z-index: 2;
      }
      .wh_want_dayhide {
        color: #bfbfbf;
      }
    }
  }
  }
}
</style>
