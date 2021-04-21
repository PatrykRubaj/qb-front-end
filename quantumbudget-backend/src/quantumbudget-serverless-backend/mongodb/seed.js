db.Budgets.drop();
db.Budgets.insertMany([
  {
    userId: "google-oauth2|116654523008397248270",
    incomes: [
      {
        id: "56e65c0d-ecc6-405f-ba3a-17d7437a2391",
        amount: 1500,
        name: "Starbucks",
        status: 1,
      },
      {
        id: "ec02d232-9d67-4d55-8848-102ed8378871",
        amount: 500,
        name: "McDonald's",
        status: 1,
      },
    ],
    categories: [
      {
        id: "ae1f9c34-6e8e-43a9-a194-68c80bb939fe",
        name: "Food",
        status: 1,
      },
      {
        id: "1e987730-c0b1-4850-b06e-7c3612393254",
        name: "Hygiene",
        status: 1,
      },
      {
        id: "fb734ea9-3576-47f7-a8fe-f64f3d621059",
        name: "Apartment",
        status: 1,
      },
    ],
    subcategories: [
      {
        id: "d6fe654c-3976-4e16-8b25-e4c4a03b5e72",
        name: "Home",
        categoryId: "ae1f9c34-6e8e-43a9-a194-68c80bb939fe",
        amount: null,
        status: 1,
      },
      {
        id: "fb893109-860f-4f04-8319-3cab83812aab",
        name: "Takeout",
        categoryId: "ae1f9c34-6e8e-43a9-a194-68c80bb939fe",
        amount: null,
        status: 1,
      },
      {
        id: "65f8c8da-b796-4020-b5ed-72865ef2dd41",
        name: "Rent",
        categoryId: "fb734ea9-3576-47f7-a8fe-f64f3d621059",
        amount: null,
        status: 1,
      },
      {
        id: "924882d9-a788-4cd4-9084-86def75f5c56",
        name: "Water",
        categoryId: "fb734ea9-3576-47f7-a8fe-f64f3d621059",
        amount: null,
        status: 1,
      },
      {
        id: "c1fd2e63-5ea5-4a2f-86fa-173f4884352e",
        name: "Cosmetics",
        categoryId: "1e987730-c0b1-4850-b06e-7c3612393254",
        amount: null,
        status: 1,
      },
    ],
    country: {
      name: "Poland",
      currency: "PLN",
      emojiU: "U+1F1F5 U+1F1F1",
      key: "PL",
      language: "pl",
    },
    user: {
      agreedToNewsletter: false,
      agreedToPrivacyPolicy: false,
    },
  },
]);
