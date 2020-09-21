import React, { useState, useContext } from 'react'
import { UserContext } from '../context/userContext'
import { Form, Input, Button } from 'antd';
import axios from 'axios';

const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 7 },
    textAlign: 'center'
};
const tailLayout = {
    wrapperCol: { offset: 9, span: 7 },

};

const Login = () => {
    const [, setUser] = useContext(UserContext)
    const [input, setInput] = useState({ email: "", password: "" })


    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post("https://backendexample.sanbersy.com/api/user-login", {
            email: input.email,
            password: input.password
        }).then(
            (res) => {
                console.log(res);
                var user = res.data.user
                var token = res.data.token
                var currentUser = { name: user.name, email: user.email, token }
                setUser(currentUser)
                localStorage.setItem("user", JSON.stringify(currentUser))

                // window.location = "/"
            }
        ).catch((err) => {
            alert(err);
        })
    }

    const handleChange = (e) => {
        let name = e.target.name
        console.log(name);
        let value = e.target.value
        switch (name) {
            case "email":
                setInput({ ...input, email: value })
                break;

            case "password":
                setInput({ ...input, password: value })
                break;

            default:
                break;
        }
    }


    return (
        <Form
            style={{ margin: 150, paddingLeft: 350, paddingRight: 350 }}
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onSubmitCapture={handleSubmit}
        >
            <h1 style={{ textAlign: "center", marginBottom: 40 }}>Login</h1>

            <strong>Email :</strong>
            <Input value={input.email} name="email" onChange={handleChange} type="email" required /><br /><br />

            <strong>Password :</strong>
            <Input.Password value={input.password} name="password" onChange={handleChange} required minLength={6} /><br /><br />

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Login
        </Button>
            </Form.Item>
        </Form>
    );
};

export default Login