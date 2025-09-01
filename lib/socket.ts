import { Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";

export type NextApiResponseServerIO = {
  socket: {
    server: NetServer & {
      io: ServerIO;
    };
  };
};

let io: ServerIO;

export const initSocket = (server: NetServer) => {
  if (!io) {
    console.log("🚀 Initializing Socket.IO server...");
    io = new ServerIO(server, {
      path: "/api/socket/io",
      addTrailingSlash: false,
      cors: {
        origin:
          process.env.NODE_ENV === "production"
            ? process.env.NEXTAUTH_URL
            : "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      // Rejoindre une room basée sur l'ID utilisateur
      socket.on("join-user-room", (userId: string) => {
        socket.join(`user-${userId}`);
        console.log(`User ${userId} joined room user-${userId}`);
      });

      // Quitter une room
      socket.on("leave-user-room", (userId: string) => {
        socket.leave(`user-${userId}`);
        console.log(`User ${userId} left room user-${userId}`);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }

  return io;
};

export const getSocket = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

// Types pour les événements
export interface NotificationEvent {
  id: string;
  userId: string;
  type:
    | "FOLLOW"
    | "UNFOLLOW"
    | "FOLLOW_REQUEST"
    | "LIKE"
    | "COMMENT"
    | "MESSAGE"
    | "POST";
  title: string;
  message: string;
  data?: unknown;
  createdAt: Date;
}

// Fonction pour émettre une notification
export const emitNotification = (
  userId: string,
  notification: NotificationEvent,
) => {
  if (io) {
    console.log(`📤 Attempting to emit notification to user-${userId}`);
    console.log(`📤 Notification data:`, notification);
    console.log(
      `📤 Connected sockets in room user-${userId}:`,
      io.sockets.adapter.rooms.get(`user-${userId}`)?.size || 0,
    );

    io.to(`user-${userId}`).emit("notification", notification);
    console.log(`✅ Notification emitted to user-${userId}`);
  } else {
    console.error("❌ Socket.IO not initialized, cannot emit notification");
  }
};
