import type {OnyxKey, OnyxMethod} from './types';

type LogData = {
    message: string;
    level: 'alert' | 'info' | 'hmmm';
};
type LoggerCallback = (data: LogData) => void;

type OnyxUpdatesListenerLogData = {
    date: string;
    method?: OnyxMethod;
    key?: OnyxKey;
    data: unknown;
    trace?: string;
};
type OnyxUpdatesListenerCallback = (data: OnyxUpdatesListenerLogData) => void;

// eslint-disable-next-line @typescript-eslint/no-empty-function
let logger: LoggerCallback = () => {};
// eslint-disable-next-line @typescript-eslint/no-empty-function
let onyxUpdatesListener: OnyxUpdatesListenerCallback = () => {};

/**
 * Register the logging callback
 */
function registerLogger(callback: LoggerCallback) {
    logger = callback;
}

function registerOnyxUpdatesListener(callback: OnyxUpdatesListenerCallback) {
    onyxUpdatesListener = callback;
}

function logOnyxUpdate(data: OnyxUpdatesListenerLogData) {
    onyxUpdatesListener({...data, trace: Error().stack});
}

/**
 * Send an alert message to the logger
 */
function logAlert(message: string) {
    logger({message: `[Onyx] ${message}`, level: 'alert'});
}

/**
 * Send an info message to the logger
 */
function logInfo(message: string) {
    logger({message: `[Onyx] ${message}`, level: 'info'});
}

/**
 * Send an hmmm message to the logger
 */
function logHmmm(message: string) {
    logger({message: `[Onyx] ${message}`, level: 'hmmm'});
}

export {registerLogger, registerOnyxUpdatesListener, logOnyxUpdate, logInfo, logAlert, logHmmm};
