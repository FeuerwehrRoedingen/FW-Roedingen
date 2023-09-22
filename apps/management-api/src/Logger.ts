
import { Response } from 'express';
import {
  createReadStream, 
  createWriteStream, 
  closeSync,
  existsSync,
  openSync,
  renameSync,
  ReadStream, 
  WriteStream 
} from 'fs'
import { Transform } from 'stream';
import { mkdirSync } from 'fs';

type LogMessage = string | number | boolean | object | Error;
type LogLevel = 'log' | 'error' | 'warn' | 'info' | 'all';
type LogEvent = {
  level: LogLevel;
  message: string;
  timestamp: Date;
}
export type LogEventListener = (message: string) => void;

class filter extends Transform{
  #level: LogLevel;

  constructor(level: LogLevel){
    super({
      readableObjectMode: true,
      writableObjectMode: true
    });

    this.#level = level;
  }
  _transform(chunk: any, encoding: BufferEncoding, callback: (error?: Error, data?: any) => void): void {
    if(chunk.level === this.#level){
      this.push(chunk);
    }
    callback();
  }
}

const HEADER = `\
--------------------------------------------------------------------------
  Management API Log - ${new Date().toISOString()}
--------------------------------------------------------------------------
`

class Logger {
  #writeStream: WriteStream;
  #listeners: Map<LogLevel, Set<LogEventListener>>;
  #seperator: string;
  #filename: string;

  constructor(filename: string) {
    this.#handleFile(filename);
    this.#filename = filename;

    this.#writeStream = createWriteStream(filename);
    this.#listeners = new Map();

    this.#listeners.set('log',   new Set());
    this.#listeners.set('error', new Set());
    this.#listeners.set('warn',  new Set());
    this.#listeners.set('info',  new Set());
    this.#listeners.set('all',   new Set());

    this.#seperator = ' ';

    const fileWriteListener = (message: string) => {
      this.#writeStream.write(`${message}\n`);
    }
    this.addListener('all', fileWriteListener);

    this.#writeStream.write(HEADER);
  }

  //---------------------------------------------
  // Logging methods
  //---------------------------------------------

  log = (...messages: LogMessage[]) => 
    this.#handleLog({level: 'log', message: this.#format(messages), timestamp: new Date()});

  error = (...messages: LogMessage[]) => 
    this.#handleLog({level: 'error', message: this.#format(messages), timestamp: new Date()});
  
  warn = (...messages: LogMessage[]) => 
    this.#handleLog({level: 'warn', message: this.#format(messages), timestamp: new Date()});
  
  info = (...messages: LogMessage[]) => 
    this.#handleLog({level: 'info', message: this.#format(messages), timestamp: new Date()});

  seperator = (seperator: string) => {
    this.#seperator = seperator;
    return this;
  }

  //---------------------------------------------
  // Add Listeners
  //---------------------------------------------

  addListener(level: LogLevel, listener: LogEventListener): void {
    this.#listeners.get(level)?.add(listener);
  }

  //---------------------------------------------
  // Get Logs
  //---------------------------------------------
  getLogs(res: Response, level: string|undefined = undefined, ): void {
    const readStream = createReadStream(this.#filename);
    if(level){
      readStream
        .pipe(new filter(level as LogLevel))
        .pipe(res);
      return;
    }
    readStream.pipe(res);

    readStream.on('end', () => {
      readStream.close();
    })
  }

  //---------------------------------------------
  // Unsafe area
  //---------------------------------------------

  #format(messages: LogMessage[]){
    return messages.join(this.#seperator);
  }
  #formatEvent(event: LogEvent){
    return `${event.timestamp.toISOString()}: [${event.level.toUpperCase()}] ${event.message}`;
  }
  #handleLog(event: LogEvent): void {
    let message = this.#formatEvent(event);
    this.#listeners.get(event.level)?.forEach(listener => listener(message));
    this.#listeners.get('all')?.forEach(listener => listener(message));

    this.#seperator = ' ';
  }
  #handleFile(filename: string){
    if(process.env.NODE_ENV === 'production' && existsSync(filename)){
      renameSync(filename, `${filename}.${Date.now()}`);
    }
    closeSync(openSync(filename, 'w'));
  }
}

const defaultLogLocation = process.env.NODE_ENV === 'production' ? '/var/log/management-api/management.log' : 'management.log';
if(!process.env.LOG_FILE && process.env.NODE_ENV === 'production'){
  mkdirSync('/var/log/management-api');
}
export const logger = new Logger(process.env.LOG_FILE || defaultLogLocation);
