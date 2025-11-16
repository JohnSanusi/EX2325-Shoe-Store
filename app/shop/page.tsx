import Cards from "@/components/Cards";

const page = () => {
  const accent =
    "bg-linear-to-r from-orange-600 to-orange-500 text-transparent bg-clip-text";
  return (
    <section className="px-6 md:px-8 mt-26">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            <span className={accent}>Explore our products</span>
          </h2>
        </div>

        <p className="text-slate-600 dark:text-slate-400 max-w-3xl mb-8">
          Hand-selected styles for everyday wear. Browse our latest arrivals
          below — click an item to choose your size and add it to the cart.
        </p>

        <div>
          <Cards />
        </div>
      </div>
    </section>
  );
};

export default page;
