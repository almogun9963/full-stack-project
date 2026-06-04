# Product Data Generation Scripts

This directory contains scripts to generate fake product data using faker.js.

## Scripts

### `generate.ts`

Generates fake product data and outputs it as JSON to stdout. Useful for testing or manual inspection.

**Usage:**

```bash
npx ts-node scripts/generate.ts <count>
```

**Example:**

```bash
# Generate 10 products
npx ts-node scripts/generate.ts 10

# Generate 50 products and save to file
npx ts-node scripts/generate.ts 50 > products.json
```

### `seed.ts`

Generates fake product data and seeds it directly into MongoDB. Clears existing products before inserting new ones.

**Prerequisites:**

- MongoDB server running
- `MONGODB_URI` environment variable set (defaults to `mongodb://localhost:27017/products`)

**Usage:**

```bash
npx ts-node scripts/seed.ts <count>
```

**Example:**

```bash
# Seed 100 products to MongoDB
npx ts-node scripts/seed.ts 100

# With custom MongoDB URI
MONGODB_URI=mongodb://user:password@localhost:27017/mydb npx ts-node scripts/seed.ts 50
```

## Installation

Before running these scripts, install the required dependencies:

```bash
npm install @faker-js/faker
npm install --save-dev ts-node dotenv  # if not already installed
```

## Generated Product Schema

Each generated product includes:

- **name**: Electronics product name (e.g., "NVIDIA Laptop Professional")
- **price**: Product price between $50-$3000
- **company**: One of: NVIDIA, Intel, AMD, Dell, HP, ASUS, Sony, Canon, Logitech, Corsair, MSI, Razer, Samsung, LG, Gigabyte
- **productType**: One of: Laptop, Desktop, Monitor, TV, Camera, Keyboard, Mouse, Headphones, Graphics Card, Processor, Motherboard, RAM, Storage, Cooling System, Power Supply
- **ratings**: Array of ratings between 1-5
- **description**: Electronics-focused description with use case context
- **size**: One of: 15.6 inch, 17.3 inch, 27 inch, 32 inch, 55 inch, 65 inch, 75 inch, Standard, Compact
- **tags**: Array of 1-4 tech/gaming tags (Gaming, Laptop, Computer, 4K, Wireless, RGB, Performance, Budget, Pro, Compact, Ultra HD, Fast)
- **imageUrl**: Fake image URL (faker.image.url)
- **isAvailable**: Boolean, 90% chance of true

## Customization

You can modify the following arrays in the scripts to customize generated data:

- `PRODUCT_TYPES`: Available electronics product categories
- `TAGS`: Available tech/gaming tags
- `SIZES`: Available display/physical sizes
- `COMPANIES`: Available tech companies

## Notes

- The `seed.ts` script will **delete all existing products** before inserting new ones
- Both scripts support providing the count as a command-line argument (defaults to 10 and 50 respectively)
- Large datasets may take a few moments to generate and insert
