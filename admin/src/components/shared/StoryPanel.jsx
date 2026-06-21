import DashboardTitles from "@/components/layout/DashboardTitles";
import StoryItems from "@/components/shared/panel-items/StoryItems";
import Link from "next/link";

const StoryPanel = () => {
    const recentStories = [
        { title: "Monsoon Collection Launch", status: "Published", date: "Today" },
        { title: "Top 10 Living Room Ideas", status: "Draft", date: "Yesterday" },
        { title: "Behind the Scenes: Pottery", status: "Published", date: "15 Jun" },
        { title: "The Art of Handweaving", status: "Published", date: "12 Jun" },
        { title: "Styling Your Balcony Garden", status: "Draft", date: "10 Jun" },
    ];

    return (
        <div className="glass-panel">
            <div className="stats-header">
                <DashboardTitles title="Recent Story" />
                <Link href={'/dashboard/blogs'} className="stats-btn">view all</Link>
            </div>
            <div className="activity-list">
                {recentStories.map((item, index) => (
                    <StoryItems key={index} item={item} />
                ))}
            </div>
        </div>
    )
}

export default StoryPanel;
