import React from 'react';
import {Segment, Input, Button} from 'semantic-ui-react'
import UC from '@sdp.nd/js-uc-sdk'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:'',
            password:''
        }
        this.userChange = this.userChange.bind(this)
        this.passwordChange = this.passwordChange.bind(this)
        this.submit = this.submit.bind(this)
        this.getConnect = this.getConnect.bind(this)
    }

    userChange(e) {
        this.setState({user:e.target.value})
    }

    passwordChange(e) {
        this.setState({password:e.target.value})
    }

    submit() {
        // window.alert(this.state.user)
        // window.alert(this.state.password)
        this.getConnect()
    }

    getConnect() { //api请求函数
        
        var ucManager = new UC({ isMigrated: false, orgName: 'nd', env: 'product'})
        var user = this.state.user
        var password = this.state.password
        ucManager.isLogin().then(function (isLogin) {
            console.log(isLogin);
            if(isLogin === false) {
                console.log(user)
                console.log(password)
                ucManager.login(user, password).then(function(res) {// token信息
                    // 登录成功
                    console.log(res.user_id)
                    console.log(res.access_token)
                }).catch(function(err){
                    // 登录失败，返回原因
                    console.error(err)
                })
            }
        })
    
        // UC.createByDomainName().then(uc => {        // 推荐使用! 使用当前域名去 uc-eoms 系统查询登录配置信息登录
        //     return uc.isLogin().then(isLogin => {
        //       if (!isLogin) {
        //         // 1. 跳转至个人中心登录页，进行登录
        //         const loginPageURL = uc.getLoginPageURL({receiveUCKey: true, callbackURL: 'https://www.baidu.com'})
        //         window.location.href = loginPageURL
          
        //         // 2. 或者直接使用SDK进行登录
        //         uc.login(this.state.user, this.state.password)
        //         } else {
        //         // 已经登录过
          
        //         }
        //     })
        // })

        let text = {user:this.state.user, password:this.state.password} //获取数据
        let send = JSON.stringify(text); //重要！将对象转换成json字符串
        fetch('http://127.0.0.1:8081/password', {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body:send
        }).then(res => res.json()).then(
            data => {
                if(data.success) {
                    window.alert("验证成功，欢迎登录！")
                } else {
                    window.alert("验证失败，用户名或密码错误")
                }
            }
        )

    }

    render() {
        return(
            <div style={{margin:'10px'}}>
                <Segment style={{textAlign:'center'}}>
                    <h2>请登录</h2>
                    <Input 
                        id='user' 
                        placeholder='用户名' 
                        style={{marginBottom:'10px'}} 
                        onChange={this.userChange}
                    />
                    <br/>
                    <Input 
                        id='password' 
                        type='password' 
                        placeholder='密码' 
                        style={{marginBottom:'10px'}}
                        onChange={this.passwordChange}
                    />
                    <br/>
                    <Button 
                        primary 
                        content='登录' 
                        style={{marginBottom:'10px'}}
                        onClick={this.submit}
                    />
                    <Button 
                        content='重置' 
                        style={{marginLeft:'20px'}}
                    />
                </Segment>
            </div>
        )
    }
}

export default App;