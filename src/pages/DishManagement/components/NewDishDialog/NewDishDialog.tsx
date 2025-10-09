import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNewDishDialog } from "./hooks/useNewDishDialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Image } from "lucide-react";

interface NewOperatorDialogProps {
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
    newDish: NewDishDTO;
    setNewDish: (NewDish: NewDishDTO) => void;
}

const NewDishDialog = ({ setIsOpen, isOpen, newDish, setNewDish }: NewOperatorDialogProps) => {
    const { state,
        form,
        functions } = useNewDishDialog(setIsOpen, isOpen, newDish, setNewDish);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Создание нового блюда</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={functions.addNewDish} className='w-full space-y-4'>
                        <div className="flex flex-col gap-4 items-center">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field, fieldState }) => (
                                    <FormItem className="w-[100%]">
                                        <FormLabel className="text-sm font-normal">
                                            {"Название блюда"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Название блюда" {...field} />
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-red-600 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col  gap-2 w-[100%]">
                                <FormLabel className="text-sm font-normal">
                                    {"Категория блюда"}
                                </FormLabel>
                                <Select /*value={newDish.category} onValueChange={functions.handleSelectCategory}*/>
                                    <SelectTrigger className="!h-10 w-[100%]">
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
                                {form.formState.errors.category && (
                                    <p className="text-red-600 text-sm">{form.formState.errors.category.message}</p>
                                )}
                            </div>
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field, fieldState }) => (
                                    <FormItem className="w-[100%]">
                                        <FormLabel className="text-sm font-normal">
                                            {"Цена блюда"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Цена блюда" {...field} />
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-red-600 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field, fieldState }) => (
                                    <FormItem className="w-[100%]">
                                        <FormLabel className="text-sm font-normal">
                                            {"Описание блюда"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Описание блюда" {...field} />
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-red-600 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="ingredients"
                                render={({ field, fieldState }) => (
                                    <FormItem className="w-[100%]">
                                        <FormLabel className="text-sm font-normal">
                                            {"Список ингредиентов"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Список ингредиентов" {...field} />
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-red-600 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="photo"
                                render={({ field, fieldState }) => (
                                    <FormItem className="w-[100%]">
                                        <FormLabel className="text-sm font-normal">{"Фотография блюда"}</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center gap-2">
                                                <Image />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={functions.handleFileChange}
                                                    className="absolute opacity-0 w-full cursor-pointer"
                                                />
                                                {!state.selectedFile ? (
                                                    <span className="text-sm font-normal">Выберите файл</span>
                                                ) : (
                                                    null
                                                )}
                                            </div>
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-red-600 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type='submit' className='h-10 w-full'>
                            {"Добавить"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default NewDishDialog;