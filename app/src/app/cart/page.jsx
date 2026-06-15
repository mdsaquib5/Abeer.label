import TopHeader from "@/components/pages/TopHeader";
import CartCard from "@/components/pages/CartCard";
import CartTotal from "@/components/pages/CartTotal";

const dummyCartItems = [
    {
        id: '1',
        name: 'Geet Farshi Set 2 Piece',
        collection: 'Basant Bahaar',
        price: 4499,
        size: 'M',
        quantity: 1,
        image: 'https://res.cloudinary.com/dhufjjp9t/image/upload/v1780991430/nargis-profile_mbalmc.jpg'
    },
    {
        id: '2',
        name: 'Floral Affaire — Nargis',
        collection: 'Nostalgia of Summer',
        price: 3299,
        size: 'L',
        quantity: 2,
        image: 'https://res.cloudinary.com/dhufjjp9t/image/upload/v1780991430/nargis-profile_mbalmc.jpg'
    },
    {
        id: '3',
        name: 'Floral Affaire — Nargis',
        collection: 'Nostalgia of Summer',
        price: 4999,
        size: 'L',
        quantity: 2,
        image: 'https://res.cloudinary.com/dhufjjp9t/image/upload/v1780991430/nargis-profile_mbalmc.jpg'
    }
];

const page = () => {
    return (
        <div className="pages">
            <TopHeader
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Cart', href: null }]}
            />
            <div className="shop-page-wrapper">
                <div className="container">

                    <div className="cart-layout">
                        <div className="cart-items-section">
                            {dummyCartItems.map(item => (
                                <CartCard key={item.id} item={item} />
                            ))}
                        </div>

                        <div className="cart-summary-section">
                            <CartTotal items={dummyCartItems} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page;