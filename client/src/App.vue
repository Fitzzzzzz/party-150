<template>
  <div>
    <mu-appbar title="150班同学聚会投票系统">
      <mu-icon-button icon="face" slot="left"/>
    </mu-appbar>
    <mu-table multiSelectable ref="table" id="table" @rowSelection="rowSelection">
      <mu-thead>
        <mu-tr>
          <mu-th>新历</mu-th>
          <mu-th>农历</mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr v-for="item in date" :key="item.id">
          <mu-td>{{item.newDay}}</mu-td>
          <mu-td>{{item.oldDay}}</mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>
    <mu-raised-button label="提交" fullWidth primary id="submit" @click="save"/>
    <footer>Developed by Fitzz</footer>
    <mu-dialog :open="hadLogin" title="请输入姓名">
      <mu-text-field hintText="中文完整名字" v-model="name" :errorText="errText"/><br/>
      <mu-flat-button slot="actions" primary label="确定" @click="tokenCheck"/>
    </mu-dialog>
    <mu-dialog :open="done" title="提示">
      {{doneHint}}
      <mu-flat-button label="关闭" slot="actions" primary @click="reload"/>
    </mu-dialog>
  </div>
</template>

<script>
import valDate from '../../valuableDate'
export default {
  name: 'App',
  data () {
    return {
      name: '',
      date: valDate,
      hadLogin: true,
      done: false,
      doneHint: '',
      errText: '',
      time: []
    }
  },
  methods: {
    tokenCheck () {
      this.$http.get(`/api/token?name=${this.name}`).then(response => {
        response.data.errcode === 0 ? this.hadLogin = false : this.errText = '该同学已经投过票'
      })
    },
    rowSelection (selectedRowsIndex) {
      this.time = selectedRowsIndex
    },
    save () {
      let body = {
        name: this.name,
        time: this.time
      }
      this.$http.post('/api/save', body).then(response => {
        this.done = true
        this.doneHint = response.data.msg
      })
    },
    reload () {
      window.location.reload()
    }
  }
}
</script>

<style scoped>
  footer {
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 300px;
    margin: 0 auto;
  }
  #submit {
    margin-top: 30px;
  }
  #table {
    border: 1px solid gainsboro;
  }
</style>
