<template>
  <div>
    <mu-appbar title="150班同学聚会投票系统">
      <mu-icon-button icon="face" slot="left"/>
    </mu-appbar>
    <mu-table multiSelectable ref="table" id="table">
      <mu-thead>
        <mu-tr>
          <mu-th>新历</mu-th>
          <mu-th>农历</mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr>
          <mu-td>John Smith</mu-td>
          <mu-td>Employed</mu-td>
        </mu-tr>
        <mu-tr>
          <mu-td>Randal White</mu-td>
          <mu-td>Unemployed</mu-td>
        </mu-tr>
        <mu-tr>
          <mu-td>Stephanie Sanders</mu-td>
          <mu-td>Employed</mu-td>
        </mu-tr>
        <mu-tr>
          <mu-td>Steve Brown</mu-td>
          <mu-td>Employed</mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>
    <mu-raised-button label="提交" fullWidth primary id="submit"/>
    <footer>Developed by Fitzz</footer>
    <mu-dialog :open=true title="请输入姓名">
      <mu-text-field hintText="中文完整名字"/><br/>
      <mu-flat-button slot="actions" primary label="确定"/>
    </mu-dialog>
  </div>
</template>

<script>
export default {
  name: 'App'
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
