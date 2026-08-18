export type PredictionRequest = {
  area_sqft: number;
  floor_num: number;
  bathroom_num: number;
  balcony_num: number;
  location: string;
  furnishing: string;
  transaction: string;
  ownership: string;
  facing: string;
};

export type PredictionResponse = {
  predicted_price: number;
};