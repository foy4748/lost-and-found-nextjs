function CenterItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`h-screen flex justify-center items-center ${className}`}
    >
      {children}
    </section>
  );
}

export default CenterItem;
