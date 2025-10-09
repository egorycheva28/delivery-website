import {useMemo} from "react";

export const useBasket = () => {
    const dishes = [
        {
            id: "string1",
            name: "Basket 1",
            price: 500,
            photos: [],
            dishNum: 5
        },
        {
            id: "string2",
            name: "Basket 2",
            price: 500,
            photos: [],
            dishNum: 2
        },
        {
            id: "string2",
            name: "Basket 3",
            price: 500,
            photos: [],
            dishNum: 1
        }
    ]

    const totalAmount = useMemo((): number => {
        return dishes.reduce((sum, dish) => {
            return sum + (dish.price * dish.dishNum);
        }, 0);
    }, [dishes]);

    const handleDeleteAll = () => {
        console.log("Delete All")
    }

    return {
        state: { dishes, totalAmount },
        functions: { handleDeleteAll }
    }
}