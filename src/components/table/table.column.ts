export type Column<T> = {
    dataIndex: string;
    title: string;
    width: string;
    fixed?: string;
    align?: string;
    render?: (text: any, item: T, index: number) => JSX.Element;
};

export function getDefaultActionsColumn<T>(): Column<T> {
    return {
        dataIndex: 'actions', title: 'Ações', width: '10%', fixed: 'right', align: 'center'
    }
}