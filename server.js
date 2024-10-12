const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path'); // Thêm module path để xử lý đường dẫn
const app = express();
const port = 3002;

// Sử dụng body-parser để lấy dữ liệu từ form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sử dụng middleware để phục vụ các file tĩnh từ thư mục hiện tại
app.use(express.static(path.join(__dirname)));

// Hàm để đọc file user.txt
function readUserFile() {
    const data = fs.readFileSync('user.txt', 'utf8');
    const lines = data.split('\n');
    let userInfo = {};

    lines.forEach(line => {
        // Bỏ qua các dòng không chứa ký tự ': ' hoặc dòng trống
        if (line.includes(': ')) {
            const [key, value] = line.split(': ');
            userInfo[key.trim()] = value ? value.trim() : ''; // Đảm bảo 'value' không phải là undefined
        }
    });

    return userInfo;
}

// Route để xử lý đăng nhập
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const storedUser = readUserFile();

    // Kiểm tra tài khoản
    if (username === storedUser.username && password === storedUser.password) {
        res.send(`Đăng nhập thành công! Xin chào ${username}.`);
    } else {
        res.send('Đăng nhập không thành công! Vui lòng kiểm tra lại tài khoản.');
    }
});

// Route để trả về file index.html khi truy cập vào /
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Lắng nghe kết nối
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
