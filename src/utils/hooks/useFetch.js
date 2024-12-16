// import { useEffect, useState } from "react"

// const useFetch  = (url) => {
//     const [videos, setVideos] = useState([])

//     useEffect(() => {
//         fetchVideos()
//     },[url])

//     const fetchVideos = async () => {
//         const response = await fetch(url);
//         const json = await response.json()
//         setVideos(json?.items)

//     }
//     return videos
// }

// export default useFetch;