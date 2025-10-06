import { useState } from 'react';
import OperatorItem from './components/OperatorItem';
import type { OperatorDTO } from '@/utils/types/OperatorDTO';
import { SquarePlus } from 'lucide-react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useOperators } from './hooks/useOperators';
import NewOperatorDialog from './components/NewOperatorDialog/NewOperatorDialog';

const Operators = () => {
    const { state, functions } = useOperators();
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
                <SquarePlus className='w-[36px] h-[36px] cursor-pointer' onClick={() => functions.setIsOpen(true)}></SquarePlus>
                <NewOperatorDialog isOpen={state.isOpen} setIsOpen={functions.setIsOpen} newOperator={state.newOperator} setNewOperator={functions.setNewOperator} />
            </div>
            <div className='flex flex-col items-center w-[90%] border border-black rounded-lg divide-y divide-black'>
                {
                    operators.map(operator => (
                        <OperatorItem operator={operator} />
                    ))
                }
            </div>
            <div className='mb-6'>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">{state.totalPage}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}

export default Operators;