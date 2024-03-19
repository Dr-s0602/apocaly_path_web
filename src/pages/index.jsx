import useResponsive from "../hooks/useResponsive";
import {useEffect, useState} from "react";

const Index = () => {

    const [isClient, setIsClient] = useState(false);

    const {isMobile, isTablet, isDesktop} = useResponsive()

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div>
            <h1> 본문 출력 페이지 </h1>
            {isClient && (
                <>
                    {isMobile && <p>모바일 화면입니다.</p>}
                    {isTablet && <p>태블릿 화면입니다.</p>}
                    {isDesktop && <p>데스크탑 화면입니다.</p>}
                </>
            )}
        </div>
    );
};

export default Index;