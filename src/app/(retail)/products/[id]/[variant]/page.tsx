'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ProductPage from '@/components/(retail)/productPage';


export default function Home() {
  const { id, variant } = useParams();
  const [product, setProduct] = useState<ProductPageProps | null>(null);
  const [otherVariants, setOtherVariants] = useState<ProductVariantsProps | null>(null);
  const [VariantImages, SetVariantImages] = useState<VariantProps | null>(null)
  const [mainImage, setMainImage] = useState<string | null>(null);



  let url = "https://localhost:7084/GetProduct?ProductId=" + id + "&color=" + variant;


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(url);
        const data: ProductPageProps = await response.json();
        await setProduct(data);

      } catch (error) {
        console.error('Błąd podczas pobierania produktu:', error);
      }
    };

    const fetchOtherVariants = async () => {
      try {
        const response = await fetch('https://localhost:7084/GetVariants?ProductId='+id);
        const data: ProductVariantsProps = await response.json();
        await setOtherVariants(data);

      } catch (error) {
        console.error('Błąd podczas pobierania produktu:', error);
      }
    };

    if (id && variant) {
      fetchProduct();
      fetchOtherVariants();
    } else {
      window.location.href = '/';
    }
  }, [id, variant]);

  if (!product) {
    return <div>Ładowanie produktu...</div>;
  }

  return (
    <main className='flex justify-center'>

        {product && otherVariants && (
          <ProductPage product={product} otherVariants={otherVariants}></ProductPage>
        )
        }

    </main>

  );
}
