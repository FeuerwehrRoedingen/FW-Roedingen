import { createInterface } from 'node:readline'

import { SerialPort } from 'serialport'
import { ReadlineParser } from '@serialport/parser-readline'

const device = '/dev/tty.usbmodem142201'

const port = new SerialPort({ baudRate: 9600, path: device, autoOpen: false});
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

port.open();

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

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let flag = true;

while(flag){
  rl.on('line', (line) => {
    port.write(line, (error) => {
      if(error){
        console.error('error Writing to '+device);
        console.error(error.message);
      }
    })
  })

  rl.once('exit', () => {
    flag = false;
  })
}

