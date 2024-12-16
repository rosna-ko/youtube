import Button from "./Button";

const ButtonList = () => {
  const list = [
    "All",
    "Music",
    "JavaScript",
    "Tamil Cinema",
    "Skills",
    "AI",
    "Live",
    "Malayalam Cinema",
    "Masha and the bear",
    "Podcasts",
    "Array",
    "APIs"
  ];

  return (
    <div className="flex mx-5 w-[1200px] overflow-x-auto whitespace-nowrap">
      {list.map((item, index) => (
        <Button key={index} name={item} />
      ))}
    </div>
  );
};

export default ButtonList;
