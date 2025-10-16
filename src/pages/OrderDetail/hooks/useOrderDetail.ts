import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useOrderDetail = () => {
    const { id } = useParams<{ id: string }>();

    const [role, setRole] = useState<string>('admin');
    const [isComment, setIsComment] = useState<boolean>(false);
    const [isChangeOperator, setIsChangeOperator] = useState<boolean>(false);
    const [isAddDish, setIsAddDish] = useState<boolean>(false);
    const [isHistory, setIsHistory] = useState<boolean>(false);
    const [comment, setComment] = useState<NewComment>(
        {
            newComment: ''
        }
    );
    const order = {
        id: id || '',
        number: 1,
        date: 'string',
        address: 'string',
        price: 500,
        status: 'new',
        payment: 'наличными',
        comment: '',
        dishes: [{
            id: "string1",
            name: "string1",
            category: "string",
            description: "Проснись вместе со вкусом лета! Наш фруктовый завтрак — это взрыв свежести и витаминов в первой половине дня. Сочные дольки манго, хрустящие яблоки, спелые ягоды клубники и сладкий виноград — идеально сбалансированное сочетание для лёгкого старта.",
            price: 600,
            rating: 3.5,
            photos: []
        },
        {
            id: "string2",
            name: "string2",
            category: "string",
            description: "string",
            price: 5000,
            rating: 3.5,
            photos: []
        }]
    }
    const user = {
        name: 'Фамилия Имя Отчество',
        phone: '+79999999999'
    }

    const makeOperator = () => {
        //логика назначения себя оператором
    }

    const deleteDish = () => {
        //логика удаления блюда из заказа
    }

    const changeOperator = () => {
        //логика смены оператора
    }

    useEffect(() => {
        //логика получения новой инфы о заказе
    }, [isChangeOperator, isAddDish]);

    return {
        state: { order, role, isComment, comment, user, isChangeOperator, isAddDish, isHistory },
        functions: {
            setRole, setIsComment, setComment, makeOperator, deleteDish, changeOperator, setIsChangeOperator, setIsAddDish, setIsHistory
        }
    }
}