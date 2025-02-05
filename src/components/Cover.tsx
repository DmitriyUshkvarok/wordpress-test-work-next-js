import Image from 'next/image';

export const Cover = ({
  children,
  background,
}: Readonly<{
  children: React.ReactNode;
  background: string;
}>) => {
  return (
    <div className="h-screen text-white bg-cover bg-center bg-slate-800 relative min-h-[400px] flex justify-center items-center">
      {!!background && (
        <Image
          alt="Cover"
          src={background}
          fill
          className="mix-blend-soft-light object-cover"
          priority
        />
      )}
      <div className="max-w-5xl z-10">{children}</div>
    </div>
  );
};
