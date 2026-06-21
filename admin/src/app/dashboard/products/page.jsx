import DashboardTitles from "@/components/layout/DashboardTitles";
import ProductCard from "@/components/shared/ProductCard";
import Searchbar from "@/components/shared/Searchbar";

export default function ProductsPage() {
    const products = [
        {
            id: 1,
            title: "Home Decor",
            price: "2,499",
            sizes: ["M", "XL", "XXL"],
            stock: 2,
            image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=600&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Tulsi Pot",
            price: "2,599",
            sizes: ["L", "S", "M"],
            stock: 11,
            image: "https://images.unsplash.com/photo-1601630138241-118f6f571c66?q=80&w=600&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Drinkware",
            price: "2,580",
            sizes: ["L", "XL", "XXL"],
            stock: 6,
            image: "https://images.unsplash.com/photo-1594918712318-7a5528828b80?q=80&w=600&auto=format&fit=crop"
        },
        {
            id: 1,
            title: "Home Decor",
            price: "2,499",
            sizes: ["M", "XL", "XXL"],
            stock: 2,
            image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=600&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Tulsi Pot",
            price: "2,599",
            sizes: ["L", "S", "M"],
            stock: 11,
            image: "https://images.unsplash.com/photo-1601630138241-118f6f571c66?q=80&w=600&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Drinkware",
            price: "2,580",
            sizes: ["L", "XL", "XXL"],
            stock: 6,
            image: "https://images.unsplash.com/photo-1594918712318-7a5528828b80?q=80&w=600&auto=format&fit=crop"
        }
    ];

    return (
        <div className="dashboard-page">
            <DashboardTitles title="Product Catalog" subtitle="Inventory • All Products" />
            <div className="dashboard-wrapper">
                <div className="products-top-bar">
                    <Searchbar placeholder="Search products..." />
                </div>
                <div className="products-grid">
                    {products.map((product, index) => (
                        <ProductCard key={index} item={product} />
                    ))}
                </div>

            </div>
        </div>
    );
}