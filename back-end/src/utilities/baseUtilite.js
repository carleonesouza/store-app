
exports.CONSTANTS = {
  DATABASE: 'mongodb+srv://carleone:PE24ca25@storeapp-evklx.gcp.mongodb.net/DataStore?retryWrites=true&w=majority',
  PORT: process.env.PORT || 8080,
  MAX_LOGIN_ATTEMPTS: 5,
  LOCK_TIME: 2 * 60 * 60 * 1000,
  SALT_WORK_FACTOR: 10,
  USER:"carleone",
  MONGO_ATLAS_PW:"PE24ca25",
  JWT_KEY: '8754kdraehrajehfjdafgkajr8495904u5ndfla'
};
