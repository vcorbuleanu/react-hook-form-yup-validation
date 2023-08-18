import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Form, Input, DatePicker, Button} from 'antd';

const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    dob: yup.date().nullable().required('Date of Birth is required'),
});

const RegistrationForm = () => {
    const {handleSubmit, control, formState, trigger} = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <Form.Item
                label="Username"
                help={formState.errors.username?.message}
                validateStatus={formState.errors.username?.message ? 'error' : ''}
            >
                <Controller
                    name="username"
                    control={control}
                    render={({field}) => (
                        <Input
                            {...field}
                            onChange={(event) => {
                                field.onChange(event);
                                trigger('username').then(); // Trigger validation
                            }}
                            onBlur={() => {
                                trigger('username').then(); // Trigger validation on blur
                            }}
                        />
                    )}
                />
            </Form.Item>

            <Form.Item
                label="Email"
                help={formState.errors.email?.message}
                validateStatus={formState.errors.email?.message ? 'error' : ''}
            >
                <Controller
                    name="email"
                    control={control}
                    render={({field}) => (
                        <Input
                            {...field}
                            onChange={(event) => {
                                field.onChange(event);
                                trigger('email').then(); // Trigger validation
                            }}
                            onBlur={() => {
                                trigger('email').then(); // Trigger validation on blur
                            }}
                        />
                    )}
                />
            </Form.Item>

            <Form.Item
                label="Date of Birth"
                help={formState.errors.dob?.message}
                validateStatus={formState.errors.dob?.message ? 'error' : ''}
            >
                <Controller
                    name="dob"
                    control={control}
                    render={({field}) => (
                        <DatePicker
                            {...field}
                            style={{width: '100%'}}
                            onChange={(date) => {
                                field.onChange(date);
                                trigger('dob').then(); // Trigger validation
                            }}
                            onBlur={() => {
                                trigger('dob').then(); // Trigger validation on blur
                            }}
                        />
                    )}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" disabled={formState.isSubmitting}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegistrationForm;