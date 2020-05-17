export class LandmarkModel {
  objectId: string;
  title: string;
  short_info: string;
  description: string;
  url: string;
  photo: string;
  photo_thumb: string;
  location: {
    lat: number;
    long: number;
  };
}
