// app/api/supercollider/route.ts
import { NextRequest, NextResponse } from 'next/server';
import osc from 'osc';

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  const udpPort = new osc.UDPPort({ remoteAddress: "127.0.0.1", remotePort: 57110 });
  udpPort.open();

  udpPort.send({ address: '/runCode', args: [{ type: 's', value: code }] });

  return new Promise(resolve => {
    udpPort.on('message', function (oscMsg) {
      resolve(NextResponse.json({ result: oscMsg }));
      udpPort.close();
    });
  });
}
