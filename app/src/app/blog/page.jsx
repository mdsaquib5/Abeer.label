import BlogCard from "@/components/pages/BlogCard";
import TopHeader from "@/components/pages/TopHeader";

const blogData = [
    {
        img: "https://res.cloudinary.com/dhufjjp9t/image/upload/v1727855092/ab-2_fcz94d.png",
        blogLink: "/blog/1",
        title: "The Future of Sustainable Fashion",
        desc: "Discover how eco-friendly materials and ethical production methods are reshaping the fashion industry.",
        authorImg: "https://res.cloudinary.com/dhufjjp9t/image/upload/v1727855092/ab-2_fcz94d.png",
        author: "Mariyam Rehan",
        date: "Oct 15, 2025"
    },
    {
        img: "https://res.cloudinary.com/dhufjjp9t/image/upload/v1727855092/ab-2_fcz94d.png",
        blogLink: "/blog/2",
        title: "Essential Wardrobe Staples",
        desc: "Building a timeless wardrobe starts with these 5 versatile pieces that every modern woman needs.",
        authorImg: "https://res.cloudinary.com/dhufjjp9t/image/upload/v1727855092/ab-2_fcz94d.png",
        author: "Style Team",
        date: "Nov 02, 2025"
    },
    {
        img: "https://res.cloudinary.com/dhufjjp9t/image/upload/v1727855092/ab-2_fcz94d.png",
        blogLink: "/blog/3",
        title: "Color Trends for the Season",
        desc: "From earthy tones to vibrant pops of color, explore the palettes dominating the runway this season.",
        authorImg: "https://res.cloudinary.com/dhufjjp9t/image/upload/v1727855092/ab-2_fcz94d.png",
        author: "Mariyam Rehan",
        date: "Nov 20, 2025"
    }
];

const page = () => {
    return (
        <div className="pages">
            <TopHeader
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blog', href: null }]}
            />
            <div className="shop-page-wrapper">
                <div className="container">
                    <div className="blogs-grid">
                        {blogData.map((item, index) => (
                            <BlogCard key={index} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page;