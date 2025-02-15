type ExtraFields = {
  id: number;
  name: FieldName;
  label: string;
  required: boolean;
  type: 'string' | 'number';
  domElement: 'input' | 'select';
  items?: { label?: string; value: string }[];
};

type FieldName =
  | 'name'
  | 'description'
  | 'location'
  | 'image'
  | 'type'
  | 'propertyType'
  | 'brand'
  | 'model'
  | 'year'
  | 'mileage'
  | 'serviceType'
  | 'experience'
  | 'cost'
  | 'workSchedule'
  | 'area'
  | 'rooms'
  | 'price';

export type { ExtraFields, FieldName };
