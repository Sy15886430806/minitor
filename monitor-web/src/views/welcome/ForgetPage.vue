<template>
  <div style="text-align: center; margin: 0 20px">
    <div>
      <div style="font-size: 25px;font-weight: bold">重置密码</div>
    </div>
    <div style="margin-top: 20px">
      <el-form :model="form" :rules="rule" ref="formRef">
        <el-form-item prop="email">
          <el-input v-model="form.email" type="text" placeholder="电子邮件">
            <template #prefix>
              <el-icon>
                <Message/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="20">
            <el-col :span="17">
              <el-input v-model="form.code" maxlength="6" type="text" placeholder="请输入验证码">
                <template #prefix>
                  <el-icon>
                    <EditPen/>
                  </el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="5">
              <el-button type="primary" class="siyuan-button color-button" @click="askCode"
                         :disabled="!isEmailValid || code_time">
                {{ code_time > 0 ? `${code_time}秒可重试` : '获取验证码' }}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" maxlength="20" type="password" placeholder="新密码">
            <template #prefix>
              <el-icon>
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password_repeat">
          <el-input v-model="form.password_repeat" maxlength="20" type="password" placeholder="重复密码">
            <template #prefix>
              <el-icon>
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="grid-content ep-bg-purple" style="margin-top: 40px">
      <el-button @click="reset" style="width: 150px" type="primary" class="siyuan-button color-button">立即重置
      </el-button>
    </div>
    <div style="margin-top: 20px ">
      <span style="font-size: 13px;line-height: 15px;color: grey">已有账号？</span>
      <el-link style="translate: 0 -2px" @click="router.push('/')">立即登录</el-link>
    </div>
  </div>

</template>

<script setup>

import {computed, reactive, ref} from "vue";
import {EditPen, Lock, Message, User, View} from "@element-plus/icons-vue";
import router from "@/router";
import {ElMessage} from "element-plus";
import {get, post} from '@/net'

const code_time = ref(0)
const formRef = ref()

const form = reactive({
  email: '',
  code: '',
  password: '',
  password_repeat: ''
})

const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== form.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const rule = {
  email: [
    {required: true, message: '请输入邮件地址', trigger: 'blur'},
    {type: 'email', message: '请输入合法的电子邮件地址', trigger: ['blur', 'change']}
  ],
  code: [
    {required: true, message: '请输入验证码', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 20, message: '密码的长度必须在6-20个字符之间', trigger: ['blur', 'change']}
  ],
  password_repeat: [
    {validator: validatePassword, trigger: ['blur', 'change']},
  ]
}

function askCode() {
  if (isEmailValid) {
    code_time.value = 60
    const timer = setInterval(() => {
      if (code_time.value > 0) {
        code_time.value--
      } else {
        clearInterval(timer) // 清除计时器
      }
    }, 1000);
    get(`api/auth/ask-code?email=${form.email}&type=register`,
        () => {
          ElMessage.success(`验证码已发送到邮箱: ${form.email}`);
        },
        (message, code, url) => {
          console.warn(`发送失败：${message}, 状态码：${code}, 接口：${url}`);
          ElMessage.error(`验证码发送失败：${message}`);
          clearInterval(timer)
          code_time.value = 0
        }
    );
  } else {
    ElMessage.warning('请输入正确的电子邮件');
    code_time.value = 0
  }
}

const isEmailValid = computed(() => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email))


function reset() {
  formRef.value.validate((isValid) => {
    if (isValid) {
      post('/api/auth/reset-password', {
        email: form.email,
        code: form.code,
        password: form.password
      }, () => {
        ElMessage.success('密码重置成功，请重新登录')
        router.push('/')
      })
    }
  })
}

</script>

<style scoped>

.grid-content {
  border-radius: 4px;
  min-height: 8px;
}

.siyuan-button {
  font-family: 'Noto Serif SC', serif;
}

</style>