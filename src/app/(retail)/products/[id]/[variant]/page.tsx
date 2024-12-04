'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';



export default function Home() {
  const { id, variant } = useParams();
  const [product, setProduct] = useState<ProductPageProps | null>(null);
  const [VariantImages, SetVariantImages] = useState<VariantProps|null>(null)
  const [mainImage, setMainImage] = useState()

  let url="https://localhost:7084/GetProduct?ProductId="+id+"&color="+variant;
  const fetchProduct = async () => {
    try {
      const response = await fetch(url);
      const data: ProductPageProps = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Błąd podczas pobierania produktu:', error);
    }
  };

  useEffect(() => {
    if (id && variant) {
      fetchProduct();
    } else {
      window.location.href = '/';
    }
  }, [id, variant]);

  if (!product) {
    return <div>Ładowanie produktu...</div>;
  }

  return (
    <div className='p-4'>
        <div>

        
        {Object.values(product.variant.images[0]).slice(1).map((img)=>(
            <img
              src={`https://localhost:7084/images/products/${img}`}>
            </img>
        ))}
        </div>
        <div>
            
        </div>
    </div>
   
  );
}
