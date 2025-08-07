const mongoose = require("mongoose");
const {faker} = require("@faker-js/faker");
const Product = require("../models/product.js");
const Inventory = require("../models/inventory.js");

// const MONGO_URI = "mongodb://localhost:27017/luxe"; // change if needed


// Random enum pickers
const categories = [
  "skin-care",
  "hair-care",
  "dental-care",
  "facial-care",
  "nail-care",
  "makeup",
  "fragrance",
];
const types = [
  "serum",
  "cream",
  "lotion",
  "liquid",
  "scrub",
  "wash",
  "soap",
  "perfume",
  "powder",
  "tool",
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Seed Function
// const seedProducts = async () => {
  // console.log("✅ Connected to MongoDB");
  

//   await Product.insertMany(products);
//   console.log("✅ Seeded 100 products");

//   mongoose.disconnect();
// };

// seedProducts().catch((err) => {
//   console.error("❌ Error seeding products:", err);
//   mongoose.disconnect();
// });








mongoose
  .connect("mongodb://localhost:27017/luxe")
  .then(() => {
    console.log('DATABASE CONNECTED');
  })
  .catch((err) => {
    console.log('ERROR OCCURRED');
    console.log(err);
  });


  const seedDB = async() => {
    await Product.deleteMany({}); // clear old products
    await Inventory.deleteMany({}); // clear old products


    for (let i = 0; i < 60; i++) {
      const newproduct = new Product({
        name: faker.commerce.productName(),
        category: ["all", getRandom(categories)],
        brandName: faker.company.name(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price(10, 120)),
        units: Math.floor(Math.random() * 70),
        type: ["all", getRandom(types)],
      });

      const savedP = await newproduct.save();

      const inventory = new Inventory({
        product: savedP._id,
        unitsSold: Math.floor(Math.random() * 40),
      });

      await inventory.save();
    }


    // for(let i = 0; i < 300; i++){
    //     const random1000 = Math.floor(Math.random() * 1000) + 1;
    //     const price = Math.floor(Math.random() * 20) + 10;
    //     const camp = new Campground({
    //       author: "66e032aa19edc0963a0ee0aa",
    //       location: `${cities[random1000].city}, ${cities[random1000].state}`,
    //       title: `${sample(descriptors)} ${sample(places)}`,
    //       description:
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae omnis deserunt vero accusantium voluptates sit debitis consequuntur reiciendis qui eaque. Repellendus, cupiditate iusto explicabo nobis, provident nulla illo reprehenderit at dolor dolores, tempora atque eos officia in et corporis voluptatem eveniet architecto quis! Voluptatibus aliquid cumque nam in cupiditate!",
    //       price,
    //       geometry: {
    //         type: 'Point',
    //         coordinates: [ cities[random1000].longitude, cities[random1000].latitude ]
    //       },
    //       images: [
    //         {
    //           url: "https://res.cloudinary.com/dfrojjvhq/image/upload/v1728482697/camp1_yup72h.jpg",
    //           filename: "YelpCamp/camp1_yup72h",
    //         },
    //         {
    //           url: "https://res.cloudinary.com/dfrojjvhq/image/upload/v1728482695/camp2_sckwok.jpg",
    //           filename: "YelpCamp/camp2_sckwok",
    //         },
    //       ],
    //     });
    //     await camp.save()
    // }
  }

  seedDB()
  .then(() =>{
    mongoose.connection.close();
  })
