
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductElementView({ product }: { product: ProductProps[] }) {
  const router = useRouter();
  return (
    <div className='grid grid-cols-3 w-full '>
      {product.map((product) => {
        const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
        const [showImages, setShowImages] = useState("hidden")
        const variantImages = selectedVariant.images.length > 0
          ? Object.values(selectedVariant.images[0]) 
          : [];
        const [MainImage, setMainImage] = useState(variantImages[0]);

        const handleVariantClick = (productId:number, color:string) => {
          router.push(`/products/${productId}/${color}`); 
        };

        useEffect(()=>{
          if(variantImages.length>0){
            setMainImage(variantImages[0]);
          }
        },[selectedVariant]);
        return (
          <div key={product.productId} className="w-[95%] flex justify-center">
            <div className='px-[5px]'>

            

              {selectedVariant.images.length > 0 && (
                <div
                  className='pointer'
                  onMouseOver={() => setShowImages("")}
                  onMouseOut={() => setShowImages("hidden")}
                  onClick={() => handleVariantClick(product.productId, selectedVariant.color)}  
                >
                  <img
                    src={'https://localhost:7084/images/products/' + MainImage}
                    alt={`${product.name} - ${selectedVariant.color}`}
                    style={{ width: '100%', height: '100%' }}
                  />

                  {/* Dodatkowe obrazy */}
                  <div className={` ${showImages} flex w-full space-x-[1%] py-[5px]`}>
                    {variantImages.slice(1).map((image, index) => (
                      <img
                        key={index}
                        src={'https://localhost:7084/images/products/' + image} 
                        alt={`${product.name} - dodatkowe ${index + 1}`}
                        style={{ width: '32.66%', height: '20%', }}
                        onMouseOver={()=>setMainImage(image)}
                        onMouseOut={()=>setMainImage(variantImages[0])}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h2>{product.name} {product.height}</h2>
                <div className='space-x-[10px]'>
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.color}
                      style={{ background: variant.color }}
                      className='rounded-full w-[30px] h-[30px] border-[1px] border-black'
                      onMouseOver={() => { 
                        setSelectedVariant(variant);
                        
                      }}
                    >
                    </button>
                  ))}
                </div>
              </div>
              <p>Prize: ${product.prize}</p>
            </div>
          </div>
        );
      })}

    </div>
  );
}