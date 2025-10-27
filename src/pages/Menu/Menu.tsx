import {Input} from "@/components/ui/input.tsx";
import {ArrowDown, ArrowUp, SearchIcon, SlidersHorizontal} from "lucide-react";
import {useMenu} from "@/pages/Menu/hooks/useMenu.ts";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import FilterDialog from "@/pages/Menu/components/FilterDialog/FilterDialog.tsx";
import DishCard from "@/components/DishCard/DishCard.tsx";
import CustomPagination from "@/components/Pagination/CustomPagination.tsx";
import AddBasketBtn from "@/components/DishCard/components/AddBasketBtn/AddBasketBtn.tsx";
import {getSortingForUrl} from "@/pages/Menu/helpers/getSortingForUrl.ts";

const Menu = () => {
    const { state, functions } = useMenu()

    return (
        <div className="mx-auto mt-4 flex flex-col gap-10 p-8">
            <div className="flex gap-4 flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 ">
                    <Input
                        defaultValue={state.filters.search}
                        leftIcon={<SearchIcon className='h-5 w-5' />}
                        placeholder="Поиск..."
                        onChange={(e) => functions.debouncedSearchByName(e.target.value)}
                        className='h-10 sm:max-w-64 w-full'
                    />
                    <Select value={state.filters.categoryId || "all"} onValueChange={functions.handleSelectCategory}>
                        <SelectTrigger className="!h-10 sm:max-w-64 w-full">
                            <SelectValue placeholder="Категория блюда" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">Все категории</SelectItem>
                                {state.categories.data?.data.map(category => (
                                    <SelectItem value={category.id}>{category.name}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select value={state.filters.sortBy && state.filters.sortDirection
                        ? getSortingForUrl(state.filters.sortBy, state.filters.sortDirection)
                        : "without"} onValueChange={functions.handleSelectSorting}>
                        <SelectTrigger className="!h-10 sm:max-w-64 w-full">
                            <SelectValue placeholder="Тип сортировки" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="without">
                                    Без сортировки
                                </SelectItem>
                                <SelectItem value="priceAsk">
                                    Цена
                                    <ArrowUp />
                                </SelectItem>
                                <SelectItem value="priceDes">
                                    Цена
                                    <ArrowDown />
                                </SelectItem>
                                <SelectItem value="ratingAsk">
                                    Рейтинг
                                    <ArrowUp />
                                </SelectItem>
                                <SelectItem value="ratingDes">
                                    Рейтинг
                                    <ArrowDown />
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Button variant="outline" className="h-10 md:max-w-64 w-full flex justify-between items-center"
                            onClick={() => functions.setIsOpen(true)}>
                        <p>{"Фильтры"}</p>
                        <SlidersHorizontal />
                    </Button>
                    <FilterDialog isOpen={state.isOpen} setIsOpen={functions.setIsOpen}
                                  filters={state.filters} setFilters={functions.setFilters}/>
                </div>
            </div>
            {state.displayedData && state.displayedData.length > 0 && (
                <>
                    <div className="flex items-center justify-around flex-wrap gap-10">
                        {state.displayedData.map(dish => (
                            <DishCard key={dish.id} {...dish}>
                                {dish.isAvailable ? (
                                    <AddBasketBtn className="w-full" idDish={dish.id}/>
                                ) : (
                                    <Button disabled={true} className="h-10 w-full">
                                        {"Блюдо не доступно"}
                                    </Button>
                                )}
                            </DishCard>
                        ))}
                    </div>
                    <CustomPagination totalPages={state.totalPage} isGoToStart={state.goToStart}/>
                </>
            )}
        </div>
    )
}

export default Menu