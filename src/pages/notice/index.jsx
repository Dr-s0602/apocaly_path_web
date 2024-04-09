import {observer} from "mobx-react";
import PostCard from "../../components/post/postCard";
import {useEffect, useState} from "react";
import {getNoticeList} from "../../api/notice";
import {handleAxiosError} from "../../api/errorAxiosHandle";
import {authStore} from "../../stroes/authStore";

const NoticeComponent = observer(() => {
    const [noticeList, setNoticeList] = useState([]);
    const [pinnedNotices, setPinnedNotices] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const category = "notice";
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchInput, setSearchInput] = useState(""); // 검색어 임시 저장

    useEffect(() => {
        console.log("authStore.isAdmin",authStore.isAdmin);
        const listData = {
            category: category,
            status: "activated",
            title: searchTitle,
            page: page,
            size: size,
        };
        getNoticeList(listData)
            .then(res => {
                setNoticeList(res.regularNotices);
                setPinnedNotices(res.pinnedNotices);
                setTotalPages(res.totalPages);
            })
            .catch(handleAxiosError);
    }, [category, page, size, searchTitle]);

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const executeSearch = () => {
        setSearchTitle(searchInput);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            executeSearch();
        }
    };
    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    return (
        <div className="container mt-5">
            <h2>공지사항</h2>
            <div style={{height:"2vw",justifyContent:"center",textAlign:"right"}}>
                <select value={size} onChange={handleSizeChange}
                        style={{height:"88%"}}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchInput}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyPress}
                />
                <button onClick={executeSearch}>검색</button>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                </tr>
                </thead>
                <tbody>
                <PostCard
                    postList={noticeList}
                    pinnedPostList={pinnedNotices}
                    totalPages={totalPages}
                    curPage={page}
                    handlerPage={setPage}
                />
                </tbody>
            </table>
            { authStore.isAdmin &&
                <div>
                    <button> 글쓰기</button>
                </div>
            }
        </div>
    );
});

export default NoticeComponent;
