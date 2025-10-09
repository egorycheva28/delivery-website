import type { NewOperatorDTO } from "@/utils/types/NewOperatorDTO"
import { useForm } from "react-hook-form"
import type { NewOperatorSchema } from "../constants/NewOperatorShema"
import { useEffect } from "react"

export const useNewOperatorDialog = (newOperator: NewOperatorDTO,
    setNewOperator: (newOperator: NewOperatorDTO) => void,
    setIsOpen: (isOpen: boolean) => void, isOpen: boolean) => {


    const newOperatorForm = useForm<NewOperatorSchema>({
        defaultValues: {
            name: newOperator.name || '',
            phone: newOperator.phone || '',
            password: newOperator.password || ''
        }
    })

    const addNewOperator = newOperatorForm.handleSubmit(
        (data) => {
            setNewOperator(data)
            setIsOpen(false)
        }
    )

    useEffect(() => {
        if (!isOpen) {
            newOperatorForm.reset({
                name: '',
                phone: '',
                password: ''
            })
        }
    }, [isOpen])

    return {
        state: {},
        form: newOperatorForm,
        functions: { addNewOperator }
    }
}