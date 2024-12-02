use holochain_types::prelude::AgentPubKey;
use holochain_zome_types::prelude::Signature;
use lair_keystore_api::LairClient;

/// Signs an unsigned zome call with the given LairClient
pub async fn sign_zome_call_with_client(
  zome_call_bytes_hash: Vec<u8>,
  pub_key: AgentPubKey,
  client: &LairClient,
) -> Result<Vec<u8>, String> {
  let mut pub_key_2 = [0; 32];
  pub_key_2.copy_from_slice(pub_key.get_raw_32());

  let sig = client
    .sign_by_pub_key(pub_key_2.into(), None, zome_call_bytes_hash.into())
    .await
    .unwrap();

  let signature = Signature(*sig.0);

  Ok(signature.0.to_vec())
}
