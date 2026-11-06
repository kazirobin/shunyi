import mongoose, { Document, Schema } from "mongoose";

export interface IProductCategory extends Document {
  name: string;
  slug: string;
  nameZh: string;
  description?: string;
  descriptionZh?: string;
  image?: {
    public_id: string;
    secure_url: string;
  };
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductCategorySchema = new Schema<IProductCategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    nameZh: {
      type: String,
      required: true,
      trim: true,
    },
    description: { type: String, trim: true },
    descriptionZh: { type: String, trim: true },
    image: {
      public_id: { type: String },
      secure_url: { type: String },
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

ProductCategorySchema.index({ name: 1 }, { unique: true });
ProductCategorySchema.index({ slug: 1 }, { unique: true });
ProductCategorySchema.index({ isActive: 1, displayOrder: 1 });

export default mongoose.models.ProductCategory || mongoose.model<IProductCategory>("ProductCategory", ProductCategorySchema);