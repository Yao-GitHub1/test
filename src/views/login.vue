<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="left">
        <div class="inner">
          <img src="../assets/logo.jpg" />
          <p> WLLCOME TO STAFF BUS SYSTEM</p>
        </div>
      </div>
      <div class="right">
        <div class="inner">
          <h2>登录</h2>
          <iForm :formModel="formModel" :formData="formData" ref="iform"></iForm>
          <br>
          <el-button type="primary" class="login-btn" @click="goLogin">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.js" 
  integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
  crossorigin="anonymous"></script>
<script>
  import {mapMutations} from 'vuex';
  const layOut = {
    xlSpan: 24,
    colSpan: 24,
    mdSpan: 24,
    smSpan: 24,
  }
  export default {
    name: 'login',
    data() {
      return {
        formData: {},
        formModel: [{
            elemType: 'input',
            placeholder: '请输入手机号',
            label: '',
            prop: 'userName',
            rules: ['required'],
            ...layOut
          },
          {
            elemType: 'input',
            placeholder: '请输入密码',
            label: '',
            prop: 'password',
            type: 'password',
            rules: ['required'],
            ...layOut
          }
        ]
      }
    },
    methods: {
      ...mapMutations(['changeLogin']),
      async goLogin() {
        // var valid = await this.$refs.iform.validate()
        // // this.$refs.iform.setFormData({userName: 135332335})
        // if (!valid) return
        var formdata = this.$refs.iform.getFormData()
        var valid = this.$refs.iform.validate()
        if (!valid) return
        else {
          let json = {
            UserName: formdata.userName,
            Password: formdata.password
          }
          var url = '/api/Admin_Login/Login'
          this.$axios.post(url, json, {
            emulateJSON: true
          }).then(response => {
            console.log(response.data);
            if (response.data.Code == 200) {
              // 将用户token保存到vuex中
              this.userToken = 'Bearer ' + response.data.ResultsData.Token;
              this.changeLogin({Authorization: this.userToken});
              this.$router.push("/home")
            } else
              alert(response.data.Msg)
            console.log(response.data.Msg)
          }, response => {
            // error callback
            console.log(response.data);
          });
        }
      }
    }
  }
</script>
<style lang="less">
  .login {
    width: 100%;
    height: 100%;
    position: relative;

    .login-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -457px;
      margin-top: -200px;
      height: 330px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      box-sizing: border-box;
      padding: 10px;

      .left {
        box-sizing: border-box;
        padding-right: 20px;
        width: 50%;
        text-align: right;
        float: left;

        .inner {
          display: inline-block;
          text-align: center;
        }

        img {
          width: 230px;
          height: 230px;
        }

        p {
          font-size: 30px;
          color: #fbbe60;
          font-weight: 600;
          font-family: Georgia, 'Times New Roman', Times, serif;
        }
      }

      .right {
        float: right;
        width: 50%;
        height: 100%;
        border-left: 1px solid #e5e5e5;
        box-sizing: border-box;
        padding: 20px;

        .inner {
          width: 300px;

          .el-form-item {
            margin-bottom: 24px;
          }

          h2 {
            padding-left: 60px;
            font-weight: 400;
            margin-bottom: 30px;
            text-align: center;
            letter-spacing: 5px;
          }

          .login-btn {
            width: 240px;
            margin-left: 60px;
          }
        }
      }
    }
  }
</style>
