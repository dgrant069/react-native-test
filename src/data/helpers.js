import uuid from 'uuid/v4';

export const giftConstructor = (name) => {
  const id = uuid().toString();

  return {
    id,
    name,
    completed: false,
    description: "this is the description",
    costMetric: 1,
    enjoyMetric: 1,
    frequencyMetric: 2,
  }
}
