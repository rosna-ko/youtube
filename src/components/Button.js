const Button = ({ name }) => {
  return (
    <div>
      <button
        className={`px-5 py-1 m-2 bg-gray-200 rounded-lg text-sm font-medium ${
          name === "All" ? "bg-black" : ""
        }`}
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
