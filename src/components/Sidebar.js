import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { icons, sideBarList } from "../utils/icons";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const iconsList = icons;

  return !isMenuOpen ? null : (
    <div className="p-5 shadow">
      {sideBarList.map((list) => (
        <div key={list.title}>
          {list?.title && <h1 className="border-t pt-2 mt-2">{list.title}</h1>}
          <ul>
            {list?.items.map((item) => (
              <li key={item.label} className={`text-sm p-2 hover:bg-gray-100 hover:rounded-xl ${item.label==='Home'? "bg-gray-100 rounded-lg":''}`}>
                <Link to={item.link} className="flex cursor-pointer">
                <span className="text-lg">{iconsList[item.icon]}</span>
                <span className="ml-2">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
