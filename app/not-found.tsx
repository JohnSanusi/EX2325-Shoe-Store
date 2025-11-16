"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <h2 className="text-4xl font-bold text-orange-600 mb-4">404</h2>
        <h1 className="text-2xl font-semibold mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-linear-to-r from-orange-600 to-orange-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
}
