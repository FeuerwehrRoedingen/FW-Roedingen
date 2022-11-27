import { SerialPort } from 'serialport'
import { ReadlineParser } from '@serialport/parser-readline'
import type { PortInfo } from '@serialport/bindings-cpp'

export class Arduino {

  #port: SerialPort;
  #parser: ReadlineParser;
  #setState: (gate: string, state: string) => void;

  constructor() {
    this.#findDevice()
      .then((path) => {
        this.#port = new SerialPort({ baudRate: 9600, path, autoOpen: false });
        this.#parser = this.#port.pipe(new ReadlineParser({ delimiter: '\n' }));

        this.#parser.on('data', this.#receivedData)

        this.#port.open();
      })
  }

  async #findDevice(): Promise<string> {
    let device: PortInfo;

    const devices = await SerialPort.list();
    devices.forEach(elem => {
      if (elem.manufacturer === 'Arduino LLC') {
        device = elem;
      }
    })

    if (!device) {
      return Promise.reject('no arduino Device Connected');
    }
    return Promise.resolve(device.path);
  }

  #receivedData(data: string){
    const res = data.split(':');
    this.#setState(res[0], res[1]);
  }

  attachCallback(fn: (gate: string, state: string) => void){
    this.#setState = fn;
  }

  open(gate: string) {
    this.#port.write('open:'+gate)
  }
  close(gate: string) {
    this.#port.write('close:'+gate)
  }
  stop(gate: string) {
    this.#port.write('stop:'+gate)
  }
}
