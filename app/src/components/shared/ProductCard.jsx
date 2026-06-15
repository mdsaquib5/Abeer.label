import Image from "next/image";
import Link from "next/link";
import { IoBagOutline } from "react-icons/io5";

const ProductCard = ({ product, index }) => {
    return (
        <div className="product-card">
            <div className="product-image">
                <Link href={`/product/${product.id}`} className="cart-button"><IoBagOutline /></Link>
                <div className="product-overlay">
                    <Link href={`/product/${product.id}`} className="product-detail">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        View Detail
                    </Link>
                </div>
                <Link href={`/product/${product.id}`} className="image-link">
                    <Image src={product.images[0]} alt={product.name} className="display-image" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" priority={true} />
                    {product.images[1] && (
                        <Image src={product.images[1]} alt={`${product.name} Hover`} className="hover-image" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" />
                    )}
                </Link>
            </div>
            <div className="product-details-area">
                <div className="taglines">
                    <div className="branding">Abeer.label</div>
                    <div className="collection">{product.collection}</div>
                </div>
                <Link href={`/product/${product.id}`} className="product-name">{product.name}</Link>
                <p className="product-description">{product.description}</p>
                <div className="pricing">
                    <div className="price-tag">
                        {product.originalPrice && (
                            <span className="offered-price">₹ {product.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                        <span className="final-price">₹ {product.price.toLocaleString('en-IN')}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;