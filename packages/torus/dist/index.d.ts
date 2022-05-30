import type { WalletInit } from '@web3-onboard/common';
import type { TorusCtorArgs, TorusParams } from '@toruslabs/torus-embed';
declare type TorusOptions = TorusCtorArgs & TorusParams;
declare function torus(options?: TorusOptions): WalletInit;
export default torus;
