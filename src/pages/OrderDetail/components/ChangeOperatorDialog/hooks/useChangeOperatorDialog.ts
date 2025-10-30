import { useEffect, useState } from "react"

export const useChangeOperatorDialog = (isChangeOperator: boolean,
    setIsChangeOperator: (isChangeOperator: boolean) => void) => {
    const [listOperators, setListOperators] = useState<OperatorDTO[]>([
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

    const changeOperator = () => {
        //логика смены оператора
        setIsChangeOperator(false);
    }

    useEffect(() => {
        //логика получения списка всех операторов
    }, [isChangeOperator]);

    return {
        state: { listOperators },
        functions: { setListOperators, changeOperator }
    }
}