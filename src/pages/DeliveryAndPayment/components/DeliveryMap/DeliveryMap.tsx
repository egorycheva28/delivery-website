import {Circle, Map, Placemark, YMaps} from "@pbe/react-yandex-maps";

interface DeliveryZone {
    distance: number;
    price: number;
    color: string;
    name: string;
}

interface DeliveryMapProps {
    center: [number, number];
    deliveryZones: DeliveryZone[];
    restaurantLocation: [number, number];
}

const DeliveryMap = ({center, deliveryZones, restaurantLocation}: DeliveryMapProps) => (
    <div className="w-full rounded-lg overflow-hidden shadow-lg">
        <div className="w-full h-96">
            <YMaps>
                <Map
                    defaultState={{
                        center: center,
                        zoom: 11,
                        controls: ['zoomControl', 'fullscreenControl']
                    }}
                    width="100%"
                    height="100%"
                    modules={['control.ZoomControl', 'control.FullscreenControl']}
                >
                    <Placemark
                        geometry={restaurantLocation}
                        properties={{
                            balloonContent: `
                        <div class="p-2">
                            <h3 class="font-bold text-lg">Наш ресторан</h3>
                            <p>Точка отправления доставки</p>
                        </div>
                        `
                        }}
                        options={{
                            iconLayout: 'default#image',
                            iconImageHref: 'data:image/svg+xml;base64,' + btoa(`
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="15" fill="#DC2626" stroke="white" stroke-width="2"/>
                            <path d="M16 8L18.5 12H13.5L16 8Z" fill="white"/>
                            <circle cx="16" cy="16" r="4" fill="white"/>
                        </svg>
                        `),
                            iconImageSize: [32, 32],
                            iconImageOffset: [-16, -16]
                        }}
                        modules={['geoObject.addon.balloon']}
                    />
                    {deliveryZones.map((zone, index) => (
                        <Circle
                            key={index}
                            geometry={[restaurantLocation, zone.distance * 1000]}
                            options={{
                                fillColor: zone.color,
                                fillOpacity: 0.2,
                                strokeColor: zone.color,
                                strokeOpacity: 0.8,
                                strokeWidth: 2,
                            }}
                            properties={{
                                balloonContent: `
                            <div class="p-2">
                                <h3 class="font-bold">${zone.name}</h3>
                                <p>До ${zone.distance} км от ресторана</p>
                                <p class="font-semibold">
                                    Стоимость доставки: ${zone.price === 0 ? 'Бесплатно' : zone.price + ' ₽'}
                                </p>
                            </div>
                            `
                            }}
                            modules={['geoObject.addon.balloon']}
                        />
                    ))}
                </Map>
            </YMaps>
        </div>
        <div className="bg-white p-4 border-t">
            <h3 className="font-bold text-lg mb-2">Зоны доставки</h3>
            <div className="flex flex-wrap gap-4">
                {deliveryZones.map((zone, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div
                            className="w-4 h-4 rounded-full"
                            style={{backgroundColor: zone.color}}
                        />
                        <span className="text-sm">
                {zone.name} (до {zone.distance} км) - {zone.price === 0 ? 'Бесплатно' : `${zone.price} ₽`}
              </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
)

export default DeliveryMap;