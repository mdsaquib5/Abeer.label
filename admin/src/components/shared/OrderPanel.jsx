import DashboardTitles from "@/components/layout/DashboardTitles";
import OrderItems from "@/components/shared/panel-items/OrderItems";
import Link from "next/link";

const OrderPanel = () => {
    const recentOrders = [
        { id: "#E63098", item: "Vintage Ceramic Vase", status: "Pending", price: "1,200" },
        { id: "#E63093", item: "Handwoven Cotton Throw", status: "Completed", price: "850" },
        { id: "#7ED8DD", item: "Tulsi Planter Pot", status: "Pending", price: "450" },
        { id: "#9BD4E1", item: "Macrame Wall Hanging", status: "Completed", price: "1,150" },
        { id: "#1AC8B0", item: "Terracotta Lamp Shade", status: "Completed", price: "2,400" },
    ];

    return (
        <div className="glass-panel">
            <div className="stats-header">
                <DashboardTitles title="Orders" />
                <Link href={'/dashboard/orders'} className="stats-btn">view all</Link>
            </div>
            <div className="activity-list">
                {recentOrders.map((item, index) => (
                    <OrderItems key={index} item={item} />
                ))}
            </div>
        </div>
    )
}

export default OrderPanel;