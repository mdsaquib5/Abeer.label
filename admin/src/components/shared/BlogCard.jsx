import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const BlogCard = ({ item }) => {
    return (
        <div className="blog-card">
            <div className="blog-img">
                <Image src={item.img} alt="blog" width={600} height={400} style={{ objectFit: 'cover' }} />
                <Link href={item.blogLink} className="blog-icon"><HiOutlineArrowLongRight /></Link>
            </div>
            <div className="blog-content">
                <div className="blog-title"><Link href={item.blogLink || "/"}>
                    {item.title}
                </Link></div>
                <p>{item.desc}</p>
                <div className="author-detail">
                    <div className="author-img">
                        <Image src={item.authorImg} alt="author" width={50} height={50} style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="name-date">
                        <div className="author">{item.author}</div>
                        <div className="date">{item.date}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard;