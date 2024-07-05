import Image from "next/image";
export default function ProfilePicture({ photoUrl }: { photoUrl?: string }) {
  return (
    <>
      <figure className="flex justify-center">
        <Image
          src={photoUrl || "/user-placeholder.png"}
          alt={"Placeholder User profile photo"}
          width={100}
          height={100}
          className="mb-4 rounded-full"
        />
      </figure>
    </>
  );
}
