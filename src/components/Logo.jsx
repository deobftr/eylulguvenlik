const Logo = () => {
  return (
    <div className="fixed top-2 left-6 md:top-3 md:left-10 z-50">
      <img
        src={`${import.meta.env.BASE_URL}logo.webp`}
        alt="Eylül Elektronik"
        className="h-28 md:h-40 lg:h-48 w-auto object-contain transition-all duration-300"
      />
    </div>
  );
};

export default Logo;
