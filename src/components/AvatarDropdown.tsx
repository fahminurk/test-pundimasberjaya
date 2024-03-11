import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuthStore } from "@/store/authStore";

export const AvatarDropdown = () => {
  const { onLogout } = useAuthStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="self-start">
        <Avatar className="h-10 w-10">
          <AvatarImage
            className="object-cover"
            src="../src/assets/images/profile.jpg"
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onLogout}
          className="font-semibold text-red-500"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
