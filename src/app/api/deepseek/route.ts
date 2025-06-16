import { NextRequest, NextResponse } from 'next/server';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
export async function POST(request: NextRequest) {
    const { prompt } = await request.json();
  
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: `
You are a workflow generation assistant. Generate a JSON response containing exactly two fields: "nodes" and "edges".

Nodes must be selected ONLY from the following predefined node types:
- "trigger-node" (fields: platform, event)
- "action-node" (fields: actionType)
- "inventory-node" (fields: sku, quantity)
- "branch-node"
- "transform-node"
- "output-node"

format example: 
{
    "nodes": [
      {
        "id": "trigger-node-1",
        "type": "trigger-node",
        "position": {"x":0,"y":-200},
        "data": {"platform":"Shopify","event":"Order placed"}
      },
      {
        "id": "action-node-1",
        "type": "action-node",
        "position": {"x":200,"y":0},
        "data": {"actionType":"send-email"}
      },
      {
        "id": "inventory-node-1",
        "type": "inventory-node",
        "position": {"x":400,"y":0},
        "data": {"quantity": 10, "sku": "ABC123"}
      },
      {
        "id": "branch-node-1",
        "type": "branch-node",
        "position": {"x":200,"y":-100},
        "data": {"title": "Check Inventory"}
      }
    ],
    "edges": [
      {
        "id": "trigger-to-branch",
        "source": "trigger-node-1",
        "target": "branch-node-1",
        "sourceHandle": "output",
        "targetHandle": "input"
      },
      {
        "id": "branch-to-email",
        "source": "branch-node-1",
        "target": "action-node-1",
        "sourceHandle": "true",
        "targetHandle": "input"
      },
      {
        "id": "branch-to-inventory",
        "source": "branch-node-1",
        "target": "inventory-node-1",
        "sourceHandle": "false",
        "targetHandle": "input"
      }
    ]
  }

Provide ONLY the JSON response without markdown or code fences.
  `
          },
          { role: "user", content: prompt }
        ],
        stream: false
      })
    });
  
    const data = await response.json();
  
    console.debug('DeepSeek Raw API Response:', data);
  
    // Extract and clean markdown-wrapped JSON
    let jsonResponse;
    try {
      let deepseekContent = data.choices[0].message.content.trim();
  
      // Remove markdown code fences (```json ... ```)
      if (deepseekContent.startsWith("```json")) {
        deepseekContent = deepseekContent.slice(7).trim(); // remove leading ```json
        deepseekContent = deepseekContent.replace(/```$/, '').trim(); // remove trailing ```
      }
  
      jsonResponse = JSON.parse(deepseekContent);
    } catch (err) {
      console.error("Error parsing JSON:", err, data);
      return new Response(JSON.stringify({ error: 'Malformed JSON from Deepseek' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  
    console.debug('Parsed JSON Response:', jsonResponse);
  
    return new Response(JSON.stringify(jsonResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  