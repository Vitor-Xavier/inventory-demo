import { EyeInvisibleOutlined } from '@ant-design/icons';
import { Button, Col, message, Popconfirm, Row, Space, Tag } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Breadcrumb from '../../components/breadcrumb/breadcrumb.component';
import { Column, getDefaultActionsColumn } from '../../components/table/table.column';
import TableComponent from '../../components/table/table.component';
import { Notification } from '../notification';
import notificationService from '../services/notification.service';

export default function ProductsTable(props: any) {
    const history = useHistory();

    useEffect(() => {
        fetchData(1, 10);
    }, []);

    const fetchData = async (page: number, size: number) => {
        const response = await notificationService.getNotifications((page - 1) * size, size);
        const { data, total } = response.data;

        return { data: data, total: total };
    };

    const handleRead = async (notificationId: number) => {
        await notificationService.read(notificationId);
        message.success('Marked as read');
        await fetchData(1, 10);
    }

    const getTypeColor = (type: number) => {
        switch (type) {
            case 1: return "green";
            case 2: return "blue";
            case 3: return "gold";
            case 4: return "red";
            default: return "default";
        }
    }

    const getTypeName = (type: number) => {
        switch (type) {
            case 1: return "Sucesso";
            case 2: return "Informação";
            case 3: return "Aviso";
            case 4: return "Erro";
            default: return "Padrão";
        }
    }

    const columns: Column<Notification>[] = [
        {
            title: 'Id',
            dataIndex: 'notificationId',
            width: '15%',
        },
        {
            title: 'Título',
            width: '20%',
            dataIndex: 'title',
        },
        {
            title: 'Tipo',
            width: '15%',
            dataIndex: 'type',
            render: (type: number) => (
                <>
                    <Tag color={getTypeColor(type)} key={type}>
                        {getTypeName(type)}
                    </Tag>
                </>
            ),
        },
        {
            title: 'Leitura',
            width: '15%',
            dataIndex: 'readAt',
            render: (readAt) => (
                <>
                    {readAt ? moment(readAt).format('DD/MM/YYYY hh:mm:ss') : ''}
                </>
            ),

        },
        {
            title: 'Mensagem',
            width: '20%',
            dataIndex: 'content',
        },
        {
            ...getDefaultActionsColumn<Notification>(),
            render: (_, record) => {
                return (
                    <Space size={8}>
                        {!record.readAt &&
                            <Popconfirm title="Marcar como lida?" onConfirm={() => handleRead(record.notificationId)}>
                                <Button icon={<EyeInvisibleOutlined />} />
                            </Popconfirm>
                        }
                    </Space>
                );
            },
        },
    ];

    return (
        <>
            <Breadcrumb items={['Notificações']} />
            <Row justify="end">
                <Col span={4} style={{ display: 'flex', justifyContent: 'flex-end', margin: '8px 0px' }}>
                    <Space size={8} align="end">
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <TableComponent rowKey="notificationId" fetch={fetchData} columns={columns} />
                </Col>
            </Row>
        </>
    );
}