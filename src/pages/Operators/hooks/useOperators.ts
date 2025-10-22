import { useDeleteOperatorByIdMutation } from "@/utils/api/hooks/useDeleteOperatorByIdMutation";
import { useGetOperatorsQuery } from "@/utils/api/hooks/useGetOperatorsQuery";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ITEMS_PER_PAGE = 8;
export const useOperators = () => {
    const deleteOperator = useDeleteOperatorByIdMutation()
    const operators = useGetOperatorsQuery()

    const [searchParams] = useSearchParams();
    const [newOperator, setNewOperator] = useState<NewOperatorDTO>({
        fullName: '',
        password: '',
        phone: '',
        username: ''
    });
    const [isOpen, setIsOpen] = useState<boolean>(false);
    //const [page, setPage] = useState<number>(1);
    //const [totalPage, setTotalPage] = useState<number>(5);
    const [canselDeleteOpen, setCanselDeleteOpen] = useState(false)
    /*const [operators, setOperators] = useState<Operator[]>([
        {
            id: '1',
            role: '',
            createTime: '',
            fullName: 'Фамилия Имя Отчество',
            phone: '8 (999) 999-99-99',
            username: ''
        },
        {
            id: '2',
            role: '',
            createTime: '',
            fullName: 'Фамилия Имя Отчество',
            phone: '8 (999) 999-99-99',
            username: ''
        },
        {
            id: '3',
            role: '',
            createTime: '',
            fullName: 'Фамилия Имя Отчество',
            phone: '8 (999) 999-99-99',
            username: ''
        },
        {
            id: '4',
            role: '',
            createTime: '',
            fullName: 'Фамилия Имя Отчество',
            phone: '8 (999) 999-99-99',
            username: ''
        },
        {
            id: '5',
            role: '',
            createTime: '',
            fullName: 'Фамилия Имя Отчество',
            phone: '8 (999) 999-99-99',
            username: ''
        }
    ]);*/

    const handleDeleteOperator = async (operatorId: string) => {
        await deleteOperator.mutateAsync({ params: { operatorId } },
            {
                onSuccess: () => console.log("Delete" + operatorId),
                onError: (error) => {
                    if (error.response?.status !== 401) setCanselDeleteOpen(true)
                }
            })
    }

    const displayedData = useMemo(() => {
        if (!operators.data) return []

        const currentPage = parseInt(searchParams.get('page') || "1") - 1;
        const startItem = ITEMS_PER_PAGE * currentPage;
        return operators.data.data.slice(startItem, startItem + ITEMS_PER_PAGE)
    }, [operators.data, searchParams]);

    const totalPage = useMemo(() => {
        if (!operators.data) return 0

        return Math.ceil(operators.data.data.length / ITEMS_PER_PAGE);
    }, [operators.data]);

    return {
        state: { isOpen, newOperator, displayedData, totalPage, operators },
        functions: {
            setIsOpen,
            setNewOperator,
            handleDeleteOperator
        }
    }
}