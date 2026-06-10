import * as mongoose from "mongoose";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

interface ProductDocument {
  name: string;
  price: number;
  company: string;
  productType: string;
  ratings: number[];
  description: string;
  size: string;
  tags: string[];
  imageUrl: string;
  isAvailable: boolean;
}

const PRODUCT_TYPES = [
  "Laptop",
  "Desktop",
  "Monitor",
  "TV",
  "Camera",
  "Keyboard",
  "Mouse",
  "Headphones",
  "Graphics Card",
  "Processor",
  "Motherboard",
  "RAM",
  "Storage",
  "Cooling System",
  "Power Supply",
];

const TAGS = [
  "Gaming",
  "Laptop",
  "Computer",
  "4K",
  "Wireless",
  "RGB",
  "Performance",
  "Budget",
  "Pro",
  "Compact",
  "Ultra HD",
  "Fast",
];

const SIZES = [
  "15.6 inch",
  "17.3 inch",
  "27 inch",
  "32 inch",
  "55 inch",
  "65 inch",
  "75 inch",
  "Standard",
  "Compact",
];

const COMPANIES = [
  "NVIDIA",
  "Intel",
  "AMD",
  "Dell",
  "HP",
  "ASUS",
  "Sony",
  "Canon",
  "Logitech",
  "Corsair",
  "MSI",
  "Razer",
  "Samsung",
  "LG",
  "Gigabyte",
];

/**
 * Generate a single fake product
 */
function generateProduct(faker: any): ProductDocument {
  const numberOfRatings = faker.number.int({ min: 0, max: 500 });
  const ratings = Array.from({ length: numberOfRatings }, () =>
    faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
  );

  const numberOfTags = faker.number.int({ min: 1, max: 4 });
  const selectedTags = faker.helpers.shuffle(TAGS).slice(0, numberOfTags);
  const productType = faker.helpers.arrayElement(PRODUCT_TYPES);
  const company = faker.helpers.arrayElement(COMPANIES);

  return {
    name: `${company} ${productType} ${faker.commerce.productAdjective()}`,
    price: parseFloat(faker.commerce.price({ min: 50, max: 3000, dec: 2 })),
    company,
    productType,
    ratings,
    description: `High-quality ${productType.toLowerCase()} from ${company}. Perfect for ${faker.helpers.arrayElement(["gaming", "professional work", "content creation", "everyday use"])}. ${faker.commerce.productDescription()}`,
    size: faker.helpers.arrayElement(SIZES),
    tags: selectedTags,
    imageUrl: faker.image.url(),
    isAvailable: faker.datatype.boolean({ probability: 0.9 }),
  };
}

/**
 * Generate multiple fake products
 */
function generateProducts(faker: any, count: number): ProductDocument[] {
  return Array.from({ length: count }, () => generateProduct(faker));
}

/**
 * Seed MongoDB with generated products
 */
async function seedDatabase() {
  const { faker } = await import("@faker-js/faker");
  const count = parseInt(process.argv[2] || "50", 10);
  const mongoUri =
    process.env.MONGODB_URI || "mongodb://localhost:27017/products";

  if (isNaN(count) || count <= 0) {
    console.error("Please provide a valid number of products to generate");
    console.error("Usage: npx ts-node scripts/seed.ts <count>");
    process.exit(1);
  }

  try {
    console.log(`Connecting to MongoDB at ${mongoUri}...`);
    const mongo = await mongoose.connect(mongoUri);
    console.log("✓ Connected to MongoDB");
    console.log(mongo.connection);
    const db = mongo.connection.db;
    if (!db) {
      throw new Error("Failed to get database instance");
    }

    const productsCollection = db.collection("products");

    // Clear existing products
    console.log("Clearing existing products...");
    await productsCollection.deleteMany({});
    console.log("✓ Cleared existing products");

    // Generate and insert products
    console.log(`Generating ${count} products...`);
    const products = generateProducts(faker, count);

    console.log(`Inserting ${count} products into MongoDB...`);
    const result = await productsCollection.insertMany(products);
    console.log(`✓ Successfully inserted ${result.insertedCount} products`);

    // Display summary
    console.log("\n=== Seed Summary ===");
    console.log(`Total products inserted: ${result.insertedCount}`);
    console.log(`Database: ${mongoUri}`);
    console.log(`Collection: products`);
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seedDatabase();
