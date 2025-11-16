"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const About = () => {
  const accent =
    "bg-linear-to-r from-orange-600 to-orange-500 text-transparent bg-clip-text";
  return (
    <section
      className="px-6 md:py-12 mt-12 flex flex-col items-center bg-transparent"
      id="about"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl text-center"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          <span className={accent}>About us</span>
        </h2>

        <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6">
          EX2325 is a curated shoe shop focused on clean design, comfortable
          fit, and durable materials. We pick styles that are versatile enough
          to wear every day — from casual runs to sharp, everyday looks.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="text-left">
            <h4 className="font-semibold">Quality first</h4>
            <p className="text-sm text-slate-500">
              Hand-picked materials and construction.
            </p>
          </div>
          <div className="text-left">
            <h4 className="font-semibold">Comfort fit</h4>
            <p className="text-sm text-slate-500">
              Comfort-first sizing and returns.
            </p>
          </div>
          <div className="text-left">
            <h4 className="font-semibold">Fast support</h4>
            <p className="text-sm text-slate-500">
              Reliable support and free returns.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-orange-600 to-orange-500 text-white px-5 py-2.5 font-semibold shadow-md hover:brightness-95 transition"
          >
            Shop our collection
          </Link>
          <Link
            href="#contact"
            className="text-sm text-slate-600 dark:text-slate-400 underline-offset-2 hover:underline"
          >
            Contact us
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
