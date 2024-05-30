const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const port = 3000; // 사용할 포트 번호
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
    // key: fs.readFileSync('./apocaly_path_web-key.pem'), // 키 파일 경로
    // cert: fs.readFileSync('./apocaly_path_web.pem'), // 인증서 파일 경로
};

app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on https://localhost:${port}`);
    });
});
