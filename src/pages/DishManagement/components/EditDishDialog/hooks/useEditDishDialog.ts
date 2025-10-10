import { useForm } from "react-hook-form"
import { editDishSchema } from "../constants/EditDishShema"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

export const useEditDishDialog = (
    setIsOpen: (isOpen: boolean) => void, isOpen: boolean,
    newDish: NewDishDTO,
    setNewDish: (NewDish: NewDishDTO) => void) => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
        //setNewDish(); потом поправить
    };

    const editDishForm = useForm<NewDishDTO>({
        resolver: zodResolver(editDishSchema),
        defaultValues: {
            name: '',
            category: '',
            price: 0,
            description: '',
            ingredients: '',
            photo: ''
        }
    })

    const editDish = editDishForm.handleSubmit(
        (data) => {
            setNewDish(data)
            setIsOpen(false)
        }
    )

    useEffect(() => {
        if (!isOpen) {
            editDishForm.reset({
                name: '',
                category: '',
                price: 0,
                description: '',
                ingredients: '',
                photo: ''
            })
        }
    }, [isOpen])

    return {
        state: { selectedFile },
        form: editDishForm,
        functions: {
            editDish,
            setSelectedFile,
            handleFileChange
        }
    }
}