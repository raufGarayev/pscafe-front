import { format, parseISO } from "date-fns"

export const branchesColumns = () => {
    return [
        {
            title: <span>№</span>,
            render: (_: any, __: any, index: number) => <span>{index + 1}</span>,
            width: '10%'
        },
        {
            title: <span>Filial adı</span>,
            render: ({name}: {name: string}) => <span>{name}</span>
        },
        {
            title: <span>Yaranma tarixi</span>,
            render: ({createdAt}: {createdAt: string}) => <span>{format(parseISO(createdAt), 'dd-MM-yyyy')}</span>,
            width: '20%'
        }
    ]
}
