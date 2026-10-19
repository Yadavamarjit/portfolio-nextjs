export const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-8 mt-16 text-center text-xs text-secondary/60 font-mono">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-[#64ffda]">Amarjit Yadav</span> (Yadv Amar / Yadav Amar). All rights reserved.
        </p>
        <p className="hover:text-[#64ffda] transition-colors duration-300">
          <a href="https://ydvamar.online">ydvamar.online</a>
        </p>
      </div>
    </footer>
  );
};
