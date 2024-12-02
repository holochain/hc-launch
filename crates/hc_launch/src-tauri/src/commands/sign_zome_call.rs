use holochain_launcher_utils::zome_call_signing::sign_zome_call_with_client;
use holochain_types::prelude::AgentPubKey;
use lair_keystore_api::LairClient;
use std::collections::HashMap;

use crate::error::HcLaunchError;

#[tauri::command]
pub async fn sign_zome_call(
  window: tauri::Window,
  lair_clients_state: tauri::State<'_, HashMap<String, LairClient>>,
  pubkey_map_state: tauri::State<'_, HashMap<String, AgentPubKey>>,
  bytes_hash: Vec<u8>,
  pub_key: AgentPubKey,
) -> Result<Vec<u8>, HcLaunchError> {
  let window_label = window.label();

  // validate that the agent public key requested to be signed with field is actually the
  // one associated to the UI that's making the call
  let maybe_authorized_pubkey = (*pubkey_map_state).get(window_label);

  match maybe_authorized_pubkey {
    Some(pubkey) => {
      if pubkey != &pub_key {
        return Err(HcLaunchError::SignZomeCallError(String::from("The provided public key to be signed for is not authorized to make a zome call to the requested cell.")));
      }
    }
    None => {
      return Err(HcLaunchError::SignZomeCallError(String::from(
        "No authorized public key found for this window.",
      )));
    }
  }

  // get the right lair client from the hashmap
  let client = (*lair_clients_state).get(window_label).expect(
    format!(
      "No lair client for this window with label '{}'",
      window_label
    )
    .as_str(),
  );

  // sign the zome call
  sign_zome_call_with_client(bytes_hash, pub_key, client)
    .await
    .map_err(|e| HcLaunchError::SignZomeCallError(e))
}
