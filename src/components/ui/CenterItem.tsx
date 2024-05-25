function CenterItem({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-screen flex justify-center items-center">
      {children}
    </section>
  );
}

export default CenterItem;
