module.exports = {
  /**
   * Returns a random number between min (inclusive) and max (inclusive)
   */
  random_number: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
};
