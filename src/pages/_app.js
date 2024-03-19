import "../styles/global.css"
import NavigationBar from "../components/layouts/navigationBar";
import DefaultNav from "../components/layouts/defaultNav";
import Head from "next/head";
const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <link rel="icon" href="/image/favicon_black_square.png"/>
                <title>Apocaly_Path</title>
            </Head>
            <div className="navigation-container">
            <NavigationBar/>
            </div>
            <div className="flex-container">
                <div className="left-nav-container">
                    <DefaultNav/> {/* 왼쪽에 defaultNav */}
                </div>
                <div className="main-content-container">
                    <Component {...pageProps} /> {/* 남은 부분에 페이지 출력 */}
                </div>
            </div>
        </>
    );
};

export default MyApp;