import { config } from "dotenv";
config({ path: ".env.local" });

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || "shunyigarments";

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB_NAME });
    console.log("Connected to MongoDB");

    const db = mongoose.connection.db!;
    const users = db.collection("users");

    const existing = await users.findOne({ email: "admin@shunyigarments.com" });
    if (existing) {
      console.log("Admin already exists:", existing.email);
      console.log("Role:", existing.role);
      await mongoose.disconnect();
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 12);

    await users.insertOne({
      email: "admin@shunyigarments.com",
      password: hashedPassword,
      name: "System Administrator",
      role: "SUPER_ADMIN",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("Admin user created successfully!");
    console.log("Email: admin@shunyigarments.com");
    console.log("Password: admin123");
    console.log("Role: SUPER_ADMIN");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seed();