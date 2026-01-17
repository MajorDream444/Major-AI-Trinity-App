/**
 * Optional Web3 stub.
 * Implement later with wagmi/viem or ethers.
 */
export type WalletStatus = "disconnected" | "connecting" | "connected";
export type WalletState = { status: WalletStatus; address?: string };

export async function connectWallet(): Promise<WalletState> {
  return { status: "disconnected" };
}
