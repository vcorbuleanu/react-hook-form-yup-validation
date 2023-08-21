import React, {useEffect, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Form, Input, DatePicker, Button} from 'antd';

const RegistrationForm = () => {
    const onSubmit = (data) => {
        console.log(data);
    };

    const [showDob, setShowDob] = useState(false);

    const schema = yup.object().shape({
        username: yup.string().required('Username is required'),
        email: yup.string().email('Invalid email'),//.required('Email is required'),
        ...(showDob
            ? {
                dob: yup.date().nullable().required('Date of Birth is required'),
            }
            : {}),
    });

    // You could verify the visibility of multiple elements in here, and use this function in the onBlur and onChange
    // of all the elements in your form which are dependencies for other elements.
    const checkElementsVisibility = () => {
        setShowDob(!formState.errors.email && getValues('email') !== '');
    }

    const {handleSubmit, control, formState, getValues, resetField, trigger} = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (!showDob)
            resetField('dob');
    }, [showDob, resetField]);

    // This will show us the validity of the form every time formState changes.
    useEffect(() => {
        console.log('Form Validity: ', formState.isValid);
    }, [formState]);

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
                                trigger('username').then(); // Trigger validation onChange
                                checkElementsVisibility();

                            }}
                            onBlur={() => {
                                field.onBlur();
                                trigger('username').then(); // Trigger validation onBlur
                                checkElementsVisibility();
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
                                trigger('email').then(); // Trigger validation onChange
                                checkElementsVisibility();
                            }}
                            onBlur={() => {
                                field.onBlur();
                                trigger('email').then(); // Trigger validation onBlur
                                checkElementsVisibility();
                            }}
                        />
                    )}
                />
            </Form.Item>
            {showDob && (
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
                                    trigger('dob').then(); // Trigger validation onChange
                                }}
                                onBlur={() => {
                                    field.onBlur();
                                    trigger('dob').then(); // Trigger validation onBlur
                                }}
                            />
                        )}
                    />
                </Form.Item>
            )}
            <Form.Item>
                <Button type="primary" htmlType="submit" disabled={formState.isSubmitting}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegistrationForm;
