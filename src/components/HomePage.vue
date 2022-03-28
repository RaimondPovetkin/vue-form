<template>
  <div>
    <p>Введите данные карты:</p>
    <div class="form">
      <div class="form__content">
        <div class="form__number-card">
          <label>Number:</label>
          <div class="error-input">
            <input type="text" placeholder="number" v-mask="'####-####-####-####'" v-model='form.userNumber' class="form__number-card-input">
            <div class="input-errors" >
              <div class="error-msg">{{ this.form.numberError}}</div>
            </div>
          </div>
        </div>
        <div class="form__data-card">
          <div class="cvv__block">
            <label>CVV:</label>
            <input type="text" placeholder="CVV" v-mask="'###'" v-model="form.userCVV" class="form__cvv-card-input">
            <div class="input-errors" >
              <div class="error-msg">{{ this.form.cvvError}}</div>
            </div>
          </div>
          <div class="date__block">
            <label>Date:</label>
            <div class="error-input">
              <input type="tel" placeholder="mm/yy" class="form__date-card-input" v-mask="'##/##'" v-model="form.userDate"  name="">
              <div class="input-errors" >
                <div class="error-msg">{{ this.form.dateError}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="form__name-card">
          <label>Name:</label>
          <input type="text" placeholder="NAME" class="form__name-card-input"  @input="form.userName = $event.target.value.toUpperCase()" v-model="v$.form.userName.$model" name="">
          <div class="input-errors" v-for="(error, index) of v$.form.userName.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="main__button" @click="submitChanges">
      <input class="button"  type="button" value="Отправить">
    </div>
    <p class="errorPageMess">{{errorPage}}</p>

  </div>
</template>

<script>
import {Axios} from '@/http-common';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export function validName(name) {
  let validNamePattern = new RegExp("^[A-Z]+(?:[-'\\s][A-Z]+)*$");
  if (validNamePattern.test(name)){
    return true;
  }
  return false;
}


export default {

  setup () {
    return { v$: useVuelidate() }
  },

  data(){
    return {
      form:{
        userName: '',
        userNumber:'',
        userCVV:'',
        userDate:'',
        cvvError:'',
        numberError:'',
        dateError:""
      },
      valid:1,
      errorPage:''
    };
  },

  validations() {
    return {
      form:{
        userName: {
          required, name_validation: {
            $validator: validName,
            $message: 'Только латинские буквы'
          }
        },
      }
    }
  },
  methods:{
    submitChanges(){
      this.valid=1

      function regValid(str,reg) {
        return (reg.test(str))
      }

      let dateArr=this.form.userDate.split('/')
      dateArr[1]="20"+dateArr[1]

      let data ={
        number : this.form.userNumber.split('-').join(''),
        cvv:this.form.userCVV,
        end_data:dateArr[1]+"-"+dateArr[0]+"-01",
        person:this.form.userName
      }

      let validCVVPattern = new RegExp("[0-9]{3}");
      let validDatePattern = new RegExp("[0-9]{2}/[0-9]{2}");
      let validNumberPattern = new RegExp("[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}")
      let validSTRPattern = new RegExp("[^A-Z]")

      /*проверка cvv регулярным*/
      if(!regValid(this.form.userCVV,validCVVPattern)){
        this.valid=false
        this.form.cvvError="Enter right CVV"
      }
      else {
        this.form.cvvError=""
      }

      /*проверка номера регулярным*/
      if(!regValid(this.form.userNumber,validNumberPattern)){
        this.valid=false
        this.form.numberError="Enter right number"
      }
      else {
        this.form.numberError=""
      }

      /*проверка даты регулярным*/
      if(!regValid(this.form.userDate,validDatePattern)){
        this.valid=false
        this.form.dateError="Enter right date"
      }
      else {
        this.form.dateError=""
      }

      /*проверка месяца*/
      if(this.form.userDate.split('/')[0]>12){
        this.valid=false
      }

      let nameArray=this.form.userName.split(' ')

      if(nameArray.length !=2){
        this.valid=false
      }

      /*проверка на строку*/
      for (let i = 0; i < nameArray.length; i++) {
        if(regValid(nameArray[i],validSTRPattern)){
          this.valid=false
        }
      }
      let json = JSON.stringify(data);
      console.log(json)

      if(this.valid){
        Axios.post(`/cards/`,json, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
            .then(response=>{
              console.log(response);
              this.errorPage="Success"
            })
            .catch(error=>{
              console.log(error);
              this.errorPage="Error"
            })
      }






    }
  },
  watch: {

  },
}

</script>

<style>
.errorPageMess{
  color: red;
}
.error-input{
  display: flex;
  flex-direction: column;
}
.error-msg{
  color: red;
}
.cvv__block{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
*{
  font-family: Geneva, Arial, Helvetica, sans-serif;
}
label{
  font-size: 19px;
  color:white;
  font-weight: 600;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.form{
  margin: 0 auto;
  width: 50%;
  height: 400px;
  background-color: #42b983;
  border-radius: 10px;
  box-shadow: 0px 0px 27px 14px rgba(34, 60, 80, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.form__content{
  width: 80%;
  height: 80%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
}
.form__number-card-input{
  border-radius: 5px;
  border:none;
  margin: 0px 10px;
  width: 400px;
  padding: 10px;
}
.form__name-card-input{
  margin: 0px 10px;
  width: 300px;
  padding: 10px;
  border-radius: 5px;
  border:none;
}
.form__cvv-card-input{
  margin: 0px 10px;
  width: 100px;
  padding: 10px;
  border-radius: 5px;
  border:none;
}
.form__data-card{
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.form__date-card-input{
  margin: 0px 10px;
  width: 100px;
  padding: 10px;
  border-radius: 5px;
  border:none;
}
.main__button{
  margin-top: 50px;
}
.button{
  padding: 20px;
  background-color: #42b983;
  color: aliceblue;
  font-size: 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}
.button:hover{
  cursor: pointer;
  background-color: #337f5e;
}
</style>