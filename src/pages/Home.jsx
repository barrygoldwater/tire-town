import { useState, useRef } from "react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoryStrip from "@/components/CategoryStrip";
import WheelsSection from "@/components/sections/WheelsSection";
import TiresSection from "@/components/sections/TiresSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import ProductModal from "@/components/ProductModal";
import MobileBottomBar from "@/components/MobileBottomBar";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [category, setCategory] = useState("golf_cart");
  const quoteFormRef = useRef(null);

  const scrollToQuote = () => {
    quoteFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen pb-20 sm:pb-0">
      <TopBar />
      <Header onQuoteClick={scrollToQuote} />
      <Hero />
      <CategoryStrip selected={category} onSelect={setCategory} />
      <WheelsSection onProductClick={setSelectedProduct} category={category} />
      <TiresSection onProductClick={setSelectedProduct} category={category} />
      <ContactSection quoteFormRef={quoteFormRef} />
      <Footer />

      <ProductModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onQuoteClick={scrollToQuote}
      />
      <MobileBottomBar onQuoteClick={scrollToQuote} />
    </div>
  );
}