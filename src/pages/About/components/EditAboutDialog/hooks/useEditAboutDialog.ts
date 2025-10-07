import { useForm } from "react-hook-form"
import { useEffect } from "react"
import type { EditAboutSchema } from "../constants/EditAboutShema"

export const useEditAboutDialog = (abouts: EditAboutDTO,
    setAbouts: (abouts: EditAboutDTO) => void,
    setIsOpen: (isOpen: boolean) => void, isOpen: boolean) => {

    const aboutForm = useForm<EditAboutSchema>({
        defaultValues: {
            name: abouts.name || '',
            phoneOperator: abouts.phoneOperator || '',
            phoneManager: abouts.phoneManager || '',
            email: abouts.email || '',
            address: abouts.address || '',
            information: abouts.information || ''
        }
    })

    const editAbout = aboutForm.handleSubmit(
        (data) => {
            setIsOpen(false);
            setAbouts(data);
        }
    )

    useEffect(() => {
        if (!isOpen) {
            aboutForm.reset({
                name: abouts.name || '',
                phoneOperator: abouts.phoneOperator || '',
                phoneManager: abouts.phoneManager || '',
                email: abouts.email || '',
                address: abouts.address || '',
                information: abouts.information || ''
            })
        }
    }, [isOpen, abouts])

    return {
        state: {},
        form: aboutForm,
        functions: { editAbout }
    }
}