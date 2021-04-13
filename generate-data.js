const { fake } = require('faker');
const faker = require('faker');
const fs = require('fs');

// set local to use vietnames
fake.local = 'vi';

// Random-data
// console.log(faker.commerce.department());
// console.log(faker.commerce.price());
// console.log(faker.commerce.productDescription());
// console.log(faker.image.imageUrl());
const randomCategoryList = (n) => {
  if (n <= 0) return [];
  const categoryList = [];
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      createAt: Date.now(),
      updateAt: Date.now(),
    };
    categoryList.push(category);
  });
  return categoryList;
};
const randomProductList = (categoryList, numberOfList) => {
  console.log(numberOfList);
  if (numberOfList <= 0) return [];
  const productList = [];
  console.log(categoryList, numberOfList);
  for (const category of categoryList) {
    Array.from(new Array(numberOfList)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        createAt: Date.now(),
        updateAt: Date.now(),
        thumbnailUrl: faker.image.imageUrl(400, 400),
      };
      productList.push(product);
    });
  }
  return productList;
};
// IFFE
(() => {
  // random-list
  const categoryList = randomCategoryList(4);
  const productList = randomProductList(categoryList, 5);
  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: 'Tien',
    },
  };
  //   write db obj to db.json
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('write sucessfully');
  });
})();
