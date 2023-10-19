const crypto = require("crypto");

// Encryption function
function encrypt(text, key) {
    // Generate a random initialization vector (IV)
    const iv = crypto.randomBytes(16);
    
    // Create a cipher with the given key and IV
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key, "hex"), iv);
  
    // Update the cipher with the text
    let encrypted = cipher.update(text, "utf8", "hex");
  
    // Finalize the encryption
    encrypted += cipher.final("hex");
  
    // Combine the IV and the encrypted text
    return iv.toString("hex") + ":" + encrypted;
  }

// Decryption function
function decrypt(encryptedData, key) {
    try {
      const [iv, encryptedText] = encryptedData.split(":"); // Split IV and encrypted text
      const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key, "hex"), Buffer.from(iv, "hex"));
      let decrypted = decipher.update(Buffer.from(encryptedText, "hex"));
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return decrypted.toString();
    } catch (error) {
      console.error("Error decrypting data:", error);
      throw error;
    }
  }

module.exports = { encrypt, decrypt };