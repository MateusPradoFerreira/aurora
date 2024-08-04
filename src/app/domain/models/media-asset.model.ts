import { Variant } from "./variant.model";

export class MediaAsset {
  id: number;
  created_at: string;
  updated_at: string;
  md5: string;
  file_ext: string;
  file_size: number;
  image_width: number;
  image_height: number;
  duration: string;
  status: string;
  file_key: string;
  is_public: boolean;
  pixel_hash: string;
  variants: Variant[];
}