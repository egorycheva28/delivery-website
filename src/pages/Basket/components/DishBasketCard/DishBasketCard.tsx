import AddBasketBtn from "@/components/DishCard/components/AddBasketBtn/AddBasketBtn.tsx";

interface DishBasketCardProps {
    id: string;
    name: string;
    price: number;
    photos: string[];
    dishNum: number
}

const DishBasketCard = ({ id, name, price, photos, dishNum }: DishBasketCardProps) => (
    <div className="w-full flex items-center justify-between border p-5">
        <div className="flex items-center gap-2">
            <div className="h-[100px] overflow-hidden bg-gray-100">
                <img
                    src={photos.length > 0 ? photos[0] : "https://cdn1.ozone.ru/s3/multimedia-d/6319443853.jpg"}
                    alt="dish photo"
                    className="w-full h-full object-cover object-center border"
                />
            </div>
            <div>
                <p>{name}</p>
                <p>{`${price} ₽`}</p>
            </div>
        </div>
        <AddBasketBtn className="w-[200px]" idDish={id} initialNum={dishNum}/>
    </div>
)

export default DishBasketCard