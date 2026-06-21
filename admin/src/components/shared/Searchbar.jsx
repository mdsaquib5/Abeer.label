import { CiSearch } from "react-icons/ci";

const Searchbar = ({ placeholder = "Search..." }) => {
  return (
    <div className="search-input-container">
        <CiSearch className="admin-search" />
        <input type="text" className="search-input" placeholder={placeholder} />
    </div>
  )
}

export default Searchbar;