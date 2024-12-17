import { useEffect, useState } from "react";
import { YOUTUBE_API } from "../utils/constants";
import VideoCard, { AdVideoCard } from "./VideoCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const searchVideos = useSelector((store) => store.search.videos);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const response = await fetch(YOUTUBE_API);
    const json = await response.json();
    setVideos(json?.items);
  };

  const videoList = searchVideos.length > 0 ? searchVideos : videos;
  //console.log(videoList)
  const normalizeVideoId = (video) => {
    return video?.id?.videoId || video?.id?.playlistId || video.id;
  };

  return (
    <div className="flex flex-wrap">
      {/* {videos[0] && <AdVideoCard info={videos[0]}/>} */}
      {videoList.map((video) => (
        <Link to={`/watch?v=${normalizeVideoId(video)}`} key={video.id || video?.etag}>
          {" "}
          <VideoCard
            info={video}
            thumbNaliClass="w-72 h-70"
            mainClass="w-72"
            userClass="block"
          />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
