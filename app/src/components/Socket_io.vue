<template>
  <div>Socket.io + VUE 聊天室</div>
  <div id="messageBox"></div>
  <input v-model="value" class="input" type="text" placeholder="请输入内容" @keyup.enter="sendBtn">
  <button class="btn" @click="sendBtn">发送</button>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'Socket_io',
  data() {
    return {
      value: '',
      socket: ''
    }
  },
  mounted() {
    const div = document.getElementById('messageBox')
    this.socket = io('http://localhost:12138')
    this.socket.on('message', data => {
      const newDiv = document.createElement('div')
      console.log(data)
      newDiv.innerHTML = data
      div.appendChild(newDiv)
      this.$nextTick(() => {
        div.scrollTo(0, div.scrollHeight)
      })
    })
  },
  methods: {
    sendBtn() {
      this.socket.emit('send', this.value)
      this.value = ''
    }
  }
}
</script>

<style scoped>
  #messageBox{
    width: 1000px;
    height: 300px;
    overflow: auto;
    border: 1px solid;
    margin: 20px auto;
    text-align: left;
  }
  .input{
    width: 800px;
    height: 30px;
  }
  .btn{
    width: 180px;
    height: 30px;
    box-sizing: content-box;
    background: rgb(0,187,136);
    border-color: rgba(0,187,136,0.5);
    color: #fff
  }
  .btn:hover{
    background: rgba(0,187,136,0.8)
  }
</style>