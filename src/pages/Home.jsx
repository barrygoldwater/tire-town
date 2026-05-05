import { useState, useRef } from "react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WheelsSection from "@/components/sections/WheelsSection";
import TiresSection from "@/components/sections/TiresSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import ProductModal from "@/components/ProductModal";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const quoteFormRef = useRef(null);

  const scrollToQuote = () => {
    quoteFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <TopBar />
      <Header onQuoteClick={scrollToQuote} />
      <Hero />
      <WheelsSection onProductClick={setSelectedProduct} />
      <TiresSection onProductClick={setSelectedProduct} />
      <ContactSection quoteFormRef={quoteFormRef} />
      <Footer />

      <ProductModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onQuoteClick={scrollToQuote}
      />
    </div>
  );
}