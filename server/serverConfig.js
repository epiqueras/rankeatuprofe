const serverConfig = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/rankea-tu-profe',
  port: process.env.PORT || 3000,
};

export default serverConfig;
