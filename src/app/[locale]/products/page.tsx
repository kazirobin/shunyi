"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Filter, Search, ChevronDown, Shirt, Scissors, Layers, Box } from "lucide-react";

const categories = [
  { id: "all", name: "All Products", icon: Box },
  { id: "knitwear", name: "Knitwear", icon: Shirt },
  { id: "woven", name: "Woven", icon: Scissors },
  { id: "denim", name: "Denim", icon: Layers },
  { id: "outerwear", name: "Outerwear", icon: Box },
];

const mockProducts = [
  { id: 1, name: "Classic Cotton T-Shirt", category: "knitwear", type: "KNITWEAR", season: "ALL_SEASON", image: "👕", colors: ["White", "Black", "Navy", "Grey"], sizes: ["S", "M", "L", "XL", "XXL"], gsm: "180", fabric: "100% Cotton", moq: 3000 },
  { id: 2, name: "Premium Polo Shirt", category: "knitwear", type: "KNITWEAR", season: "SPRING_SUMMER", image: "👔", colors: ["White", "Navy", "Black", "Red"], sizes: ["S", "M", "L", "XL"], gsm: "220", fabric: "95% Cotton, 5% Elastane", moq: 2000 },
  { id: 3, name: "Hooded Sweatshirt", category: "knitwear", type: "KNITWEAR", season: "AUTUMN_WINTER", image: "🧥", colors: ["Grey", "Black", "Navy", "Maroon"], sizes: ["S", "M", "L", "XL", "XXL"], gsm: "320", fabric: "80% Cotton, 20% Polyester", moq: 1500 },
  { id: 4, name: "Formal Dress Shirt", category: "woven", type: "WOVEN", season: "ALL_SEASON", image: "👔", colors: ["White", "Light Blue", "Pink", "Striped"], sizes: ["S", "M", "L", "XL", "XXL"], gsm: "130", fabric: "100% Cotton Poplin", moq: 2500 },
  { id: 5, name: "Casual Linen Shirt", category: "woven", type: "WOVEN", season: "SPRING_SUMMER", image: "👕", colors: ["White", "Beige", "Light Blue", "Sage"], sizes: ["S", "M", "L", "XL"], gsm: "150", fabric: "100% Linen", moq: 2000 },
  { id: 6, name: "Slim Fit Chino Pants", category: "woven", type: "WOVEN", season: "ALL_SEASON", image: "👖", colors: ["Khaki", "Navy", "Black", "Olive"], sizes: ["28", "30", "32", "34", "36", "38"], gsm: "240", fabric: "98% Cotton, 2% Elastane", moq: 2000 },
  { id: 7, name: "Classic Denim Jeans", category: "denim", type: "DENIM", season: "ALL_SEASON", image: "👖", colors: ["Indigo", "Black", "Light Blue"], sizes: ["28", "30", "32", "34", "36", "38"], gsm: "380", fabric: "100% Cotton Denim", moq: 3000 },
  { id: 8, name: "Denim Jacket", category: "denim", type: "DENIM", season: "AUTUMN_WINTER", image: "🧥", colors: ["Indigo", "Black"], sizes: ["S", "M", "L", "XL"], gsm: "420", fabric: "100% Cotton Denim", moq: 1500 },
  { id: 9, name: "Puffer Jacket", category: "outerwear", type: "OUTERWEAR", season: "AUTUMN_WINTER", image: "🧥", colors: ["Black", "Navy", "Olive", "Red"], sizes: ["S", "M", "L", "XL", "XXL"], gsm: "N/A", fabric: "100% Nylon, Down Fill", moq: 1000 },
  { id: 10, name: "Waterproof Trench Coat", category: "outerwear", type: "OUTERWEAR", season: "SPRING_SUMMER", image: "🧥", colors: ["Beige", "Navy", "Black"], sizes: ["S", "M", "L", "XL"], gsm: "N/A", fabric: "100% Polyester with PU Coating", moq: 1200 },
  { id: 11, name: "Bomber Jacket", category: "outerwear", type: "OUTERWEAR", season: "ALL_SEASON", image: "🧥", colors: ["Black", "Olive", "Navy", "Burgundy"], sizes: ["S", "M", "L", "XL"], gsm: "280", fabric: "100% Nylon, Polyester Fill", moq: 1500 },
  { id: 12, name: "Fleece Zip Jacket", category: "outerwear", type: "OUTERWEAR", season: "AUTUMN_WINTER", image: "🧥", colors: ["Grey", "Black", "Navy"], sizes: ["S", "M", "L", "XL", "XXL"], gsm: "300", fabric: "100% Polyester Fleece", moq: 2000 },
];

export default function ProductsPage() {
  const t = useTranslations("products");
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.fabric.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
          {t("title")}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground">
          Browse our comprehensive range of high-quality garments manufactured to international standards.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <div className="card-content pt-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                  aria-pressed={activeCategory === cat.id}
                >
                  <cat.icon className="h-4 w-4" />
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input pl-10 w-64"
                />
              </div>
              <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "grid" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                  aria-label="Grid view"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "list" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                  aria-label="List view"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {viewMode === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="card overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-square bg-muted/50 flex items-center justify-center text-6xl relative overflow-hidden">
                  <span>{product.image}</span>
                  <div className="absolute top-3 right-3">
                    <span className="badge badge-outline">{product.type}</span>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-foreground line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="badge badge-outline">{product.season.replace("_", " ")}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {product.colors.slice(0, 4).map((color) => (
                      <span key={color} className="px-2 py-0.5 text-xs rounded bg-muted text-muted-foreground">
                        {color}
                      </span>
                    ))}
                    {product.colors.length > 4 && (
                      <span className="px-2 py-0.5 text-xs rounded bg-muted text-muted-foreground">
                        +{product.colors.length - 4} more
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm pt-2 border-t">
                    <span className="text-muted-foreground">MOQ: {product.moq.toLocaleString()}</span>
                    <span className="font-medium text-foreground">GSM: {product.gsm}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full" role="table">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Product</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Season</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Fabric</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">GSM</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Colors</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Sizes</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">MOQ</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProducts.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.03 }}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{product.image}</span>
                        <div>
                          <p className="font-medium text-foreground">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.fabric}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="badge badge-outline">{product.type}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{product.season.replace("_", " ")}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{product.fabric}</td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{product.gsm}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {product.colors.slice(0, 3).map((color) => (
                          <span key={color} className="px-2 py-0.5 text-xs rounded bg-muted text-muted-foreground">
                            {color}
                          </span>
                        ))}
                        {product.colors.length > 3 && (
                          <span className="px-2 py-0.5 text-xs rounded bg-muted text-muted-foreground">
                            +{product.colors.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {product.sizes.slice(0, 3).join(", ")}
                      {product.sizes.length > 3 && ` +${product.sizes.length - 3}`}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{product.moq.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">
                      <button className="btn btn-ghost btn-sm">View Details</button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}