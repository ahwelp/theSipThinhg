//The required imports 
var udp = require('dgram');
var buffer = require('buffer');
const fs = require('fs');
var os = require('os');

var ifaces = os.networkInterfaces();
var localIp = ifaces['enp0s25'][0].address;
var remoteIp = process.argv[2];

//Tha packages
var invite = fs.readFileSync('vomit_tandberg.txt', 'utf8');
invite = invite.replace(/\{local_ip\}/g, localIp);
invite = invite.replace(/\{remote_ip\}/g, remoteIp);

/*var ok = fs.readFileSync('vomit_tandberg.txt', 'utf8');
ok = ok.replace(/\{local_ip\}/g, localIp);
ok = ok.replace(/\{remote_ip\}/g, remoteIp);

var ack = fs.readFileSync('vomit_tandberg_ack.txt', 'utf8');
ack = ack.replace(/\{local_ip\}/g, localIp);
ack = ack.replace(/\{remote_ip\}/g, remoteIp);
*/

var client = udp.createSocket('udp4');

client.on('message',function(msg,info){
  console.log('Data received from server : ' + msg.toString());
  console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
});

//sending msg
client.send(Buffer.from(invite), 5060, remoteIp, function(error){
  if(error){
    client.close();
  }else{
    console.log('Data sent !!!');
  }
});