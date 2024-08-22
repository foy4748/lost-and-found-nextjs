import AdminOnly from "./AdminOnly";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminOnly>{children}</AdminOnly>
    </>
  );
}

export default layout;
