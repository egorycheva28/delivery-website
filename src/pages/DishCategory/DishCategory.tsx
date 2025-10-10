import {Button} from "@/components/ui/button.tsx";
import {useDishCategory} from "@/pages/DishCategory/hooks/useDishCategory.ts";
import DishCategoryCard from "@/pages/DishCategory/components/DishCategoryCard/DishCategoryCard.tsx";
import CustomPagination from "@/components/Pagination/CustomPagination.tsx";
import DishCategoryDialog from "@/pages/DishCategory/components/DishCategoryDialog/DishCategoryDialog.tsx";
import CancelDeleteDialog from "@/pages/DishCategory/components/CancelDeleteDialog/CancelDeleteDialog.tsx";

const DishCategory = () => {
    const { state, functions } = useDishCategory()

    return (
        <div className="mx-auto mt-4 flex flex-col gap-10 p-8">
            <div className="flex items-center justify-between">
                <p className="text-xl font-bold">{"Управление категориями блюд"}</p>
                <Button className="h-10" onClick={functions.openCreateCategory}>
                    {"Добавить категорию"}
                </Button>
            </div>
            {state.categories.length > 0 ? (
                <>
                    <div className="flex items-center justify-around flex-wrap gap-10">
                        {state.categories.map(category => (
                            <DishCategoryCard {...category} key={category.id}
                                              setDishCategory={functions.openEditCategory}
                                              openCancelDelete={() => functions.setCanselDeleteOpen(true)} />
                        ))}
                    </div>
                    <CustomPagination totalPages={10}/>
                </>
            ) : (
                <p className="text-xl font-bold">{"Нет категорий блюд"}</p>
            )}
            <DishCategoryDialog isOpen={state.isOpen} setIsOpen={functions.setIsOpen}
                                initialData={state.categoryData} categoryId={state.categoryId}/>
            <CancelDeleteDialog isOpen={state.canselDeleteOpen} setIsOpen={functions.setCanselDeleteOpen}/>
        </div>
    )
}

export default DishCategory;