import type { Product } from "@/data/products";

// Map products to actual Knobloch image files we downloaded
const productImageMap: Record<string, string> = {
  "stele-edelstahl-3-fach": "/img/products/anlage-09-freistehend.jpg",
  "stele-edelstahl-6-fach": "/img/products/anlage-10-freistehend.jpg",
  "linea-aufputz-anthrazit": "/img/products/aufputz-anthrazit.jpg",
  "linea-aufputz-weiss": "/img/products/aufputz-anthrazit.jpg",
  "cubus-unterputz-v4a": "/img/products/anlage-12-unterputz.jpg",
  "horizon-zaun-doppelreihig": "/img/products/anlage-07-unterputz.jpg",
  "paketbox-solo-anthrazit": "/img/paket/paketbox-einfamilienhaus.jpg",
  "paketbox-duo-kombi": "/img/paket/paketbox-einfamilienhaus.jpg",
};

const categoryFallbackImage: Record<string, string> = {
  freistehend: "/img/products/anlage-06-freistehend.jpg",
  aufputz: "/img/products/aufputz-anthrazit.jpg",
  unterputz: "/img/products/anlage-01-unterputz.jpg",
  zaun: "/img/products/anlage-07-unterputz.jpg",
  tuerelement: "/img/products/anlage-04-unterputz.jpg",
  mauerdurchwurf: "/img/products/anlage-02-unterputz.jpg",
  paketbox: "/img/paket/paketbox-einfamilienhaus.jpg",
  paketanlage: "/img/paket/paketanlage-mehrfamilienhaus.jpg",
  abholstation: "/img/paket/abholstation-gewerbe.jpg",
};

export function getProductImage(product: Product, index = 0): string {
  if (index === 0) {
    return (
      productImageMap[product.slug] ??
      categoryFallbackImage[product.category] ??
      "/img/categories/freistehend.jpg"
    );
  }
  // For galleries, cycle through additional category images
  const additional = [
    `/img/products/anlage-01-${product.category === "aufputz" ? "unterputz" : product.category}.jpg`,
    `/img/products/anlage-02-${product.category === "aufputz" ? "unterputz" : product.category}.jpg`,
    `/img/categories/${product.category}.jpg`,
  ];
  return additional[index % additional.length] ?? categoryFallbackImage[product.category];
}
