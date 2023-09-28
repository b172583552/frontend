import { Button, notification, Space } from 'antd';
import React from 'react';
const openNotificationWithIcon = (type, msg, description) => {
    notification[type]({message: msg,description: description});
};

export const successNotification = (message,description) => {
    openNotificationWithIcon('success',message, description);
}

export const errorNotification = (message,description) => {
    openNotificationWithIcon('error',message, description);
}

export const warningNotification = (message,description) => {
    openNotificationWithIcon('warning',message, description);
}

export const infoNotification = (message,description) => {
    openNotificationWithIcon('info',message, description);
}