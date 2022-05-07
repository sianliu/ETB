import getBlockchain from './ethereum.js';
import React, {useEffect, useState } from 'react';

function App() {
  const [wallet, setWallet] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'wallet' does not exist on type 'unknown'... Remove this comment to see the full error message
      const { wallet } = await getBlockchain();
      setWallet(wallet);
    };
    init();
  }, []);

  if(
    typeof wallet === 'undefined'
  ) {
    return 'Loading...';
  }

  return (
    <div className="App">
    </div>
  );
}

export default App;