import {Input} from "@/components/ui/input.tsx";
import {ArrowDown, ArrowUp, SearchIcon, SlidersHorizontal} from "lucide-react";
import {useMenu} from "@/pages/Menu/hooks/useMenu.ts";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import FilterDialog from "@/pages/Menu/components/FilterDialog/FilterDialog.tsx";

const Menu = () => {
    const { state, functions } = useMenu()

    return (
        <div className="mx-auto mt-4 flex flex-col gap-10 p-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Input
                        leftIcon={<SearchIcon className='h-5 w-5' />}
                        placeholder="Поиск..."
                        onChange={(e) => functions.debouncedSearchByName(e.target.value)}
                        className='h-10 max-w-64'
                    />
                    <Select onValueChange={functions.handleSelectCategory}>
                        <SelectTrigger className="!h-10 max-w-64">
                            <SelectValue placeholder="Категория блюда" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="breakfast">Завтрак</SelectItem>
                                <SelectItem value="hotter">Горячее</SelectItem>
                                <SelectItem value="salads">Салаты</SelectItem>
                                <SelectItem value="drinks">Напитки</SelectItem>
                                <SelectItem value="desserts">Десерты</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={functions.handleSelectSorting}>
                        <SelectTrigger className="!h-10 max-w-64">
                            <SelectValue placeholder="Тип сортировки" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
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
                    <Button variant="outline" className="h-10 max-w-64 flex justify-between items-center"
                            onClick={() => functions.setIsOpen(true)}>
                        <p>{"Фильтры"}</p>
                        <SlidersHorizontal />
                    </Button>
                    <FilterDialog isOpen={state.isOpen} setIsOpen={functions.setIsOpen}
                                  filters={state.filters} setFilters={functions.setFilters}/>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Menu