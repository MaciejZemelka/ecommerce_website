interface AuthState {
    user: string | null;
    loading: boolean;
    error: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    expiresAt: number | null;
  }
  
 
interface UserProps{
    email:string;
    createdDate: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
}

interface UserDetailsProps{
    userDetails: UserProps[] | null;
}

interface AddressProps {
    id: string;
    country: string;
    city: string;
    streetName: string;
    houseNumber: string;
    apartmentNumber?: string | null;
    postalCode: string;
}

interface UserAddressProps{
    addresses: Address[] | null;
}

interface AddressInputFieldProps {
    address: AddressProps | null;
    type: string;
}  

interface FiltersProps {
    size: number,
    colors: string,
    genders: string;
    heights: string;
}

interface FiltersArrayProps{
    sizes: number[] |null,
    colors: string[] | null,
    genders: string[] |null;
    heights: string[] |null;
}

interface ImageGalleryProps {
    image1: string ;
    image2: string ;
    image3: string ;
    image4: string;
  }
  
  interface VariantProps {
    color: string;
    discount: number;
    sizes: number[]; // Zakładam, że lista rozmiarów nie powinna być null
    images: ImageGalleryProps[]; // Obrazy w każdym wariancie
  }
  
  interface ProductProps {
    productId: number;
    name: string;
    description: string;
    category: string;
    price: number;
    gender: string;
    height: string;
    variants: VariantProps[]; // Użyj 'variants' zamiast 'variant'
  }

  interface ProductPageProps {
    productId: number;
    name: string;
    price: number;
    description: string;
    height: string;
    gender: string
    variant: VariantProps;
  };

  interface ProductVariantsProps{
    productId: number;
    colors: stringp[];
  }