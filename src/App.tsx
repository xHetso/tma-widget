import './App.css'
import { useEffect, useRef } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import ToncastWidgetLoader from '@toncast/widget-loader';

function ToncastBettingWidget() {
  const [tonconnect] = useTonConnectUI();
  const ref = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<InstanceType<Awaited<ReturnType<typeof ToncastWidgetLoader.load>>> | null>(null);

  useEffect(() => {
    let active = true;
    ToncastWidgetLoader.load()
      .then((Widget) => {
        if (!active || !ref.current) return;
        widgetRef.current = new Widget({
          tonconnect: { type: 'integrated', instance: tonconnect },
        widget: {
                "layout": {
                        "grid": {
                                "mobile": 1,
                                "tablet": 2,
                                "desktop": 3
                        }
                }
        },
        });
        widgetRef.current.mount(ref.current);
      })
      .catch((err) => console.error('[ToncastWidget] load failed:', err));
    return () => { active = false; widgetRef.current?.dispose(); };
  }, [tonconnect]);

  return <div ref={ref} style={{ width: '100%' }} />;
}


function App() {
  return (
    <>
      <ToncastBettingWidget />
    </>
  )
}

export default App
