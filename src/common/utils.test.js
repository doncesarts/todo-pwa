import urlB64ToUint8Array from './utils';

it('tests urlB64ToUint8Array', () => {
    const urlB64 = urlB64ToUint8Array('aG9sYQ==');


    expect(urlB64.toString()).toEqual('104,111,108,97');
});
