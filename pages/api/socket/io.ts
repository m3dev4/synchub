import { NextApiRequest, NextApiResponse } from "next";
import { NextApiResponseServerIO } from "@/lib/socket";
import { initSocket } from "@/lib/socket";

export default function SocketHandler(
  req: NextApiRequest,
  res: NextApiResponse & NextApiResponseServerIO,
) {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = initSocket(res.socket.server);
    res.socket.server.io = io;
  }
  res.end();
}
