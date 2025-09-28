import { type CharacterStatus } from "@/types";

export const getStatusColor = (status: CharacterStatus) => {
  switch (status.toLowerCase()) {
    case "Alive":
      return "bg-green-500";
    case "Dead":
      return "bg-red-500";
    case "unknown":
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
};
