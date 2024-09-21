import AdminOnly from "@/components/layout/AdminOnly";

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
