export const STATIC_PREVIEW =
  import.meta.env.MODE === "static-preview" ||
  import.meta.env.VITE_STATIC_PREVIEW === "true";

export const STATIC_PREVIEW_VENDOR_SAMPLE_PATH = "./demo_district_3_vendor_sample.csv";
