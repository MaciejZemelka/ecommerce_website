

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function ProductPage({ product, otherVariants }: { product: ProductPageProps,otherVariants:ProductVariantsProps }) {
    const router = useRouter();
    const [mainImage, setMainImage] = useState(product.variant.images[0].image1);
    const sizes = Array.isArray(product.variant.sizes)
        ? product.variant.sizes
        : [product.variant.sizes];

    return (

        <div className='flex flex-col lg:flex-row gap-8 py-10 lg:w-[75%]  md:w-[60%] sm:w-[70%] w-[80%]'>
            <div className='flex min-[1300px]:ml-[15%]'>
                <div className='flex flex-col gap-2 px-5 max-[1023px]:hidden'>
                    {product && Object.values(product.variant.images[0]).map((image, key) => {
                        return (
                            
                            <img
                                key={key}
                                src={`https://localhost:7084/images/products/${image}`}
                                alt={image}
                                className="w-[106px] object-cover cursor-pointer border border-gray-300 hover:border-black"
                                onMouseOver={()=>setMainImage(image )}
                            />
                        )
                    })}
                </div>
                <div className='w-[450px] '>
                    <img
                        src={`https://localhost:7084/images/products/${mainImage}`}
                        alt={`${mainImage}`}
                        className='w-full max-w-md object-cover'
                    />
                    
                </div>
            </div>

            <div className="lg:w-1/4 md:w-full flex flex-col  ">
                
                <h1 className="text-2xl font-bold mb-2">{product.name} {product.height}</h1>

                <p className="text-gray-600 mb-4">Gender: {product.gender}</p>

                <p className="text-xl font-semibold text-black mb-6">{product.price} $</p>

                <p className="text-xl font-semibold text-black mb-6">{product.description}</p>
                
                <div className='md:space-x-2 space-x-5 pb-5'>
                <p className=" font-semibold text-black mb-6">Other Colors:</p>
                    {otherVariants.colors.map((color)=>(
                        <button
                        key={color}
                        style={{ background: color }}
                        className='rounded-full w-[40px] h-[40px] border-2'
                        onClick={()=>{router.push(`/products/${product.productId}/${color}`)}}
                      >

                      </button>

                    ))}
                </div>

                <p className="text-lg font-medium mb-2">Choose size:</p>
                <div className="grid grid-cols-4 gap-2">
                    {product.variant.sizes.map((size, index) => (
                        <button
                            key={index}
                            className="border border-gray-300 rounded-md py-2 text-sm hover:bg-gray-100"
                            
                        >
                            {size}
                        </button>
                    ))}
                </div>

                <button className="mt-6 w-full bg-black text-white py-3 text-lg rounded-md hover:bg-gray-800">
                    Add to Cart
                </button>
            </div>
        </div>

    );
}