import {observer} from "mobx-react";
import {useEffect} from "react";

const PostCard = observer(({postList,pinnedPostList,totalPages,curPage,handlerPage})=>{

    useEffect(()=>{
        console.log("postList", postList)
    },[postList])
    return (
        <tr>
            <td>1</td>
            <td>게시글 제목</td>
            <td>작성자</td>
            <td>작성일</td>
        </tr>
    )
})

export default PostCard