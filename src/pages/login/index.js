import React, { Component, Fragment } from 'react';
import './style.scss';
import auditionImg from '@/assets/icon-user-audition.png';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

class login extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }
    componentDidMount() {

    }
    handleSubmit = e => {
        e.preventDefault();
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            console.log('values', values)
            if (!err) {
                message.success(`${userInfo.username}欢迎您 ，当前密码为：${userInfo.password}`)

            }
        })
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Fragment>
                <Form className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入用户名"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="请输入密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <Button type="primary" className="login-form-button" onClick={this.handleSubmit}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Fragment>
        )
    }


}
export default Form.create()(login);


