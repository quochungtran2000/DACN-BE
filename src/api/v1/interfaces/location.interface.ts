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
