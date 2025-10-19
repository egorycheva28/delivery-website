const sorting = {
    price: {
        asc: 'priceAsk',
        desc: 'priceDes'
    },
    rate: {
        asc: 'ratingAsk',
        desc: 'ratingDes'
    }
} as const;

export const getSortingForUrl = (sortBy: string, sortDirection: string): string => {
    const typeSort = sorting[sortBy as keyof typeof sorting];
    return typeSort[sortDirection as keyof typeof typeSort];
}