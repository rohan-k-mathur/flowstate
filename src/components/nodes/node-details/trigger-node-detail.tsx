import type { AppNode } from '@/components/nodes';

export type NodeDetailProps = {
    node: AppNode;
    setNodeData: (nodeId: string, data: Partial<AppNode['data']>) => void;
  };
export const TriggerNodeDetail = ({ node, setNodeData }: NodeDetailProps) => {
    const platforms = ['Shopify', 'Etsy', 'Amazon', 'eBay', 'IG Shop'];
  
    const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setNodeData(node.id, { platform: e.target.value as typeof platforms[number] });
    };
  
    return (
      <div className="p-4 flex flex-col gap-4">
        <div>
          <label className="font-semibold mb-1 block" htmlFor="platform">
            Choose Marketplace
          </label>
          <select
            id="platform"
            className="border rounded p-2 w-full"
            value={node.data.platform || platforms[0]}
            onChange={handlePlatformChange}
          >
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>
  
        {node.data.platform && (
          <div>
            <label className="font-semibold mb-1 block" htmlFor="trigger-event">
              Choose Trigger Event ({node.data.platform})
            </label>
            <select
              id="trigger-event"
              className="border rounded p-2 w-full"
              value={node.data.event || ''}
              onChange={(e) => setNodeData(node.id, { event: e.target.value })}
            >
              {getTriggerEvents(node.data.platform).map((event) => (
                <option key={event} value={event}>
                  {event}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  };
  
  function getTriggerEvents(platform: string) {
    switch (platform) {
      case 'Shopify':
        return [
          'Order placed',
          'Inventory changed',
          'Checkout abandoned',
          'Product created',
          'Review published',
          'Collection created',
          'Customer account disabled',
        ];
      case 'Etsy':
        return ['Order placed', 'Listing updated', 'Shop updated'];
      case 'Amazon':
        return ['Order received', 'Product listed', 'Inventory update'];
      case 'eBay':
        return ['Item sold', 'Listing ended', 'Item relisted'];
      case 'IG Shop':
        return ['Product tagged', 'New checkout'];
      default:
        return [];
    }
  }
  