const Card = ({ children, className }) => {
    return (
      <div className={`bg-gradient-to-b p-6 mt-6 from-ad to-ab w-40 h-18 rounded-md text-wh font-bold text-lg flex justify-center items-center${className}`}>
        {children}
      </div>
    );
  };
  
  export default Card;