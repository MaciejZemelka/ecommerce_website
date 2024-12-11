import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductElementView({ product }: { product: ProductProps[] }) {
  const router = useRouter();
  
  const [selectedVariants, setSelectedVariants] = useState(product.map(p => p.variants[0]));
  const [mainImages, setMainImages] = useState(
    product.map(p => p.variants[0].images[0]?.image1 || '')
  );

  const [showImages, setShowImages] = useState(Array(product.length).fill("hidden"));

  useEffect(() => {
    setSelectedVariants(product.map(p => p.variants[0]));
    setMainImages(product.map(p => p.variants[0].images[0]?.image1 || ''));
  }, [product]); 

  const handleVariantClick = (productId: number, color: string) => {
    router.push(`/products/${productId}/${color}`);
  };

  const handleVariantHover = (variant: VariantProps, index: number) => {
    setSelectedVariants(prev => {
      const updatedVariants = [...prev];
      updatedVariants[index] = variant;
      return updatedVariants;
    });

    setMainImages(prev => {
      const updatedImages = [...prev];
      updatedImages[index] = variant.images[0]?.image1 || '';
      return updatedImages;
    });
  };

  return (
    <div className='grid grid-cols-3 w-full max-[1200px]:grid-cols-2'>
      {product.map((prod, index) => {
        const variantImages = selectedVariants[index]?.images.length > 0
          ? Object.values(selectedVariants[index].images[0])
          : [];

        return (
          <div key={prod.productId} className="w-[95%] flex justify-center">
            <div className='px-[5px]'>
              {variantImages.length > 0 && (
                <div
                  className='pointer'
                  onMouseOver={() => setShowImages(prev => {
                    const updated = [...prev];
                    updated[index] = "";
                    return updated;
                  })}
                  onMouseOut={() => setShowImages(prev => {
                    const updated = [...prev];
                    updated[index] = "hidden";
                    return updated;
                  })}
                  onClick={() => handleVariantClick(prod.productId, selectedVariants[index].color)}  
                >
                  <img
                    src={`https://localhost:7084/images/products/${mainImages[index]}`}
                    alt={`${prod.name} - ${selectedVariants[index].color}`}
                    style={{ width: '100%', height: '100%' }}
                  />

                  <div className={`${showImages[index]} flex w-full space-x-[1%] py-[5px]`}>
                    {variantImages.slice(1).map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={`https://localhost:7084/images/products/${image}`} 
                        alt={`${prod.name} - dodatkowe ${imgIndex + 1}`}
                        style={{ width: '32.66%', height: '20%' }}
                        onMouseOver={() => setMainImages(prev => {
                          const updated = [...prev];
                          updated[index] = image;
                          return updated;
                        })}
                        onMouseOut={() => setMainImages(prev => {
                          const updated = [...prev];
                          updated[index] = variantImages[0];
                          return updated;
                        })}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h2>{prod.name} {prod.height}</h2>
                <div className='space-x-[10px]'>
                  {prod.variants.map((variant) => (
                    <button
                      key={variant.color}
                      style={{ background: variant.color }}
                      className='rounded-full w-[30px] h-[30px] border-[1px] border-black'
                      onMouseOver={() => handleVariantHover(variant, index)}
                    />
                  ))}
                </div>
              </div>
              <p>Price: ${prod.price}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
