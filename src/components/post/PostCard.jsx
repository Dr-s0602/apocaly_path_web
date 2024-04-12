import {observer} from "mobx-react";
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
const PostCard = observer(({postList,pinnedPostList,totalPages,curPage,handlerPage})=>{

    const relativeTime = (isoDate) => {
        return formatDistanceToNow(parseISO(isoDate), { addSuffix: true, locale: ko });
    };

    return (
        <>
            {
                pinnedPostList.length !== 0 && pinnedPostList.map((notice,index) => (
                    <tr key={index} style={{background:"skyblue"}}>
                        <td style={{width: "5vw", textAlign: "center"}}>{notice.isPinned ? "공지" : "일반"}</td>
                        <td style={{textAlign: "left"}}>{notice.title}</td>
                        <td style={{width: "10vw", textAlign: "center"}}>{notice.authorEmail}</td>
                        <td style={{width: "7vw", textAlign: "center"}}>{relativeTime(notice.createdAt)}</td>
                        <td style={{width: "4vw", textAlign: "center"}}>{notice.views}</td>
                        <td style={{width: "4vw", textAlign: "center"}}>{notice.likeCount}</td>
                    </tr>
                ))

            }
            {
                postList.length !== 0 && postList.map((notice,index) => (
                    <tr key={index}>
                        <td style={{width: "5vw", textAlign: "center"}}>{notice.isPinned ? "공지" : "일반"}</td>
                        <td style={{textAlign: "left"}}>{notice.title}</td>
                        <td style={{width: "10vw", textAlign: "center"}}>{notice.authorEmail}</td>
                        <td style={{width: "7vw", textAlign: "center"}}>{relativeTime(notice.createdAt)}</td>
                        <td style={{width: "4vw", textAlign: "center"}}>{notice.views}</td>
                        <td style={{width: "4vw", textAlign: "center"}}>{notice.likeCount}</td>
                    </tr>
                ))

            }
        </>
    )
})

export default PostCard