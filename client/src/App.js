import getBlockchain from './ethereum.js';
import React, {useEffect, useState } from 'react';

function App() {
  const [wallet, setWallet] = useState(undefined);

  useEffect(() => {
    const init = async () => {
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