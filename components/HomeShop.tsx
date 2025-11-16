import Cards from "./Cards";
import Link from "next/link";

const HomeShop = () => {
  const accent =
    "bg-linear-to-r from-orange-600 to-orange-500 text-transparent bg-clip-text";
  return (
    <section className="px-6 md:px-8 mt-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            <span className={accent}>Explore our products</span>
          </h2>
          <Link
            href="/shop"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-orange-600 text-white px-4 py-2 font-semibold hover:brightness-95 transition"
          >
            View all
          </Link>
        </div>

        <p className="text-slate-600 dark:text-slate-400 max-w-3xl mb-8">
          Hand-selected styles for everyday wear. Browse our latest arrivals
          below — click an item to choose your size and add it to the cart.
        </p>

        {/* Cards already renders a responsive grid; avoid nesting another grid around it to prevent compressed items */}
        <div>
          <Cards limit={6} />
        </div>
      </div>
    </section>
  );
};

export default HomeShop;
