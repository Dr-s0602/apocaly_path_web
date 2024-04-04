import React from 'react';
import Link from "next/link";
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavigationBar = () => {
    const handleStartClick = (e) => {
        // 시작하기 버튼 클릭 시 로직
    }
    const handleNoticeClick = (e) => {
        console.log("공지사항 누름", e)
    }
    const handleBoardClick = (e) => {
        console.log("게시판 누름", e)
    }
    const handleLoginClick = (e) => {
        console.log("로그인 누름", e)
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img src="/image/A_P_logo.webp" alt="Logo" style={{width: '10vh'}}/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/start" onClick={handleStartClick}>시작하기</Nav.Link>
                        <Nav.Link onClick={handleNoticeClick}>공지사항</Nav.Link>
                        <Nav.Link onClick={handleBoardClick}>게시판</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={handleLoginClick}>로그인</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
