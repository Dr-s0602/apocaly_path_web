import 'bootstrap/dist/css/bootstrap.css';
import "../styles/global.css";
import Head from "next/head";
import NavigationBar from "../components/layouts/navigationBar";
import { ThemeProvider, Container } from "react-bootstrap";

const MyApp = ({ Component, pageProps }) => {
    return (
        <ThemeProvider
            breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
            minBreakpoint="sm"
        >
            <Head>
                <link rel="icon" href="/image/favicon_black_square.png"/>
                <title>Apocaly_Path</title>
            </Head>
            <Container fluid className="navigation-container"> {/* Container 추가, 전체 너비를 사용 */}
                <NavigationBar/>
            </Container>
            <Container fluid className="flex-container"> {/* 메인 컨텐츠 부분도 Container로 변경 */}
                <Component {...pageProps} /> {/* 남은 부분에 페이지 출력 */}
            </Container>
        </ThemeProvider>
    );
};

export default MyApp;
