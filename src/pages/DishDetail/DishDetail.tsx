import {useDishDetail} from "@/pages/DishDetail/hooks/useDishDetail.ts";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import {Star} from "lucide-react";
import AddBasketBtn from "@/components/DishCard/components/AddBasketBtn/AddBasketBtn.tsx";

const DishDetail = () => {
    const { state } = useDishDetail()

    return (
        <div className="mx-auto mt-4 flex flex-col gap-10 p-8">
            <Carousel className="w-full max-w-[300px] mx-auto">
                <CarouselContent>
                    {state.dish.photos.length > 0
                        ? state.dish.photos.map(photo => (
                            <CarouselItem key={photo}>
                                <img
                                    key={photo}
                                    src={photo}
                                    alt="dish photo"
                                    className="h-[300px] object-cover object-center border"
                                />
                            </CarouselItem>
                        ))
                        : (
                            <CarouselItem>
                                <img
                                    src="https://cdn1.ozone.ru/s3/multimedia-d/6319443853.jpg"
                                    alt="dish photo"
                                    className="h-[300px] object-cover object-center border"
                                />
                            </CarouselItem>
                        )
                    }
                </CarouselContent>
                {state.dish.photos.length > 1 && (
                    <>
                        <CarouselPrevious/>
                        <CarouselNext/>
                    </>
                )}
            </Carousel>
            <Card className="pb-3">
                <CardContent className="p-0">
                    <CardTitle className="text-center text-xl">
                        {state.dish.name}
                    </CardTitle>
                    <div className="w-full h-[40] p-2 flex items-center justify-between border-y my-3">
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((position) => {
                                const fillPercentage = Math.max(0, Math.min(1, state.dish.rating - position + 1)) * 100;

                                return (
                                    <div key={position} className="relative">
                                        <Star size={20} className="text-gray-300 fill-gray-300"/>
                                        <div className="absolute top-0 left-0 overflow-hidden"
                                             style={{width: `${fillPercentage}%`}}
                                        >
                                            <Star size={20} className="text-yellow-500 fill-yellow-500"/>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <p className="font-bold">
                            {`${state.dish.price} ₽`}
                        </p>
                    </div>
                    <p className="px-5">
                        {state.dish.description}
                    </p>
                    <div className="w-full p-2 flex flex-col items-center justify-center border-y my-3 gap-3">
                        <p className="text-center text-xl">
                            {"Ингридиенты"}
                        </p>
                        {state.dish.ingredients.map(ingredient => (
                            <p className="text-center">
                                {ingredient}
                            </p>
                        ))}
                    </div>
                    <AddBasketBtn className="w-[calc(100%-24px)] mx-3" idDish={state.dish.id}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default DishDetail;