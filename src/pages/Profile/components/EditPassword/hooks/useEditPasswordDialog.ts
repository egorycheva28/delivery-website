import { useForm } from "react-hook-form"
import { editPasswordShema } from "../constants/EditPasswordShema"
import { useEffect} from "react"
import { zodResolver } from "@hookform/resolvers/zod";


export const useEditPasswordDialog = (
    setIsOpen: (isOpen: boolean) => void,
    isOpen: boolean,
    editUserPassword  : UserNewPasswordDTO,
    setEditUserPassword: (editUserPassword: UserNewPasswordDTO) => void) => {


    const newPasswordForm = useForm<UserNewPasswordDTO>({
        resolver: zodResolver(editPasswordShema),
        defaultValues: {
            oldPassword1: '',
            newPassword1: '',
            newPassword2: ''
        }
    })
    
    const addNewPassword = newPasswordForm.handleSubmit(
        (data) => {
            setEditUserPassword(data)
            setIsOpen(false)
        }
    )

    useEffect(() => {
        if (!isOpen) {
            newPasswordForm.reset({    
                oldPassword1: '',
                newPassword1: '',
                newPassword2: ''
            })
        }
    }, [isOpen])


    return {
        form: newPasswordForm,
        functions: {
            addNewPassword
        }
    }
}