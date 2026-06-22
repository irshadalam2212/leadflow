export interface IProperty {
  _id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  description: string;
  amenities: string[];
  status: "available" | "sold" | "pending";
}
