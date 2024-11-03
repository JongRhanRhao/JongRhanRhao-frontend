import io, { Socket } from "socket.io-client";
import { SERVER_URL } from "@/lib/variables";

export const socket: Socket = io(SERVER_URL, {
  withCredentials: true,
});
