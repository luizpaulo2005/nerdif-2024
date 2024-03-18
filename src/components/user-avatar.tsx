import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface UserAvatarProps {
    user: {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    };
    
}

const UserAvatar = (props: UserAvatarProps) => {
    const { user: { image, name } } = props

  return (
    <Avatar>
      {/* @ts-ignore */}
      <AvatarImage src={image} alt={name} />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  );
};

export { UserAvatar }