const Logo = () => {
  return (
    <div className="fixed top-2 left-6 md:top-3 md:left-10 z-50">
      <img
        src="/logo.webp"
        alt="Eylül Elektronik"
        className="w-auto object-contain transition-all duration-300"
        style={{ height: "12rem" }}
      />
    </div>
  );
};

export default Logo;
