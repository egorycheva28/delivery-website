import { useForm } from "react-hook-form"
import { newOperatorSchema } from "../constants/NewDishShema"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod";

export const useNewDishDialog = (
    setIsOpen: (isOpen: boolean) => void, isOpen: boolean,
    newDish: NewDishDTO,
    setNewDish: (NewDish: NewDishDTO) => void) => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
        //setNewDish(); потом поправить
    };

    const newDishForm = useForm<NewDishDTO>({
        resolver: zodResolver(newOperatorSchema),
        defaultValues: {
            name: '',
            category: '',
            price: 0,
            description: '',
            ingredients: '',
            photo: ''
        }
    })

    const addNewDish = newDishForm.handleSubmit(
        (data) => {
            setNewDish(data)
            setIsOpen(false)
        }
    )

    useEffect(() => {
        if (!isOpen) {
            newDishForm.reset({
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
        form: newDishForm,
        functions: {
            addNewDish,
            setSelectedFile,
            handleFileChange
        }
    }
}