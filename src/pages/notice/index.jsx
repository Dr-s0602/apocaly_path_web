import {observer} from "mobx-react";
import PostCard from "../../components/post/PostCard";
import {useEffect, useState} from "react";
import {getNoticeList, writePost} from "../../api/notice";
import {handleAxiosError} from "../../api/errorAxiosHandle";
import {authStore} from "../../stroes/authStore";
import WritePostModal from "../../components/post/WritePostModal";

const NoticeComponent = observer(() => {
    const [noticeList, setNoticeList] = useState([]);
    const [pinnedNotices, setPinnedNotices] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const category = "notice";
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchInput, setSearchInput] = useState(""); // 검색어 임시 저장


    const fetchNotices = () => {
        const listData = {
            category: category,
            status: "activated",
            title: searchTitle,
            page: page - 1,
            size: size,
        };
        getNoticeList(listData)
            .then(res => {
                setNoticeList(res.regularNotices);
                setPinnedNotices(res.pinnedNotices);
                setTotalPages(res.totalPages);
            })
            .catch(handleAxiosError);
    };

    useEffect(() => {
        fetchNotices();
    }, [category, page, size, searchTitle]);

    useEffect(()=>{
        authStore.setIsAdmin(window.localStorage.getItem("isAdmin"))
    },[])

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

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

    const openModal = () => setIsModalOpen(true); // 모달 열기
    const closeModal = () => setIsModalOpen(false); // 모달 닫기

    // 모달 제출 처리 함수
    const handleSubmit = (postData) => {
        // 글쓰기 로직 구현
        // console.log("글이 제출되었습니다.", postData);
        writePost(postData).then(res=>{
            console.log("res : ",res);
            fetchNotices();
        }).catch(handleAxiosError)
            .finally(() => {
                // 모든 작업이 끝난 후 모달 닫기
                closeModal();
            });
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
                    <th style={{width:"5vw", textAlign:"center"}}>말머리</th>
                    <th style={{textAlign:"center"}}>제목</th>
                    <th style={{width:"10vw", textAlign:"center"}}>글쓴이</th>
                    <th style={{width:"7vw", textAlign:"center"}}>작성일</th>
                    <th style={{width:"4vw", textAlign:"center"}}>조회</th>
                    <th style={{width:"4vw", textAlign:"center"}}>추천</th>
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
                    <button onClick={openModal}>글쓰기</button>
                </div>
            }
            <WritePostModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} />
        </div>
    );
});

export default NoticeComponent;
