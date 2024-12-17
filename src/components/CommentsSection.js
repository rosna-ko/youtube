import { useEffect, useState } from "react";
import { API_KEY, COMMENTS_API, USER_LOGO } from "../utils/constants";
import { useSearchParams } from "react-router-dom";

const CommentsSection = () => {
  const [searchParams] = useSearchParams();
  const videoID = searchParams.get("v");  
  const [comments, setComments] = useState()
  
  const commentsList = [
    {
      name: "Rosina",
      comment: "lorem ipsum test test",
      replies: [
        {
          name: "Rosina",
          comment: "lorem ipsum test test",
          replies: [
            {
              name: "Rosina",
              comment: "lorem ipsum test test",
              replies: [],
            },
            {
              name: "Rosina",
              comment: "lorem ipsum test test",
              replies: [],
            },
          ],
        },
        {
          name: "Rosina",
          comment: "lorem ipsum test test",
          replies: [],
        },
      ],
    },
    {
      name: "Rosina",
      comment: "lorem ipsum test test",
      replies: [
        {
          name: "Rosina",
          comment: "lorem ipsum test test",
          replies: [],
        },
        {
          name: "Rosina",
          comment: "lorem ipsum test test",
          replies: [],
        },
      ],
    },
    {
      name: "Rosina",
      comment: "lorem ipsum test test",
      replies: [],
    },
    {
      name: "Rosina",
      comment: "lorem ipsum test test",
      replies: [],
    },
    {
      name: "Rosina",
      comment: "lorem ipsum test test",
      replies: [],
    },
    {
      name: "Rosina",
      comment: "lorem ipsum test test",
      replies: [],
    },
  ];

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    const response = await fetch(`${COMMENTS_API}${videoID}&key=${API_KEY}`)
    const json = await response.json();
    setComments(json?.items)
   // console.log(json)
  }

  const Comments = ({ data }) => {
    console.log(data)
    const getCommentData = (data) => {
      if(data?.snippet?.topLevelComment?.snippet) {
        return data?.snippet?.topLevelComment?.snippet
      }

      if(data?.snippet) {
        return data?.snippet
      }

      return {}
    }
    const { authorDisplayName, authorProfileImageUrl, textOriginal } = getCommentData(data);

    return (
      <div className="p-2 m-2 flex">
        <img src={authorProfileImageUrl} alt="user" className="w-8 h-8 rounded-full" />
        <div className="px-3">
          <p className="text-black text-xs">{authorDisplayName}</p>
          <p className="text-xs  text-gray-500 mt-1">{textOriginal}</p>
        </div>
      </div>
    );
  };

  const CommentsList = ({comments}) => {
   //console.log(comments)
    return comments?.map((comment,index) => (
       <div key={index}>
         <Comments  data={comment}/>
         <div className="pl-5 ml-5 border border-l-black">
            <CommentsList comments={comment?.replies?.comments}/>
         </div>
       </div>
    ))
  }
  return (
    <>
     {comments && (
          <div>
          <h3 className="mt-4 font-bold text-2xl">{comments.length} Comments</h3>
          <CommentsList comments={comments}/>
        </div>
     )}
    </>
  );
};

export default CommentsSection;
