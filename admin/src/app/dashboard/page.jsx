import DashboardTitles from "@/components/layout/DashboardTitles";
import Stats from "@/components/shared/Stats";
import { BsBoxSeam, BsCart3, BsBagCheck, BsPeople, BsJournalText } from "react-icons/bs";
import { TbCurrencyRupee } from "react-icons/tb";
import { CiBoxes, CiShoppingCart, CiWallet, CiTimer, CiUser, CiViewList } from "react-icons/ci";
import OrderPanel from "@/components/shared/OrderPanel";
import CollabPanel from "@/components/shared/CollabPanel";
import StoryPanel from "@/components/shared/StoryPanel";

export default function DashboardOverview() {
    const statsData = [
        { id: 1, title: "Total Products", number: "142", icon: <BsBoxSeam />, numberIcon: <CiBoxes /> },
        { id: 2, title: "Total Orders", number: "854", icon: <BsBagCheck />, numberIcon: <CiShoppingCart /> },
        { id: 3, title: "Total Revenue", number: "1,24,500", icon: <TbCurrencyRupee />, numberIcon: <CiWallet /> },
        { id: 4, title: "COD Pending", number: "38", icon: <BsCart3 />, numberIcon: <CiTimer /> },
        { id: 5, title: "Total Customers", number: "6,210", icon: <BsPeople />, numberIcon: <CiUser /> },
        { id: 6, title: "Total Story", number: "24", icon: <BsJournalText />, numberIcon: <CiViewList /> }
    ];

    return (
        <div className="dashboard-page">
            <DashboardTitles title="Dashboard Overview" />
            <div className="dashboard-wrapper">
                <div className="dashbaord-stats-grid">
                    {statsData.map((item, index) => (
                        <Stats key={index} item={item} />
                    ))}
                </div>
                <div className="recent-grid recent-activities-grid">
                    <OrderPanel />
                    <CollabPanel />
                    <StoryPanel />
                </div>
            </div>
        </div>
    );
}