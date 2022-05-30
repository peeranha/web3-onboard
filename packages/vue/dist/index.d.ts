import type { InitOptions, OnboardAPI } from '@web3-onboard/core';
import type { OnboardComposable } from './types';
declare const init: (options: InitOptions) => OnboardAPI;
declare const useOnboard: () => OnboardComposable;
export { init, useOnboard };
