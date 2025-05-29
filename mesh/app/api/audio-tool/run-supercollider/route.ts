import { NextRequest, NextResponse } from 'next/server';
import osc from 'osc';

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  return new Promise((resolve, reject) => {
    const udpPort = new osc.UDPPort({
      localAddress: '127.0.0.1',
      localPort: 57121,
      remoteAddress: '127.0.0.1',
      remotePort: 57110
    });

    udpPort.open();

    udpPort.on('ready', () => {
      udpPort.send({
        address: '/runCode',
        args: [{ type: 's', value: code }],
      });
    });

    udpPort.on('message', (oscMsg) => {
      resolve(NextResponse.json({ result: oscMsg }));
      udpPort.close();
    });

    udpPort.on('error', (err) => {
      console.error('OSC Error:', err);
      udpPort.close();
      reject(NextResponse.json({ error: err.message }, { status: 500 }));
    });

    setTimeout(() => {
      reject(NextResponse.json({ error: 'Timeout' }, { status: 500 }));
      udpPort.close();
    }, 10000);
  });
}
