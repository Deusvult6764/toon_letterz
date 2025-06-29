import { Contract } from 'starknet';
import toonLetterzAbi from './toonLetterzAbi.json'; // Your ABI file

// Replace with your actual contract address
export const TOONLETTERZ_CONTRACT_ADDRESS = "0x0491806b4ef3c3845d379a418614a835981a1a98d12c22a8cb005c56248180ee";

export function createToonLetterzContract(provider: any) {
  return new Contract(toonLetterzAbi, TOONLETTERZ_CONTRACT_ADDRESS, provider);
}