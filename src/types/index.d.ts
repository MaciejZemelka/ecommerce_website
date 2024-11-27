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