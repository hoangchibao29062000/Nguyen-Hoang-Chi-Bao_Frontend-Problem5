// // Encryption.ts
// import sodium from 'libsodium-wrappers';
// import { Buffer } from 'buffer';
// (window as any).Buffer = Buffer;

// /**
//  * Mã hoá dữ liệu (object) sử dụng libsodium với thuật toán secretbox_easy.
//  * Dữ liệu được chuyển thành chuỗi JSON, sau đó được mã hoá với key được tạo từ passphrase cố định.
//  * Ciphertext và nonce được chuyển sang dạng "latin1" (raw binary) để hiển thị.
//  */
// export async function encryptData(data: any): Promise<{ cipherText: string; nonce: string }> {
//   await sodium.ready;
  
//   // Tạo key từ passphrase cố định "nguyenhoangchibao"
//   const key: Uint8Array = sodium.crypto_generichash(sodium.crypto_secretbox_KEYBYTES, "nguyenhoangchibao");
  
//   // Chuyển object thành chuỗi JSON
//   const message: string = JSON.stringify(data);
  
//   // Tạo nonce ngẫu nhiên với độ dài đúng (sodium.crypto_secretbox_NONCEBYTES, thường là 24 bytes)
//   const nonce: Uint8Array = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
  
//   // Mã hoá message
//   const ciphertext: Uint8Array = sodium.crypto_secretbox_easy(message, nonce, key);
  
//   // Chuyển ciphertext và nonce sang chuỗi Latin1 (raw binary)
//   const cipherTextLatin1: string = Buffer.from(ciphertext).toString("base64");
//   const nonceLatin1: string = Buffer.from(nonce).toString("base64");
  
//   return {
//     cipherText: cipherTextLatin1,
//     nonce: nonceLatin1
//   };
// }

// /**
//  * Giải mã dữ liệu được mã hoá (cipherText và nonce ở dạng Latin1).
//  * Key được tạo từ passphrase cố định giống hàm mã hoá.
//  */
// export async function decryptData(cipherText: string, nonce: string): Promise<any> {
//   await sodium.ready;
  
//   // Chuyển chuỗi Latin1 trở lại Uint8Array
//   const ciphertextBuf: Uint8Array = Buffer.from(cipherText, "base64");
//   const nonceBuf: Uint8Array = Buffer.from(nonce, "base64");
  
//   // Tạo key từ passphrase cố định
//   const key: Uint8Array = sodium.crypto_generichash(sodium.crypto_secretbox_KEYBYTES, "nguyenhoangchibao");
  
//   // Giải mã dữ liệu
//   const decrypted: Uint8Array | null = sodium.crypto_secretbox_open_easy(ciphertextBuf, nonceBuf, key);
//   if (decrypted === null) {
//     throw new Error("Decryption failed!");
//   }
  
//   // Chuyển dữ liệu giải mã thành chuỗi UTF-8
//   const decryptedMessage: string = Buffer.from(decrypted).toString('utf8');
//   return JSON.parse(decryptedMessage);
// }

export async function encryptData(){}