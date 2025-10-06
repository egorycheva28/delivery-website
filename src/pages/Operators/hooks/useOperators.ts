import type { NewOperatorDTO } from "@/utils/types/NewOperatorDTO";
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

    const deleteOperator = () => {

    }

    return {
        state: { isOpen, newOperator, page, totalPage },
        functions: {
            setIsOpen,
            setNewOperator,
            deleteOperator,
            setPage,
            setTotalPage
        }
    }
}