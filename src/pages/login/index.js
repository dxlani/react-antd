import React, { Component, Fragment } from 'react';
import './style.scss';
import auditionImg from '@/assets/icon-user-audition.png';
import { Form, Mentions, Icon, Input, Button, Checkbox, message } from 'antd';
// const { Option, getMentions } = Mentions;
class login extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }
    componentDidMount() {
        const { form } = this.props;
        form.setFieldsValue({
            username: "dxl",
        });
        form.validateFields();
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
    resetForm() {
        this.props.form.resetFields();
    }
    checkMention = (rule, value, callback) => {
        if (value.length > 6) {
            callback(new Error('密码最多6位密码'));
        } else {
            return callback();
        }


    };
    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field])
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <Fragment>
                <Form className="login-form" >
                    <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '用户名必填' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入用户名"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                        {getFieldDecorator('password', {
                            initialValue: "123",
                            rules: [{
                                required: true, message: '密码不能为空',
                            },
                            { min: 4, message: '密码至少4位', },
                            { validator: this.checkMention }
                            ],
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
                            initialValue: false,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <Button type="primary" className="login-form-button" disabled={this.hasErrors(getFieldsError())} onClick={this.handleSubmit} >
                            {/* <Button type="primary" className="login-form-button" disabled={this.hasErrors(getFieldsError())} htmlType="submit" > */}
                            登录
                        </Button>
                        <Button type="primary" className="login-form-button" onClick={this.resetForm} >
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </Fragment>
        )
    }


}
export default Form.create()(login);


