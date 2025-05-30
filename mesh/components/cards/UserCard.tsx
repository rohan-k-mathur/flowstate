"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  userId: bigint;
  name: string;
  username: string;
  imgUrl: string | null;
  personType: string;
}

const UserCard = ({ userId, name, username, imgUrl, personType }: Props) => {
  const router = useRouter();
  return (
    <div>
      <article className="user-card">
        <div className="user-card_avatar">
          <p>omg</p>
          <Image
            src={imgUrl || ""}
            alt="logo"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="flex-1 text-ellipsis">
            <h4 className="text-base-semibold text-light-1">{name}</h4>
            <p className="text-small-medium text-gray-1">@{username}</p>
          </div>
        </div>
        <Button
          className="user-card_btn"
          onClick={() => router.push(`/profile/${userId}`)}
        >
          View
        </Button>
      </article>
    </div>
  );
};

export default UserCard;
