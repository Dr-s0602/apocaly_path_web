import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavigationBar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img src="/image/A_P_logo.webp" alt="Logo" style={{width: '10vh'}}/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/start" >시작하기</Nav.Link>
                        <Nav.Link>공지사항</Nav.Link>
                        <Nav.Link>게시판</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href={"/user/login"}>로그인</Nav.Link>
                        <Nav.Link href={"/user"}>회원가입</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
