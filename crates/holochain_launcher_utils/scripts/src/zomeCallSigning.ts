import {
  CallZomeRequest,
  CallZomeRequestSigned,
  getNonceExpiration,
  randomNonce,
} from "@holochain/client";
import { encode } from "@msgpack/msgpack";
import { invoke } from "@tauri-apps/api";
import { sha512 } from "js-sha512";

declare global {
  interface Window {
    __HC_ZOME_CALL_SIGNER__: {
      signZomeCall: (
        request: CallZomeRequest
      ) => Promise<CallZomeRequestSigned>;
    };
  }
}

const signZomeCall = async (request: CallZomeRequest) => {
  if (!request.provenance)
    return Promise.reject(
      "Call zome request has provenance field not set. This should be set by the js-client."
    );

  const zomeCallToSign: CallZomeRequest = {
    cell_id: request.cell_id,
    zome_name: request.zome_name,
    fn_name: request.fn_name,
    payload: encode(request.payload),
    provenance: request.provenance,
    nonce: await randomNonce(),
    expires_at: getNonceExpiration(),
  };

  const zomeCallBytes = encode(zomeCallToSign);
  const bytesHash = sha512.array(zomeCallBytes);

  const signature: number[] = await invoke("sign_zome_call", {
    bytesHash,
    pubKey: Array.from(request.provenance),
  });

  const signedZomeCall: CallZomeRequestSigned = {
    bytes: zomeCallBytes,
    signature: Uint8Array.from(signature),
  };

  return signedZomeCall;
};

window.__HC_ZOME_CALL_SIGNER__ = {
  signZomeCall,
};
