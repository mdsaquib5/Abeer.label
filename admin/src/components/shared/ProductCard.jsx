import Image from "next/image";
import { BsPencil, BsTrash } from "react-icons/bs";

const ProductCard = ({ item }) => {
    return (
        <div className="product-card">
            <div className="product-img-wrapper">
                <Image src={item.image} alt={item.title} className="product-img" width={400} height={400} style={{ objectFit: 'cover' }} />
            </div>
            <div className="product-info">
                <div className="product-title">{item.title}</div>
                <div className="product-price">₹{item.price}</div>
                <div className="product-sizes">
                    {item.sizes.map((size, idx) => (
                        <span key={idx} className="size-badge">{size}</span>
                    ))}
                </div>
                <div className="product-stock">Stock: {item.stock}</div>
                <div className="product-actions">
                    <button className="btn-edit">
                        <BsPencil /> Edit
                    </button>
                    <button className="btn-delete">
                        <BsTrash /> Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;