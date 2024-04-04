export const handleAxiosError = (error) => {
    // 여기에서 에러를 기록하거나 분석할 수 있습니다.
    // 예: Sentry.captureException(error);

    // 사용자에게 에러 메시지 표시
    if (error.response) {
        // 서버가 2xx 외의 상태 코드로 응답한 경우
        alert(error.response.data.message);
    } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못한 경우
        alert("서버로부터 응답을 받지 못했습니다.");
    } else {
        // 요청을 설정하는 중에 문제가 발생한 경우
        alert("요청에 오류가 발생했습니다.");
    }
}