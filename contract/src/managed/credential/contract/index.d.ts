import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum CredentialStatus { PENDING = 0, ISSUED = 1, VERIFIED = 2 }

export type Witnesses<PS> = {
  privateGrade(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, bigint];
  issuerSecretKey(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
  studentSecretKey(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
}

export type ImpureCircuits<PS> = {
  issueCredential(context: __compactRuntime.CircuitContext<PS>,
                  studentAddress_0: Uint8Array,
                  threshold_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
  proveEligible(context: __compactRuntime.CircuitContext<PS>,
                credentialId_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  checkEligibility(context: __compactRuntime.CircuitContext<PS>,
                   credentialId_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
}

export type ProvableCircuits<PS> = {
  issueCredential(context: __compactRuntime.CircuitContext<PS>,
                  studentAddress_0: Uint8Array,
                  threshold_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
  proveEligible(context: __compactRuntime.CircuitContext<PS>,
                credentialId_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  checkEligibility(context: __compactRuntime.CircuitContext<PS>,
                   credentialId_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
}

export type PureCircuits = {
  derivePublicKey(sk_0: Uint8Array, context_0: Uint8Array): Uint8Array;
}

export type Circuits<PS> = {
  derivePublicKey(context: __compactRuntime.CircuitContext<PS>,
                  sk_0: Uint8Array,
                  context_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  issueCredential(context: __compactRuntime.CircuitContext<PS>,
                  studentAddress_0: Uint8Array,
                  threshold_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
  proveEligible(context: __compactRuntime.CircuitContext<PS>,
                credentialId_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  checkEligibility(context: __compactRuntime.CircuitContext<PS>,
                   credentialId_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
}

export type Ledger = {
  readonly credentialCount: bigint;
  credentialOwner: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): Uint8Array;
    [Symbol.iterator](): Iterator<[bigint, Uint8Array]>
  };
  credentialCommitment: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): Uint8Array;
    [Symbol.iterator](): Iterator<[bigint, Uint8Array]>
  };
  credentialStatus: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): CredentialStatus;
    [Symbol.iterator](): Iterator<[bigint, CredentialStatus]>
  };
  credentialThreshold: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): bigint;
    [Symbol.iterator](): Iterator<[bigint, bigint]>
  };
  eligibilityResult: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): boolean;
    [Symbol.iterator](): Iterator<[bigint, boolean]>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
