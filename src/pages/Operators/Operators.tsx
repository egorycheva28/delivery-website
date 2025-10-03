import { useState } from 'react';
import OperatorItem from './components/OperatorItem';
import newOperator from './icons/newOperator.png';
import type { OperatorDTO } from '@/utils/types/OperatorDTO';

const Operators = () => {
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

    return (
        <div className="flex flex-col items-center mt-8 gap-8 w-full">
            <div className='flex flex-row justify-between items-center w-[90%]'>
                <span className='text-4xl font-medium text-center flex-1'>Управление операторами</span>
                <img src={newOperator} className='w-[30px] h-[30px] cursor-pointer' />
            </div>
            <div className='flex flex-col items-center w-[90%] border border-black rounded-lg mb-8 divide-y divide-black'>
                {
                    operators.map(operator => (
                        <OperatorItem operator={operator} />
                    ))
                }
            </div>
        </div>
    )
}

export default Operators;