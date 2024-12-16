import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closMenu } from "../utils/appSlice";
import { Link, useSearchParams } from "react-router-dom";
import CommentsSection from "./CommentsSection";
import {
  API_KEY,
  USER_LOGO,
  VIDEO_BY_ID,
  YOUTUBE_API,
} from "../utils/constants";
import VideoCard from "./VideoCard";

const Watch = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const videoID = searchParams.get("v");
  const [videoDetails, setVideoDetails] = useState("");
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    dispatch(closMenu());
  }, []);

  useEffect(() => {
    fetchVideoDetals();
  }, []);

  const fetchVideoDetals = async () => {
    const response = await fetch(`${VIDEO_BY_ID}${videoID}&key=${API_KEY}`);
    const json = await response.json();
    setVideoDetails(json?.items[0]);
    //console.log(json?.items[0]);
  };

  useEffect(() => {
    fetchPopularVideos();
  }, []);

  const fetchPopularVideos = async () => {
    const response = await fetch(YOUTUBE_API);
    const json = await response.json();
    setVideoList(json?.items);
  };

  return (
    <div className="grid grid-cols-12">
      {videoDetails && (
        <>
          <div className="col-span-8">
            <div className="px-16">
              <iframe
                className="rounded-lg"
                width="850"
                height="450"
                src={"https://www.youtube.com/embed/" + videoID}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>

              <div className="mt-2">
                <h2 className="font-bold text-lg">
                  {videoDetails?.snippet?.title}
                </h2>
                <div className="flex">
                  <img src={USER_LOGO} className="h-8 w-8 rounded-full" />
                  <div>
                    <p className="ml-2">
                      {videoDetails?.snippet?.channelTitle}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <CommentsSection />
              </div>
            </div>
          </div>

          <div className="col-span-4 h-[700px] overflow-y-auto">
            {videoList.map((video) => (
              <Link to={`/watch?v=${video.id}`} key={video.id}>
                {" "}
                <VideoCard
                  info={video}
                  thumbNaliClass="w-44 h-32"
                  mainClass="flex"
                  userClass="hidden"
                  titleClass="text-xs"
                />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Watch;
