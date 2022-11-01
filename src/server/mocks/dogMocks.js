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
  owner: "62966036b74969251496bffd",
  picturebackup: "backup.jpg",
};

const mockEditedDog = {
  age: 9,
  name: "Chuletas",
  picture: "rocko.jpg",
  title: "Calm Walker",
  toy: "Ball",
  id: "62966036b74969251496bffd",
  weight: "4",
  breed: "beagle",
  personality: "walker",
  bio: "A nice dog",
  picturebackup: "backup.jpg",
  owner: "62966036b74969251496bffd",
};

const mockDogToDelete = {
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
  picturebackup: "backup.jpg",
  owner: "62966036b74969251496bffd",
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
      picturebackup: "backup.jpg",
      owner: "62966036b74969251496bffd",
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
      picturebackup: "backup.jpg",
      owner: "62966036b74969251496bffd",
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
    picturebackup: "backup.jpg",
    owner: "62966036b74969251496bffd",
  },
];

const mockJsonCreateDog =
  '{"name":"asdasd","age":"234","breed":"asdasd","id":"","personality":"Ball","picture":" ","title":"Ball Player","toy":"asdasd","weight":"asdasd","bio":"A good dog","id":"1234","picturebackup":"backup.jpg","owner":"62966036b74969251496bffd"}';

const mockJsonEditedDog =
  '{"name":"asdasd","age":"234","breed":"asdasd","id":"","personality":"Ball","picture":" ","title":"Ball Player","toy":"asdasd","weight":"asdasd","bio":"A good dog","id":"1234","picturebackup":"backup.jpg","owner":"62966036b74969251496bffd"}';

const mockPaginatedResponse = {
  favdogs: {
    totalPages: 1,
    next: "http://127.0.0.1/dogs/favdogs/1",
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
        picturebackup: "backup.jpg",
        owner: "62966036b74969251496bffd",
      },
    ],
  },
};

const mockPaginatedAllResponse = {
  dogs: {
    totalPages: 1,
    next: "http://127.0.0.1/dogs/favdogs/1",
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
        picturebackup: "backup.jpg",
        owner: "62966036b74969251496bffd",
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
  mockDogToDelete,
};
