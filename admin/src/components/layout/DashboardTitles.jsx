import { BsFlower2 } from "react-icons/bs";

export default function DashboardTitles({ title }) {
  return (
    <div className="page-intro">
      <div className="dashboard-title"><BsFlower2 />{title}</div>
    </div>
  );
}
