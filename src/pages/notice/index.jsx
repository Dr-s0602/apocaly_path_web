import React, {useEffect} from 'react';
import { observer } from "mobx-react";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import PostCard from "../../components/post/PostCard";
import WritePostModal from "../../components/post/WritePostModal";
import {getNoticeList, noticeLikeUp, postReadCountUp, writePost} from "../../api/notice";
import { handleAxiosError } from "../../api/errorAxiosHandle";
import DetailPostModal from "../../components/post/DetailPostModal";

const NoticeComponent = observer(() => {
    const [searchTitle, setSearchTitle] = React.useState("");
    const [searchInput, setSearchInput] = React.useState("");
    const [page, setPage] = React.useState(1);
    const [size, setSize] = React.useState(10);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const queryClient = useQueryClient();
    const [isAdmin, setIsAdmin] = React.useState(false);

    const { data, isLoading } = useQuery(['noticeList', { page, size, searchTitle }], () => getNoticeList({
        category: "notice",
        status: "activated",
        title: searchTitle,
        page: page - 1,
        size: size,
    }), {
        keepPreviousData: true,
    });

    const writePostMutation = useMutation(writePost, {
        onSuccess: () => {
            queryClient.invalidateQueries('noticeList').then();
        },
        onError: handleAxiosError,
    });

    const handleSearchChange = (e) => setSearchInput(e.target.value);

    const executeSearch = () => setSearchTitle(searchInput);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            executeSearch();
        }
    };

    const handleSizeChange = (e) => setSize(e.target.value);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = (postData) => writePostMutation.mutate(postData);

    useEffect(()=>{
        setIsAdmin(localStorage.getItem("isAdmin") === "true");
    },[])


    const [selectedPost, setSelectedPost] = React.useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = React.useState(false);

    const readCountMutation = useMutation(postReadCountUp, {
        onSuccess: () => {
            queryClient.invalidateQueries('noticeList').then();
        },
        onError: handleAxiosError,
    });

    const openDetailModal = (post) => {
        readCountMutation.mutate(post.id);
        setSelectedPost(post);
        setIsDetailModalOpen(true);
    };


    const closeDetailModal = () => {
        setSelectedPost(null);
        setIsDetailModalOpen(false);
    };


    const likeMutation = useMutation(noticeLikeUp, {
        onSuccess: () => {
            queryClient.invalidateQueries('noticeList').then();
        },
        onError: handleAxiosError,
    });

    const handleLike = () => {
        const requestData = {
            noticeId: selectedPost.id,
        };
        likeMutation.mutate(requestData);
    };


    const handleEdit = () => {
        console.log('Edit post:', selectedPost.id);
        // 포스트 수정 페이지로 이동하거나 수정 모달을 열 수 있음
    };


    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>No data</div>;

    return (
        <div className="container mt-5">
            <h2>공지사항</h2>
            <div style={{height:"2vw",justifyContent:"center",textAlign:"right"}}>
                <select value={size} onChange={handleSizeChange} style={{height:"88%"}}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
                <input type="text" placeholder="Search by title..." value={searchInput} onChange={handleSearchChange} onKeyDown={handleKeyPress} />
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
                {data.pinnedNotices.map(notice => (
                    <PostCard key={notice.id} notice={notice} isPinned onNoticeClick={() => openDetailModal(notice)} />
                ))}
                {data.regularNotices.map(notice => (
                    <PostCard key={notice.id} notice={notice} onNoticeClick={() => openDetailModal(notice)} />
                ))}
                </tbody>
            </table>
            {isAdmin && (
                <div>
                    <button onClick={openModal}>글쓰기</button>
                </div>
            )}
            <WritePostModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} />
            <DetailPostModal
                isOpen={isDetailModalOpen}
                onClose={closeDetailModal}
                post={selectedPost}
                onLike={handleLike}
                onEdit={handleEdit}
                isAdmin={isAdmin}
            />
        </div>
    );
});

export default NoticeComponent;
