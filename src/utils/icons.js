import { AiOutlineLike } from "react-icons/ai";
import { CgPlayListSearch } from "react-icons/cg";
import { FaHistory, FaHome } from "react-icons/fa";
import { MdOutlineWatchLater, MdSubscriptions } from "react-icons/md";
import { SiCoursera, SiYoutubeshorts } from "react-icons/si";

export const icons = {
    home: <FaHome className="text-black" />,
    shorts: <SiYoutubeshorts className="text-black" />,
    subscriptions: <MdSubscriptions className="text-black"/>,
    history: <FaHistory/>,
    playlists: <CgPlayListSearch/>,
    courses: <SiCoursera />,
    watchLater:<MdOutlineWatchLater />,
    liked:<AiOutlineLike />
  };

  export const sideBarList = [
    {
        title: null,
        items: [
            { label: 'Home', icon: 'home', link:"/" },
            { label: 'Shorts', icon: 'shorts', link:"/"  },
            { label: 'Subscriptions', icon: 'subscriptions', link:"/"  },
        ]
    },
    {
        title: "You",
        items: [
            { label: 'History', icon: 'history', link:"/"  },
            { label: 'Playlists', icon: 'playlists', link:"/"  },
            { label: 'Your courses', icon: 'courses', link:"/"  },
            { label: 'Watch later', icon: 'watchLater', link:"/"  },
            { label: 'Liked videos', icon: 'liked' , link:"/" },
          ],
    }
  ]