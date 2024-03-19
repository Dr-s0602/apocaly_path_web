import React from 'react';
import Link from "next/link";

const NavigationBar = () => {
    const handleStartClick = (e) => {

    }
    const handleNoticeClick = (e) => {
        console.log(" 공지사항 누름 ", e)
    }
    const handleBoardClick = (e) => {
        console.log(" 게시판 누름 ", e)
    }
    const handleLoginClick = (e) => {
        console.log(" 로그인 누름 ", e)
    }

    return (
        <div className="navigation_bar">

            <div>
                {/* 로고 이미지 */}
                <Link href="/">
                    <img src="/image/A_P_logo.webp" alt="Logo"/>
                </Link>
            </div>

            <div>
                {/* 탭 링크 */}
                <ul>
                    <Link href="/start">
                        <li onClick={(e)=>{handleStartClick(e)}}>시작하기</li>
                    </Link>
                    <li onClick={(e)=>{handleNoticeClick(e)}}>공지사항</li>
                    <li onClick={(e)=>{handleBoardClick(e)}}>게시판</li>
                </ul>
            </div>

            <div>
                {/* 로그인 버튼 */}

                    <p onClick={(e)=>{handleLoginClick(e)}}>로그인</p>

            </div>

        </div>
    );
}

export default NavigationBar;
