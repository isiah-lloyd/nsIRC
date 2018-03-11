//Helpful links:
// https://modern.ircdocs.horse/

const net = require('net');

class Channel {
    constructor() {
    
    }
}

class Client {
    constructor() {
        this.channels = [];
        this.nickname = null;
        this.user = null;
        this.realName = null;
    }
    parse_message(message) {
        if (message.endsWith("\r\n")) {
            //According to specficaitons messages are invalid if they do not end with \r\n
            let messageObject = {};
        }
    }
}

class Server {
    constructor() {
        this.channels = [];
        this.clients = [];
        this.nicknames = [];
    }
    start() {
        const server = net.createServer((c) => {
            console.log('client connected');
            c.on('end', () => {
                console.log('client disconnected');
            });
            c.on('data', (data) => {
                console.log(data.toString('utf8'));
            });
            c.write('PING\r\n');
            c.pipe(c);
        });
        server.on('error', (err) => {
            throw err;
        });
        server.listen(6668, () => {
            console.log('server bound');
        });
    }
}