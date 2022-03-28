<template>
  <div class="center">
    <table>
      <tr><th>number</th><th>cvv</th><th>person</th><th>date</th></tr>
      <tr v-for="item in info" :key="item.number">
        <td>{{item.number}}</td>
        <td>{{item.cvv}}</td>
        <td>{{item.person}}</td>
        <td>{{item.end_data}} </td></tr>
    </table>
  </div>
</template>

<script>
/*import {Axios} from "@/http-common";*/
import moment from 'moment'

export default {
  data() {
    return {
      cards:{
        numbers:["111111111111","7868687687687687"],
        cvvs:['111',"999"],
        persones:["asdasdsad","rty tryr"],
        dates:["Fri, 01 Dec 2023 00:00:00 GMT","Tue, 01 Nov 2011 00:00:00 GMT"],
      },
      info:{"cards":[{"cvv":172,"end_data":"Fri, 01 Dec 2023 00:00:00 GMT","id":1,"number":111111111111,"person":"asdasdsad"},{"cvv":111,"end_data":"Tue, 01 Nov 2011 00:00:00 GMT","id":2,"number":7777777777777777,"person":"JHG FGH"},{"cvv":999,"end_data":"Tue, 01 Nov 2011 00:00:00 GMT","id":3,"number":7868687687687687,"person":"JHG GHJ"},{"cvv":111,"end_data":"Tue, 01 Nov 2011 00:00:00 GMT","id":4,"number":7777777777777777,"person":"HJ HJK"},{"cvv":111,"end_data":"Tue, 01 Nov 2011 00:00:00 GMT","id":5,"number":7777777777777777,"person":"HJ HJK"},{"cvv":999,"end_data":"Tue, 01 Nov 2011 00:00:00 GMT","id":6,"number":7777777777777777,"person":"HJ HJK"},{"cvv":877,"end_data":"Tue, 01 Nov 2011 00:00:00 GMT","id":7,"number":7777777777777777,"person":"KJL JKL"},{"cvv":777,"end_data":"Mon, 01 Sep 2025 00:00:00 GMT","id":8,"number":7777777777777777,"person":"KJH HJK"},{"cvv":777,"end_data":"Tue, 01 Nov 2011 00:00:00 GMT","id":9,"number":777777777777777,"person":"KJH JHK"},{"cvv":999,"end_data":"Tue, 01 Nov 2011 00:00:00 GMT","id":10,"number":9999999999999998,"person":"KJH HJKL"}],"errors":false}
    };
  },
  methods:{
    async getData() {
/*      const response = await Axios.get(`/cards/`);
      this.info =response.data.cards

      let myTarget = JSON.parse(JSON.stringify(response.data.cards))
      this.info = myTarget

      for (let item of myTarget){
        this.cards.numbers.push(item.number)
        this.cards.cvvs.push(item.cvv)
        this.cards.persones.push(item.person)
        this.cards.dates.push(item.end_data)
      }*/
      this.changeData()
    },
    changeData(){

      let mainArr = JSON.parse(JSON.stringify(this.info)).cards

      for (let key in mainArr){
        mainArr[key].number = (mainArr[key].number+"").match(/.{1,4}/g).join('-')
        mainArr[key].end_data=moment(mainArr[key].end_data).format('MM/YY')
      }

      this.info=mainArr

    }
  },
  created() {
    this.getData()
  },
  mounted() {

  }
}
</script>

<style scoped>
.center{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}
th {
  font-weight: normal;
  color: #039;
  padding: 10px 15px;
}
td {
  color: #669;
  border-top: 1px solid #e8edff;
  padding: 10px 15px;
}
tr:hover td {
  background: #e8edff;
}
</style>