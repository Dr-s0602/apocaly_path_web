import { Container } from 'react-bootstrap';

const Index = () => {
    return (
        <Container fluid style={{
            backgroundImage: "url('/image/main.jpg')", // 이미지 경로 수정
            backgroundSize: 'cover', // 이미지가 Container를 전부 채우도록 설정
            backgroundPosition: 'center', // 이미지가 중앙에 오도록 설정
            backgroundRepeat: 'no-repeat', // 이미지가 반복되지 않도록 설정
            minHeight: '100vh', // Container의 최소 높이를 화면 높이만큼 설정
            height:"100%",
            width:"100%"
        }}>
            {/* Container 안의 내용 */}
        </Container>
    );
};

export default Index;
