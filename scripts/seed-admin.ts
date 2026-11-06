// Set environment variables BEFORE importing anything that uses them
process.env.MONGODB_URI = "mongodb://shunyigarments_db_user:j7WZbhz6JC4KOodP@ac-ww37g9l-shard-00-00.d55rxhw.mongodb.net:27017,ac-ww37g9l-shard-00-01.d55rxhw.mongodb.net:27017,ac-ww37g9l-shard-00-02.d55rxhw.mongodb.net:27017/shunyigarments?ssl=true&replicaSet=atlas-9v3tbn-shard-0&authSource=admin&retryWrites=true&w=majority";
process.env.MONGODB_DB_NAME = "shunyigarments";

async function main() {
  // Now import after env vars are set
  const { default: connectDB } = await import("@/lib/mongodb");
  const { default: User } = await import("@/models/User");
  const { hashPassword } = await import("@/lib/utils");

  try {
    await connectDB();

    const existingAdmin = await User.findOne({ email: "admin@shunyigarments.com" });
    
    if (existingAdmin) {
      console.log("Admin user already exists");
      console.log("Email:", existingAdmin.email);
      console.log("Role:", existingAdmin.role);
      console.log("Active:", existingAdmin.isActive);
      process.exit(0);
    }

    const hashedPassword = await hashPassword("admin123");

    const admin = await User.create({
      email: "admin@shunyigarments.com",
      password: hashedPassword,
      name: "System Administrator",
      role: "SUPER_ADMIN",
      isActive: true,
    });

    console.log("Admin user created successfully!");
    console.log("Email: admin@shunyigarments.com");
    console.log("Password: admin123");
    console.log("Role: SUPER_ADMIN");
    console.log("ID:", admin._id.toString());

    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
}

main();