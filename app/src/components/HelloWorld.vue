<template>
  <div class="hello">
    <!-- <form action="#" id="form">
      <input type="file" id="file" name="file" @change="handleFiles()">
    </form>
    <iframe id="fileContent" :src="fileUrl" v-if="isPreview" width="500" height="300" frameboder="0"></iframe>
    <div id="table"></div>
    <el-button color="#626aef" style="color: white">Custom</el-button> -->
    <h1>VUE聊天室</h1>
    <div id="div" class="div"></div>
    <input v-model="value" type="text" style="width: 800px;height: 30px" placeholder="请输入内容">
    <button style="width: 200px;height: 35px;background: rgb(0,187,136);border: none;color: #fff" @click="sendBtn">发送</button>
  </div>
</template>

<script>
// import XLSX from 'xlsx'
const type = {
  enter: 0,
  message: 1,
  leave: 2
}
export default {
  data() {
    return {
      isPreview: false,
      fileUrl: '',
      value: '',
      socket: ''
    }
  },
  mounted() {
    this.socket = new WebSocket('ws://localhost:8001')
    // this.socket.onopen = () => {
    //   const div = document.getElementById('div')
    //   const newDiv = document.createElement('div')
    //   newDiv.innerHTML = '进入聊天室'
    //   newDiv.style.color = 'green'
    //   div.appendChild(newDiv)
    // }
    this.socket.onmessage = (e) => {
        const data = JSON.parse(e.data)
        const div = document.getElementById('div')
        const newDiv = document.createElement('div')
        newDiv.innerHTML = data.message + '----' + data.time
        if (data.type === type.enter) {
          newDiv.style.color = 'green'
        } else if (data.type === type.leave) {
          newDiv.style.color = 'red'
        } else {
          newDiv.style.color = '#a1a1a1'
        }
        div.appendChild(newDiv)
        this.$nextTick(() => {
          div.scrollTo(0, div.scrollHeight)
        })
    }
  },
  methods: {
    handleFiles() {
      // const file = document.getElementById('form')
      // const div = document.getElementById('table')
      // const formData = new FormData(file)
      // console.log(formData.get('file'))
      // const data = formData.get('file')
      // const blob = new Blob([data], {type: 'application/vnd.ms-excel'})
      // const fileUrl = URL.createObjectURL(blob)
      // console.log(fileUrl)
      /*
      通过二进制blob对象,生成url,用 <a> 标签的下载功能下载
      const a = document.createElement('a')
      a.download = ''
      a.href = fileUrl
      a.innerHTML = '下载'
      document.body.append(a)
      */

     // excel预览
      // const reader = new FileReader()
      // reader.readAsBinaryString(blob)
      // reader.onload = function(e) {
      //   console.log('read', e.target.result)
      //   const file = e.target.result
      //   const data = XLSX.read(file, {type: 'binary'})
      //   console.log(123,data)
      //   const sheet = data.Sheets[data.SheetNames[0]]
      //   div.innerHTML = XLSX.utils.sheet_to_html(sheet)
      // }
    },
    sendBtn() {
      this.socket.send(this.value)
      this.value = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#table table{
  border: 1px solid;
}
.div{
  width: 1000px;
  height: 300px;
  overflow: auto;
  border: 1px solid;
  margin: 20px auto;
  text-align: left;
}
</style>
