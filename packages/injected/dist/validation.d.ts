import { InjectedWalletOptions } from './types.js';
import Joi from 'joi';
declare type ValidateReturn = Joi.ValidationResult | null;
export declare const validateWalletOptions: (data: InjectedWalletOptions | Partial<InjectedWalletOptions>) => ValidateReturn;
export {};
