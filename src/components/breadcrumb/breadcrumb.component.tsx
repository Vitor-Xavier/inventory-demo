import { Breadcrumb, Row } from 'antd';

export default function BreadcrumbComponent(props: any) {
    return (
        <Row>
            <Breadcrumb style={{ margin: '16px 0' }}>
                {props.items.map((item: string, idx: number) => (
                    <Breadcrumb.Item key={`breadcrumb-${item}-${idx}`}>{item}</Breadcrumb.Item>
                ))}
            </Breadcrumb>
        </Row>
    )
}