import "dotenv/config";

export const ServerUrl = `http://${process.env.SERVER_NAME}:${process.env.SERVER_PORT}`;
