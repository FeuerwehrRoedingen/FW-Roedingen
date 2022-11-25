import { SerialPort } from 'serialport'
import { ReadlineParser } from '@serialport/parser-readline'
import type { PortInfo } from '@serialport/bindings-cpp'

let device: PortInfo;

const devices = await SerialPort.list();
devices.forEach(elem => {
  if(elem.manufacturer === 'Arduino LLC'){
    device = elem;
  }
})

if(!device){
  console.error('no arduino Device Connected');
  process.exit(1);
}

const port = new SerialPort({ baudRate: 9600, path: device.path, autoOpen: false});
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

port.on('open', (error) => {
  if(error){
    console.error('Error opening '+device);
    process.exit(1);
  }
  console.log('connected');
})


parser.on('data', (data) => {
  console.log('received: '+data);
})

port.open();

port.write('on');
