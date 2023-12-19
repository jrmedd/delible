export class SimpleCrypto {
  async generateKeyAndIV () {
    const dateString = new Date().toISOString().slice(0, 10)
    const encoder = new TextEncoder()
    const keyMaterial = await window.crypto.subtle.digest('SHA-256', encoder.encode(dateString))
    const key = await window.crypto.subtle.importKey('raw', keyMaterial, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt'])
    const iv = encoder.encode(dateString)
    return { key, iv }
  }

  async encryptText (text) {
    const { key, iv } = await this.generateKeyAndIV()
    const encodedText = new TextEncoder().encode(text)
    const encryptedBuffer = await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encodedText)
    const encryptedText = btoa(String.fromCharCode.apply(null, new Uint8Array(encryptedBuffer)))
    return encryptedText
  }

  async decryptText (encryptedData) {
    const { key, iv } = await this.generateKeyAndIV()
    const encryptedBuffer = new Uint8Array(Array.from(atob(encryptedData), c => c.charCodeAt(0)))
    const decryptedBuffer = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, encryptedBuffer)
    return new TextDecoder().decode(decryptedBuffer)
  }
}
