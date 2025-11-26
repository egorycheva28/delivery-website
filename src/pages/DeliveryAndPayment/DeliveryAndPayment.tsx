import DeliveryMap from '@/pages/DeliveryAndPayment/components/DeliveryMap/DeliveryMap.tsx';
import PaymentMethod from '@/pages/DeliveryAndPayment/components/PaymentMethod/PaymentMethod.tsx';
import { Banknote, CreditCard, HandPlatter, MonitorSmartphone } from 'lucide-react';

const DeliveryAndPayment = () => {
    const deliveryZones = [
        { distance: 15, price: 350, color: '#8B5CF6', name: 'Загородная зона' },
        { distance: 10, price: 200, color: '#EF4444', name: 'Отдаленная зона' },
        { distance: 5, price: 100, color: '#F59E0B', name: 'Стандартная зона' },
        { distance: 2, price: 0, color: '#10B981', name: 'Центральная зона' },
    ];

    const restaurantLocation: [number, number] = [56.48464, 84.947649];
    const mapCenter: [number, number] = [56.48464, 84.947649];

    return (
        <div className='max-w-6xl mx-auto px-4 py-8'>
            <h1 className='text-4xl font-medium text-center mb-10'>Доставка и оплата</h1>
            <section className='mb-12'>
                <h2 className='text-2xl font-bold mb-6'>Информация о доставке</h2>
                <div className='mb-6'>
                    <DeliveryMap
                        center={mapCenter}
                        deliveryZones={deliveryZones}
                        restaurantLocation={restaurantLocation}
                    />
                </div>
                <div className='bg-white rounded-lg p-6 mb-6 shadow-sm'>
                    <h3 className='text-xl font-semibold mb-4'>Стоимость доставки</h3>
                    <div className='grid md:grid-cols-3 gap-4'>
                        {deliveryZones.map((zone, index) => (
                            <div
                                key={index}
                                className='border-l-4 p-4 bg-white rounded-r-lg shadow-sm'
                                style={{ borderLeftColor: zone.color }}
                            >
                                <h4 className='font-semibold text-gray-800'>{zone.name}</h4>
                                <p className='text-gray-600'>до {zone.distance} км от ресторана</p>
                                <p className='text-lg font-bold text-gray-900'>
                                    {zone.price === 0 ? 'Бесплатно' : `${zone.price} ₽`}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='bg-white rounded-lg p-6 shadow-sm'>
                    <h3 className='text-xl font-semibold mb-4'>Условия доставки</h3>
                    <ul className='list-disc list-inside space-y-2 text-gray-700'>
                        <li>Минимальная сумма заказа - 500 рублей</li>
                        <li>Время доставки: 30-60 минут</li>
                        <li>Бесплатная доставка при заказе от 1500 рублей</li>
                        <li>Доставка осуществляется с 10:00 до 23:00</li>
                        <li>Возможность предзаказа на определенное время</li>
                        <li>Точное время доставки согласовывается с оператором</li>
                    </ul>
                </div>
            </section>
            <section>
                <h2 className='text-2xl font-bold mb-6'>Информация об оплате</h2>
                <div className='flex items-center justify-center gap-8 flex-wrap'>
                    <PaymentMethod
                        cardOrCashIcon={<CreditCard className='h-10 w-10' />}
                        onlineOrOfflineIcon={<MonitorSmartphone className='h-10 w-10' />}
                        title='Оплата картой на сайте'
                    />
                    <PaymentMethod
                        cardOrCashIcon={<CreditCard className='h-10 w-10' />}
                        onlineOrOfflineIcon={<HandPlatter className='h-10 w-10' />}
                        title='Оплата картой курьеру'
                    />
                    <PaymentMethod
                        cardOrCashIcon={<Banknote className='h-10 w-10' />}
                        onlineOrOfflineIcon={<HandPlatter className='h-10 w-10' />}
                        title='Оплата наличными курьеру'
                    />
                </div>
            </section>
        </div>
    );
};

export default DeliveryAndPayment;
