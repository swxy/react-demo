/**
 * @file 自定义form验证
 * Created by swxy on 2017/4/15.
 */

import React, {Component} from 'react';
import {Form, Input, Select, InputNumber, Button} from 'antd';
import AsyncValidator from 'async-validator';
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 12
    },
};

export default class CustomForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 保存FormItem中子组件值，校验状态，规则等。
            // 格式 {compName: {value: '', help: '', required: ''}}
            fields: {}
        };
    }

    componentWillMount() {
        const fields = {
            email: {
                required: true,
                rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                }, {
                    required: true, message: 'Please input your E-mail!',
                }]
            },
            age: {
                required: false,
                value: 12
            },
            country: {
                required: true,
                rules: [{ required: true, message: 'Please select a counter!' }]
            }
        };
        this.setState({fields});
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="For Email" {...this.getStatus('email')} {...formItemLayout}>
                    <Input name="email" {...this.getProps('email')}/>
                </FormItem>
                <FormItem label="For Age" {...this.getStatus('age')} {...formItemLayout}>
                    <InputNumber name="age" {...this.getProps('age')}/>
                </FormItem>
                <FormItem label="For Country" {...this.getStatus('country')} {...formItemLayout}>
                    <Select name="country" {...this.getProps('country')} placeholder="Please select a country">
                        <Option value="china">China</Option>
                        <Option value="use">U.S.A</Option>
                    </Select>
                </FormItem>
                <FormItem
                    wrapperCol={{ span: 16, offset: 6}}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>
            </Form>
        )
    }

    handleSubmit(e) {
        e.preventDefault();
        this.validate((errors, values) => {
            if (!errors) {
                console.log('submit data', values);
            }
        });
    }

    getStatus(name) {
        const field = this.state.fields[name];
        if (!field) {
            return {};
        }
        return {
            required: field.required,
            help: field.help,
            validateStatus: field.validateStatus
        };
    }

    getProps(name) {
        const field = this.state.fields[name];
        if (!field) {
            return {};
        }
        return {
            value: field.value,
            onChange: this.onChange.bind(this, name)
        };
    }

    onChange(name, event) {
        const value = event.target ? event.target.value : event;
        console.log('component -> ', name, value);
        const fields = this.state.fields;
        Object.assign(fields[name], {value});
        this.setState({fields});
    }

    validate(callback) {
        const fields = this.state.fields;
        const fieldsKey = Object.keys(fields);
        const setState = this.setState.bind(this);
        const descriptor = {}; // 保存验证规格
        const values = {}; // 表单输入
        fieldsKey.forEach(key => {
            if (fields[key].rules) {
                descriptor[key] = fields[key].rules;
            }
            values[key] = fields[key].value;
        });
        const validator = new AsyncValidator(descriptor);
        validator.validate(values, (errors) => {
            // 清空一下验证信息
            fieldsKey.forEach(key => {
                Object.assign(fields[key], {
                    validateStatus: 'success',
                    help: ''
                })
            });
            if (errors) {
                console.log(errors);
                errors.forEach(error => {
                    const {field, message} = error;
                    Object.assign(fields[field], {
                        validateStatus: 'error',
                        help: message
                    })
                });
            }
            else {
                console.log('validate success');
            }
            setState({fields});
            callback(errors, values);
        })
    }
}