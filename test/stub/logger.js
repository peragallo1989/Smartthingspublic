let level = 'info';

const transports = [];

let transportsEnabled = false;
const callTransports = (level, message) => {
    if (transportsEnabled) {
        for (const transport of transports) {
            transport.log({level, message}, () => {});
        }
    }
}

const mock = {
    info: jest.fn().mockImplementation((msg) => callTransports('info', msg)),
    warn: jest.fn().mockImplementation((msg) => callTransports('warn', msg)),
    error: jest.fn().mockImplementation((msg) => callTransports('error', msg)),
    debug: jest.fn().mockImplementation((msg) => callTransports('debug', msg)),
    cleanup: jest.fn(),
    add: (transport) => transports.push(transport),
    setLevel: (newLevel) => {level = newLevel},
    getLevel: () => level,
    setTransportsEnabled: (value) => {transportsEnabled = value},
};

jest.mock('../../lib/util/logger', () => (mock));

module.exports = {...mock};
