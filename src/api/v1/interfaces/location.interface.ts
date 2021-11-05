interface IBaseLocation {
  id: number;
  name: string;
}

export interface ICity extends IBaseLocation {}

export interface IDistrict extends IBaseLocation {
  city_id: number;
}

export interface IWard extends IBaseLocation {
  district_id: number;
}

export interface IPublicLocation {
  city_name: string;
  city_code: number;
  district_name: string;
  district_code: number;
  ward_name: string;
  ward_code: number;
  street: string;
  full_address: string;
}
