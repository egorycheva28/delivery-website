import { useState } from "react";

export const useOperators = () => {
    const [newOperator, setNewOperator] = useState<NewOperatorDTO>({
        name: '',
        phone: '',
        password: ''
    });
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(5);
    const [operators, setOperators] = useState<OperatorDTO[]>([
        {
            name: 'Фамилия Имя Отчество',
            phone: '8 (999) 999-99-99'
        },
        {
            name: 'Фамилия Имя Отчество',
            phone: '8 (999) 999-99-99'
        },
        {
            name: 'Фамилия Имя Отчество',
            phone: '8 (999) 999-99-99'
        },
        {
            name: 'Фамилия Имя Отчество',
            phone: '8 (999) 999-99-99'
        },
        {
            name: 'Фамилия Имя Отчество',
            phone: '8 (999) 999-99-99'
        }
    ]);

    const deleteOperator = () => {

    }

    return {
        state: { isOpen, newOperator, page, totalPage, operators },
        functions: {
            setIsOpen,
            setNewOperator,
            deleteOperator,
            setPage,
            setTotalPage,
            setOperators
        }
    }
}