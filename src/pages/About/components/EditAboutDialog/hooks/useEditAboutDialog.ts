import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { editAboutSchema, type EditAboutSchema } from "../constants/EditAboutShema"
import { zodResolver } from "@hookform/resolvers/zod";
import { usePutEditAboutMutation } from "@/utils/api/hooks/usePutEditAbout";

export const useEditAboutDialog = (setIsOpen: (isOpen: boolean) => void, isOpen: boolean,
    reloadAbout: () => void, abouts?: EditAboutSchema) => {

    const editAbout = usePutEditAboutMutation()

    const aboutForm = useForm<About>({
        resolver: zodResolver(editAboutSchema),
        defaultValues: {
            name: abouts?.name || '',
            phoneOperator: abouts?.phoneOperator || '',
            phoneManager: abouts?.phoneManager || '',
            email: abouts?.email || '',
            address: abouts?.address || ''
        }
    });

    const onSubmit = aboutForm.handleSubmit(async (value) => {
        await editAbout.mutateAsync({
            params: {
                name: value.name, phoneOperator: value.phoneOperator, phoneManager: value.phoneManager,
                email: value.email, address: value.address
            }
        })

        reloadAbout()
        aboutForm.reset()
        setIsOpen(false)
    })

    useEffect(() => {
        if (!isOpen) {
            aboutForm.reset({
                name: abouts?.name || '',
                phoneOperator: abouts?.phoneOperator || '',
                phoneManager: abouts?.phoneManager || '',
                email: abouts?.email || '',
                address: abouts?.address || ''
            })
        }
    }, [isOpen, abouts])

    return {
        form: aboutForm,
        functions: { onSubmit }
    }
}