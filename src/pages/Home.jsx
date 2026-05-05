import { useState, useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoryStrip from "@/components/CategoryStrip";
import Inventory from "@/components/sections/Inventory";
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
<Header onQuoteClick={scrollToQuote} />
      <Hero />
      <CategoryStrip selected={category} onSelect={setCategory} />
      <Inventory onProductClick={setSelectedProduct} category={category} />
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