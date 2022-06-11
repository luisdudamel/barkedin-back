const dogPage = (totalDogs, page) => {
  const totalPages = Math.ceil(totalDogs.length / 6);
  const initialPageIndex = page * 6;
  const finalPageIndex = initialPageIndex + 6;

  const totalDogsForPage = totalDogs.slice(initialPageIndex, finalPageIndex);

  return { totalPages, totalDogsForPage };
};

module.exports = dogPage;
