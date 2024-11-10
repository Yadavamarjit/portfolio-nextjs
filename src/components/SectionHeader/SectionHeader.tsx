export const SectionHeader = ({
  title,
  subtitle,
  description,
}: {
  title: string;
  subtitle: string;
  description: string;
}) => (
  <>
    <div className="flex justify-center">
      <p className="uppercase font-semibold tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text text-center">
        {title}
      </p>
    </div>
    <h2 className="text-center font-serif mt-6 text-3xl md:text-5xl">
      {subtitle}
    </h2>
    <p className="text-center mt-4 text-white/60 md:max-w-md mx-auto">
      {description}
    </p>
  </>
);
