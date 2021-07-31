export const dataSchema = {
  name: 'data',
  properties: {
    name: 'string',
    address: 'string',
    latitude: 'string',
    longitude: 'string',
    price: 'string',
    pings: 'string',
    floor: 'string',
    year: 'string',
    _type: 'string',
    presentSituation: 'string',
  }
};

export const cartSchema = {
  name: 'Cart',
  primaryKey: 'name',
  properties: {
    name: 'string',
    price: 'string',
    image: 'string',
    quantity: 'string',
    describe: 'string',
    type: 'string',
  }
};
