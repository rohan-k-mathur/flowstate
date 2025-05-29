import { NextRequest, NextResponse } from 'next/server';
import { UDPPort } from 'osc';

export async function POST(req: NextRequest) {
  const { code } = await req.json();
  const udpPort = new UDPPort({
    remoteAddress: '127.0.0.1',
    remotePort: 57110
  });

  udpPort.open();
  udpPort.send({ address: '/runCode', args: [{ type: 's', value: code }] });

  return new Promise(resolve => {
    udpPort.on('message', (oscMsg: { address: string; args?: any[] }) => {
      resolve(NextResponse.json({ result: oscMsg }));
      udpPort.close();
    });
  });
}
