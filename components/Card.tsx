"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
type CardProps = {
  source: string;
};

const Card: React.FC<CardProps> = ({ source }) => {
  const [qty, setQty] = useState<number>(1);
  const [size, setSize] = useState<string>("");
  const [sizeError, setSizeError] = useState<string>("");
  const { addItem } = useCart();

  const inc = () => {
    console.log("Card inc click", source);
    setQty((q) => Math.max(0, q + 1));
  };
  const dec = () => {
    console.log("Card dec click", source);
    setQty((q) => Math.max(0, q - 1));
  };

  const handleAdd = () => {
    if (qty <= 0) return;
    if (!size || !size.trim()) {
      setSizeError("Please enter a shoe size");
      return;
    }
    setSizeError("");
    const id = `${source}::${size || "default"}`;
    addItem({ id, source, size: size || undefined, qty });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0 }}
      className="rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900/60 backdrop-blur-md group relative h-auto p-4 flex flex-col justify-between gap-4 min-h-[380px] md:min-h-[420px] overflow-hidden"
    >
      <img
        src={source}
        className="w-full rounded-2xl object-cover h-56 md:h-72 flex-none"
        alt=""
      />

      <div className="flex items-start justify-between gap-3">
        <input
          type="text"
          placeholder="Shoe size"
          name="size"
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          aria-required="true"
          aria-invalid={sizeError ? "true" : "false"}
          className={`border py-2 px-3 text-sm font-light tracking-normal rounded-full w-2/3 ${
            sizeError
              ? "border-red-400 focus:border-red-500 dark:border-red-600"
              : "border-slate-200 dark:border-slate-700"
          }`}
        />

        {sizeError && <p className="text-xs text-red-500 mt-1">{sizeError}</p>}

        <div className="flex flex-col items-end justify-between">
          <h3 className="text-slate-900 dark:text-white text-sm font-medium tracking-wide">
            Qty: <span className="font-normal">{qty}</span>
          </h3>
          <div className="flex items-center justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={inc}
              className="flex h-8 w-8 items-center justify-center cursor-pointer rounded-lg border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white bg-orange-50 dark:bg-slate-800 transition"
            >
              +
            </button>
            <button
              type="button"
              onClick={dec}
              className="flex h-8 w-8 items-center justify-center cursor-pointer rounded-lg border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white bg-orange-50 dark:bg-slate-800 transition"
            >
              -
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          console.log("Add clicked", source, qty, size);
          handleAdd();
        }}
        className="w-full inline-flex items-center justify-center cursor-pointer bg-linear-to-r from-orange-600 to-orange-500 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg transform-gpu hover:scale-[1.01] transition-transform"
      >
        Add to cart
      </button>
    </motion.div>
  );
};

export default Card;
