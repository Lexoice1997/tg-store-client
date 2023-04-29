export const getOrderPrice = (value: number) => {
  if (value >= 60000) {
    return 0;
  }

  return 10000;
};
