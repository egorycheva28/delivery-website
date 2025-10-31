import {useDishDetail} from "@/pages/DishDetail/hooks/useDishDetail.ts";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel.tsx";
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import {Star} from "lucide-react";
import AddBasketBtn from "@/components/DishCard/components/AddBasketBtn/AddBasketBtn.tsx";
import {getIngredientRus} from "@/pages/DishDetail/helpers/GetIngredientRus.ts";
import {Button} from "@/components/ui/button.tsx";
import RateDialog from "@/pages/DishDetail/components/RateDialog/RateDialog.tsx";

const DishDetail = () => {
    const { state, functions } = useDishDetail()

    return (
        <div className="mx-auto mt-4 flex flex-col gap-10 p-8">
            <Carousel className="w-full max-w-[300px] mx-auto">
                <CarouselContent>
                    <CarouselItem>
                        <img
                            src={state.dish.data?.data.foodDetails.photo
                                || "https://cdn1.ozone.ru/s3/multimedia-d/6319443853.jpg"}
                            alt="dish photo"
                            className="h-[300px] object-cover object-center border"
                        />
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
            <Card className="pb-3">
                <CardContent className="p-0">
                    <CardTitle className="text-center text-xl">
                        {state.dish.data?.data.foodDetails.name}
                    </CardTitle>
                    <div className="w-full h-[40] p-2 flex items-center justify-between border-y my-3">
                        {(state.dish.data?.data.foodDetails.rate || (state.dish.data?.data.foodDetails.rate === 0)) && (
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((position) => {
                                    const fillPercentage = Math.max(0, Math.min(1, state.dish.data?.data.foodDetails.rate! - position + 1)) * 100;
                                    const userFillPercentage = Math.max(0, Math.min(1, (state.dish.data?.data.userRating || 0) - position + 1)) * 100;

                                    return (
                                        <div key={position} className="relative">
                                            <Star size={20} className="text-gray-300 fill-gray-300"/>
                                            <div className="absolute top-0 left-0 overflow-hidden"
                                                 style={{width: `${fillPercentage}%`}}
                                            >
                                                <Star size={20} className="text-yellow-500 fill-yellow-500"/>
                                            </div>
                                            {state.dish.data?.data.hasRate && (
                                                <div className="absolute top-0 left-0 overflow-hidden"
                                                     style={{width: `${userFillPercentage}%`}}
                                                >
                                                    <Star size={20}
                                                          className="text-transparent stroke-2 stroke-yellow-900 fill-transparent"/>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                                {state.dish.data?.data.couldRate && !state.dish.data?.data.hasRate && (
                                    <Button className="cursor-pointer ml-3" onClick={functions.openAddRate}>
                                        {"Поставить оценку блюду"}
                                    </Button>
                                )}
                                {state.dish.data?.data.hasRate && (
                                    <Button className="cursor-pointer ml-3"
                                            onClick={() => functions.openEditRate({ rating: state.dish.data?.data.userRating! })}>
                                        {"Изменить оценку блюду"}
                                    </Button>
                                )}
                                {state.dish.data?.data.couldRate && (
                                    <RateDialog isOpen={state.isOpen} setIsOpen={functions.setIsOpen}
                                                dishId={state.id!} reload={state.dish.refetch} initialData={state.rateData} />
                                )}
                            </div>
                        )}
                        <p className="font-bold">
                            {`${state.dish.data?.data.foodDetails.price} ₽`}
                        </p>
                    </div>
                    <p className="px-5">
                        {state.dish.data?.data.foodDetails.description}
                    </p>
                    <div className="w-full p-2 flex flex-col items-center justify-center border-y my-3 gap-3">
                        <p className="text-center text-xl">
                            {"Ингридиенты"}
                        </p>
                        {state.dish.data?.data.foodDetails.ingredients.map(ingredient => (
                            <p className="text-center">
                                {getIngredientRus(ingredient)}
                            </p>
                        ))}
                    </div>
                    {state.dish.data?.data.foodDetails.id && (
                        state.dish.data?.data.foodDetails.isAvailable ? (
                            <AddBasketBtn className="w-[calc(100%-24px)] mx-3" {...state.dishIntoCart} reload={state.cart.refetch} />
                        ) : (
                            <Button disabled={true} className="w-[calc(100%-24px)] mx-3">
                                {"Блюдо не доступно"}
                            </Button>
                        )
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default DishDetail;