'use client'
import { useState, useEffect } from "react";
import FilterSideBar from "@/components/(retail)/filter";
import ProductElementView from "@/components/(retail)/ProductElementView";

export default function Home() {
  const [filters, setFilters] = useState<FiltersArrayProps>();
  const [products, setProducts] = useState<ProductProps[] | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[] | null>(null);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch("https://localhost:7084/Filters");
        const data = await response.json();
        setFilters(data);
      } catch (error) {
        console.error("Błąd podczas pobierania filtrów:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch("https://localhost:7084/Products");
        const data: ProductProps[] = await response.json();
        setProducts(data);
        setFilteredProducts(data); 
      } catch (error) {
        console.error("Błąd podczas pobierania produktów:", error);
      }
    };

    fetchFilters();
    fetchProducts();
  }, []);

  const applyFilters = (selectedFilters: any) => {
    if (!products) return;

    let filtered = products.filter((product) => {
      const matchesSize = selectedFilters.sizes.length
        ? product.variants.some((variant) =>
          variant.sizes.some((size) => selectedFilters.sizes.includes(size))
        )
        : true;
      const matchesColor = selectedFilters.colors.length
        ? product.variants.some((variant) => selectedFilters.colors.includes(variant.color))
        : true;
      const matchesGender = selectedFilters.genders.length
        ? selectedFilters.genders.includes(product.gender)
        : true;
      const matchesHeight = selectedFilters.heights.length
        ? selectedFilters.heights.includes(product.height)
        : true;

      return matchesSize && matchesColor && matchesGender && matchesHeight;
    });

    setFilteredProducts(filtered);
  };

  return (
    <main className="bg-[#FFF] w-full flex" id="bg_color">
      <div className="min-[1200px]:hidden absolute">
          <button>Show filters</button>
      </div>
      {filters && (
        <FilterSideBar
          filters={filters}
          onFilterChange={applyFilters} 
        />
      )}
      <div className="w-full">
        {filteredProducts && <ProductElementView product={filteredProducts} />}
      </div>
    </main>
  );
}