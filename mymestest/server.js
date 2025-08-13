const WebSocket = require('ws');

// Создаем WebSocket сервер на порту 9000
const wss = new WebSocket('wss://skyvvave.github.io/AlexMessanger/');

console.log('Сервер запущен на ws://localhost:9000');

wss.on('connection', (ws) => {
    console.log('Новое подключение');
    
    // Отправляем приветственное сообщение
    ws.send('Привет! Вы подключены к WebSocket серверу');
    
    // Обработчик входящих сообщений
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            console.log('Получено сообщение:', data);
            
            // Обработка команд
            switch(data.action) {
                case 'ECHO':
                    // Отправляем обратно то же сообщение
                    
                    break;
                    
                case 'PING':
                    // Отвечаем PONG через 2 секунды
                    setTimeout(() => {
                        ws.send('PONG');
                    }, 2000);
                    break;
                    
                default:
                    console.log('Неизвестная команда:', data.action);
                    ws.send('Неизвестная команда');
            }
        } catch (e) {
            console.log('Ошибка парсинга JSON:', e);
            ws.send('Ошибка: неверный формат сообщения');
        }
    });
    
    // Обработчик закрытия соединения
    ws.on('close', () => {
        console.log('Клиент отключился');
    });
    
    // Обработчик ошибок
    ws.on('error', (error) => {
        console.log('Ошибка WebSocket:', error);
    });
});