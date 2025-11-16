"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const images = [
  { src: "/img-1.jpg", alt: "EX2325 sneaker front view" },
  { src: "/img-5.jpg", alt: "EX2325 sneaker side view" },
  { src: "/img-28.jpg", alt: "EX2325 sneaker angle view" },
  { src: "/img-3.jpg", alt: "EX2325 sneaker detail view" },
  { src: "/img-17.jpg", alt: "EX2325 sneaker back view" },
  { src: "/img-1.jpg", alt: "EX2325 sneaker front view" },
];

const Hero = () => {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.2 });

  const newLocal =
    "bg-linear-to-r from-orange-600 to-orange-500 text-transparent bg-clip-text";
  return (
    <section className="mt-20 px-6 md:py-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top text and CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            <span className={newLocal}>EX2325</span>{" "}
            <span className="text-slate-900 dark:text-white">Shoe Store</span>
          </h1>

          <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Step into confidence with shoes crafted for timeless style and
            all-day comfort. Every pair speaks class — no noise, just presence.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center cursor-pointer bg-linear-to-r from-orange-600 to-orange-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              Shop the Drop
            </Link>

            <Link
              href="/#about"
              className="inline-flex items-center justify-center cursor-pointer border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white px-6 py-3 rounded-full hover:bg-orange-50 dark:hover:bg-slate-800 transition"
            >
              Discover More
            </Link>
          </div>
        </motion.div>

        {/* Bento Grid Display */}
        <div ref={gridRef} className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-4 md:grid-cols-6 gap-4 auto-rows-[200px]">
            {/* Large card 1 - spans 2x2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0 }}
              className="col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 group relative"
            >
              <img
                src={images[0].src}
                alt={images[0].alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            {/* Small card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="col-span-2 md:col-span-1 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 group relative"
            >
              <img
                src={images[1].src}
                alt={images[1].alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            {/* Medium card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="col-span-2 md:col-span-2 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 group relative"
            >
              <img
                src={images[2].src}
                alt={images[2].alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            {/* Small card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-2 md:col-span-1 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 group relative"
            >
              <img
                src={images[3].src}
                alt={images[3].alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            {/* Small card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="col-span-2 md:col-span-1 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 group relative"
            >
              <img
                src={images[5].src}
                alt={images[5].alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            {/* Large card 2 - spans 2x2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="col-span-4 row-span-1 md:col-span-3 md:row-span-1 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 group relative"
            >
              <img
                src={images[4].src}
                alt={images[4].alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
