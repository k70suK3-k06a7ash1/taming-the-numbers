const SelectConfig = {
  min: 100, // 最小金額
  max: 40000, // 最大金額
  step: 300, // 金額刻み
};

export const generateOptions = () => {
  const options = [];
  for (
    let i = SelectConfig.min;
    i <= SelectConfig.max;
    i += SelectConfig.step
  ) {
    options.push(i);
  }
  return options;
};
