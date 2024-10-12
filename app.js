const express = require('express');
const app = express();
const port = 3001;

// Dữ liệu từ file vehicle_plates.json
const vehiclePlates = require('./vehicle_plates.json'); // File JSON

// API trả về danh sách các tỉnh
app.get('/cities', (req, res) => {
    res.json(vehiclePlates);
});

// API trả về biển số dựa trên tỉnh thành
app.get('/plate', (req, res) => {
    const city = req.query.city;
    const cityData = vehiclePlates.find(item => item.city === city);
    if (cityData) {
        res.json({ plate_no: cityData.plate_no });
    } else {
        res.json({ plate_no: 'Không tìm thấy' });
    }
});

// Cung cấp file HTML
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
