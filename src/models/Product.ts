import mongoose, { Document, Schema } from "mongoose";

export type ProductType = "KNITWEAR" | "WOVEN" | "DENIM" | "OUTERWEAR";
export type ProductSeason = "SPRING_SUMMER" | "AUTUMN_WINTER" | "ALL_SEASON";

export interface IProductImage {
  public_id: string;
  secure_url: string;
  alt?: string;
  isPrimary: boolean;
  displayOrder: number;
}

export interface IProductSpecification {
  label: string;
  value: string;
  labelZh?: string;
  valueZh?: string;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  nameZh: string;
  category: mongoose.Types.ObjectId;
  productType: ProductType;
  season: ProductSeason;
  description: string;
  descriptionZh: string;
  shortDescription?: string;
  shortDescriptionZh?: string;
  images: IProductImage[];
  fabricComposition: string;
  fabricCompositionZh: string;
  gsm: string;
  availableColors: string[];
  availableSizes: string[];
  specifications: IProductSpecification[];
  certifications: string[];
  minimumOrderQuantity: number;
  leadTimeDays: number;
  specSheetUrl?: {
    public_id: string;
    secure_url: string;
  };
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductImageSchema = new Schema<IProductImage>({
  public_id: { type: String, required: true },
  secure_url: { type: String, required: true },
  alt: { type: String },
  isPrimary: { type: Boolean, default: false },
  displayOrder: { type: Number, default: 0 },
});

const ProductSpecificationSchema = new Schema<IProductSpecification>({
  label: { type: String, required: true },
  value: { type: String, required: true },
  labelZh: { type: String },
  valueZh: { type: String },
});

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    nameZh: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
      index: true,
    },
    productType: {
      type: String,
      enum: ["KNITWEAR", "WOVEN", "DENIM", "OUTERWEAR"],
      required: true,
      index: true,
    },
    season: {
      type: String,
      enum: ["SPRING_SUMMER", "AUTUMN_WINTER", "ALL_SEASON"],
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    descriptionZh: {
      type: String,
      required: true,
    },
    shortDescription: { type: String, trim: true },
    shortDescriptionZh: { type: String, trim: true },
    images: [ProductImageSchema],
    fabricComposition: {
      type: String,
      required: true,
    },
    fabricCompositionZh: {
      type: String,
      required: true,
    },
    gsm: {
      type: String,
      required: true,
    },
    availableColors: [{ type: String, trim: true }],
    availableSizes: [{ type: String, trim: true }],
    specifications: [ProductSpecificationSchema],
    certifications: [{ type: String, trim: true }],
    minimumOrderQuantity: {
      type: Number,
      default: 1000,
      min: 1,
    },
    leadTimeDays: {
      type: Number,
      default: 30,
      min: 1,
    },
    specSheetUrl: {
      public_id: { type: String },
      secure_url: { type: String },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.index({ name: 1 });
ProductSchema.index({ slug: 1 }, { unique: true });
ProductSchema.index({ category: 1, isActive: 1 });
ProductSchema.index({ productType: 1, isActive: 1 });
ProductSchema.index({ isFeatured: 1, isActive: 1 });
ProductSchema.index({ name: "text", description: "text", nameZh: "text", descriptionZh: "text" });

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);