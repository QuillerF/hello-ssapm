/* * @Author: yuanxiongfeng * @Date: 2021-03-05 11:04:16 * @Last Modified by: yuanxiongfeng * @Last Modified time:
2021-03-05 11:05:12 */

<template>
  <div class="home">
    <el-input
      v-model="form.data"
      :rows="20"
      type="textarea"
      placeholder="请输入数据"
      clearable
      style="width: 500px"
    ></el-input>
    <el-input
      v-model="headers.sstoken"
      :rows="20"
      placeholder="请输入stoken"
      clearable
      style="width: 500px; margin-top: 20px"
    ></el-input>
    <el-button type="primary" class="post-btn" @click="toPostRequest"> 发送请求 </el-button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import API from '@/api/api'

export default defineComponent({
  name: 'HelloWorld',
  setup: () => {
    const form = ref({ data: '' })
    const headers = ref({
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      platform: 'pc',
      sstoken: '4e10d521-47e6-4893-a124-a10abe49d00e'
    })
    const sleep = (time: number) => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
      })
    }
    const toPostRequest = async () => {
      const list = JSON.parse(form.value.data)
      console.log(list)
      for (const el of list) {
        const { planId, projectId, instanceId, version } = el
        const params = {
          planId,
          projectId,
          instanceId,
          version,
          headers,
          status: 1
        }
        await API.PASS_CASE(params, { headers: headers.value })
        const num = (Math.random() * 60 + 3) * 1000
        await sleep(num)
        console.log('执行一次循环')
      }
      console.log('执行完毕!')
    }
    return { form, headers, toPostRequest }
  }
})
</script>

<style lang="scss" scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .post-btn {
    margin-top: 30px;
    flex-shrink: 0;
  }
}
</style>
