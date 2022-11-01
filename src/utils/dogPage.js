const dogPage = (totalDogs, page, host) => {
  const totalPages = Math.ceil(totalDogs.length / 6);
  const initialPageIndex = page * 6;
  const finalPageIndex = initialPageIndex + 6;

  const totalDogsForPage = totalDogs.slice(initialPageIndex, finalPageIndex);
  const nextPage = () => {
    if (page >= totalPages) {
      return null;
    }
    return `http://${host}/dogs/favdogs/${+page + 1}`;
  };

  const next = nextPage();

  return { totalPages, next, dogs: totalDogsForPage };
};

module.exports = dogPage;
