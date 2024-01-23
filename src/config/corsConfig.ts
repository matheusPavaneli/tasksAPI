import dotenv from 'dotenv';
dotenv.config();

interface CorsInterface {
  origin: string,
  methods: string,
  credentials: boolean;
  optionSuccessStatus: number
}

const corsConfig: CorsInterface = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: 'GET,PUT,POST,DELETE',
  credentials: true,
  optionSuccessStatus: 204,
}
console.log(corsConfig.origin);

export default corsConfig;