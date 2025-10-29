import { useAppStore } from '../../store/useAppStore';

export default function WalletConnect() {
  const { wallet, connectWallet, disconnectWallet } = useAppStore();
  return wallet.connected ? (
    <div className="flex items-center gap-2">
      <span className="rounded-md bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">{wallet.address}</span>
      <button className="btn-secondary" onClick={disconnectWallet}>Disconnect</button>
    </div>
  ) : (
    <button className="btn-primary" onClick={connectWallet}>Connect Wallet</button>
  );
}
