import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, Spin} from 'antd';
import React, { useState } from 'react';
import {addNewStudent} from "./client";
import {successNotification} from "./Notification";
const { Option } = Select;
const StudentDrawerForm = ({showDrawer, setShowDrawer, fetchStudents}) => {
    const [submitting, setSubmitting] = useState(false);
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
            }}
            spin
        />
    );

    const onClose = () => setShowDrawer(false)
    const onFinish = (student) => {
        setSubmitting(true)
        addNewStudent(student)
            .then(() => {
                onClose()
                fetchStudents();
                successNotification("Student successfully added",
                    `${student.name} was added to the system`)
            }
            ).catch(err => {
                console.log(err);
            }).finally(()=> {
                setSubmitting(false);
            }
            )
    };

    const onFinishFailed = (error) => {
        alert(JSON.stringify(error, null, 2))
    }

    return (
        <>
            <Drawer
                title="Create a new account"
                width={720}
                onClose={onClose}
                visible={showDrawer}
                bodyStyle={{
                    paddingBottom: 80,
                }}

            >
                <Form layout="vertical"
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      requiredMark={true}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter name',
                                    },
                                ]}
                            >
                                <Input placeholder="Name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Email',
                                    },
                                ]}
                            >
                                <Input
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Email"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="gender"
                                label="Gender"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select a gender',
                                    },
                                ]}
                            >
                                <Select placeholder="Gender">
                                    <Option value="MALE">Male</Option>
                                    <Option value="FEMALE">Female</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button htmlType="submit" type="primary">
                            Submit
                        </Button>
                    </Space>
                    <Row>
                        {submitting && <Spin indicator={antIcon} />}
                    </Row>
                </Form>

            </Drawer>
        </>
    );
};
export default StudentDrawerForm;