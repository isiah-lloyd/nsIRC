//Helpful links:
// https://modern.ircdocs.horse/

const net = require('net');
const process = require('process');

class Channel {
    constructor() {
    
    }
}

class Client {
    constructor(connection) {
        this.channels = [];
        this.nickname = null;
        this.user = null;
        this.realName = null;
        connection.on('data', this.parse_message);
        connection.on('end', this.quit('Socket Ended'));
    }
    parse_message(message) {
        console.log(message);
        if (message.endsWith("\r\n")) {
            //According to specficaitons messages are invalid if they do not end with \r\n
            let messageObject = {};
            message = message.split(0,-4);
            message = message.split(" ");
            console.log('Message Received: ', message);
        }
    }
    send_message(command, arguments)
    quit(reason) {

    }
}

class Server {
    constructor() {
        this.channels = [];
        this.clients = [];
        this.nicknames = [];
        this._server = null;
    }
    start() {
        this._server = net.createServer((c) => {
            console.log('client connected');
            c.on('end', () => {
                console.log('client disconnected');
            });
            c.setEncoding('utf8');
            this.clients.push(new Client(c));
        });
        this._server.on('error', (err) => {
            throw err;
        });
        this._server.listen(6661, () => {
            console.log('server bound');
        });
    }
    close() {
        this._server.close();
    }
}

let server = new Server();
server.start();
process.on('exit', () => {
    server.close() 
});
process.on('SIGINT', () => {
    server.close() 
});
process.on('uncaughtException', () => {
    server.close()
});