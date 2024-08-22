import UserOnly from "./UserOnly";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserOnly>{children}</UserOnly>
    </>
  );
}

export default layout;