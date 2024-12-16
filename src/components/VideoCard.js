import { USER_LOGO } from "../utils/constants";

const VideoCard = ({ info,thumbNaliClass, userClass, mainClass, titleClass }) => {
  const { snippet, statistics } = info;
  const { channelTitle, thumbnails, title } = snippet;

  return (
    <div className={`my-3 mx-2 p-2 cursor-pointer ${mainClass}`}>
      <img src={thumbnails?.high?.url} alt="thumbnail" className={`rounded-lg ${thumbNaliClass}`} />
      <div className="flex items-start py-2">
        <img src={USER_LOGO} alt="user" className={`h-8 w-8 ${userClass}`}/>
        <div className="mx-2">
          <h3 className={`font-bold text-base ${titleClass}`}>{title}</h3>
          <p className={`text-gray-600 text-sm pt-2 ${titleClass}`}>{channelTitle}</p>
          <p className={`text-gray-600 text-sm pt-1 ${titleClass}`}>{statistics?.viewCount} views</p>
        </div>
      </div>
    </div>
  );
};

//higher order component
// export const AdVideoCard = ({info}) => {
//     return(
//         <div className="p-2 m-2 border border-gray-200">
//             <VideoCard info={info}/>
//         </div>
//     )
// }

export default VideoCard;
