const mockCreateDog = {
  age: 9,
  name: "Chuletas",
  picture: "rocko.jpg",
  title: "Calm Walker",
  toy: "Ball",
  weight: "4",
  breed: "beagle",
  personality: "walker",
  bio: "A nice dog",
};

const mockEditedDog = {
  age: 9,
  name: "Chuletas",
  picture: "rocko.jpg",
  title: "Calm Walker",
  toy: "Ball",
  id: "1234",
  weight: "4",
  breed: "beagle",
  personality: "walker",
  bio: "A nice dog",
};

const mockUserDogPaginated = {
  favdogs: [
    {
      age: 9,
      name: "Chuletas",
      picture: "rocko.jpg",
      title: "Calm Walker",
      toy: "Ball",
      id: "1234",
      weight: "4",
      breed: "beagle",
      personality: "walker",
      bio: "A nice dog",
    },
  ],
};

const mockDogById = {
  favdogs: [
    {
      age: 9,
      name: "Chuletas",
      picture: "rocko.jpg",
      title: "Calm Walker",
      toy: "Ball",
      id: "123",
      weight: "4",
      breed: "beagle",
      personality: "walker",
      bio: "A nice dog",
    },
  ],
};

const mockAllDogs = [
  {
    age: 9,
    name: "Chuletas",
    picture: "rocko.jpg",
    title: "Calm Walker",
    toy: "Ball",
    id: "1234",
    weight: "4",
    breed: "beagle",
    personality: "walker",
    bio: "A nice dog",
  },
];

const mockJsonCreateDog =
  '{"name":"asdasd","age":"234","breed":"asdasd","id":"","personality":"Ball","picture":{},"title":"Ball Player","toy":"asdasd","weight":"asdasd","bio":"A good dog"}';

const mockJsonEditedDog =
  '{"name":"asdasd","age":"234","breed":"asdasd","id":"","personality":"Ball","picture":{},"title":"Ball Player","toy":"asdasd","weight":"asdasd","bio":"A good dog","id":"1234"}';

const mockPaginatedResponse = {
  favdogs: {
    totalPages: 1,
    next: "http://localhost:4000/dogs/favdogs/1",
    dogs: [
      {
        age: 9,
        name: "Chuletas",
        picture: "rocko.jpg",
        title: "Calm Walker",
        toy: "Ball",
        id: "1234",
        weight: "4",
        breed: "beagle",
        personality: "walker",
        bio: "A nice dog",
      },
    ],
  },
};

const mockPaginatedAllResponse = {
  dogs: {
    totalPages: 1,
    next: "http://localhost:4000/dogs/favdogs/1",
    dogs: [
      {
        age: 9,
        name: "Chuletas",
        picture: "rocko.jpg",
        title: "Calm Walker",
        toy: "Ball",
        id: "1234",
        weight: "4",
        breed: "beagle",
        personality: "walker",
        bio: "A nice dog",
      },
    ],
  },
};

module.exports = {
  mockCreateDog,
  mockJsonCreateDog,
  mockEditedDog,
  mockJsonEditedDog,
  mockUserDogPaginated,
  mockPaginatedResponse,
  mockDogById,
  mockAllDogs,
  mockPaginatedAllResponse,
};
