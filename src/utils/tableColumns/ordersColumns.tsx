export const ordersColumns = () => {
    return [
        {
            title: <span>№</span>,
            render: (_: any, __: any, index: number) => <span>{index + 1}</span>,
        },
        {
            title: <span>Ad</span>,
            render: ({ name }: { name: string }) => <span>{name}</span>,
        },
        {
            title: <span>Ədəd</span>,
            render: ({ amount }: { amount: number }) => <span>{amount}</span>,
        },
        {
            title: <span>Məbləğ</span>,
            render: ({ totalPrice }: { totalPrice: number }) => <span>{totalPrice}</span>,
        }
    ]
}