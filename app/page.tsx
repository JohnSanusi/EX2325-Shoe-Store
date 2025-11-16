import About from "@/components/About";
import Hero from "@/components/Hero";
import HomeShop from "@/components/HomeShop";
import Contact from "@/components/Contact";

const page = () => {
  return (
    <main className=" scroll-smooth scroll-pt-20">
      <Hero />
      <About />
      <HomeShop />
      <Contact />
    </main>
  );
};

export default page;
