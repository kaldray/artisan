export type Product = {
  _id: number | string;
  name: string;
  type: string;
  price: number;
  rating: number;
  warranty_years: number;
  available: boolean;
};

export type Products = Array<Product>;

export type POST_Response = {
  acknowledged: boolean;
  insertedId: string;
};
