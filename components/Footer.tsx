import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-slate-200 dark:border-slate-800 py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          © {new Date().getFullYear()} EX2325 — All rights reserved.
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm hover:underline">
            Home
          </Link>
          <Link href="/shop" className="text-sm hover:underline">
            Shop
          </Link>
          <a href="#contact" className="text-sm hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
