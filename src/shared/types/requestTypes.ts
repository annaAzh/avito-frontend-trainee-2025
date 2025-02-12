interface BaseItem {
  name: string;
  description: string;
  location: string;
  image?: string;
  type: 'Недвижимость' | 'Авто' | 'Услуги';
}

interface RealEstate extends BaseItem {
  type: 'Недвижимость';
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
}

interface Auto extends BaseItem {
  type: 'Авто';
  brand: string;
  model: string;
  year: number;
  milage?: number;
}

interface Services extends BaseItem {
  type: 'Услуги';
  serviceType: string;
  experience: number;
  cost: number;
  workSchedule?: string;
}

type ItemRequest = RealEstate | Auto | Services;

type ItemResponse = ItemRequest & { id: number };

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export type { ItemRequest, ItemResponse, RealEstate, Auto, Services, ApiResponse };
