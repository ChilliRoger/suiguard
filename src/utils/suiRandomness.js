import { SuiClient } from "@mysten/sui.js/client";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { sha256 } from "@noble/hashes/sha256";
import { Buffer } from "buffer";

// The address that will receive the payment
const PAYMENT_ADDRESS = "0x50bda336b7d0adc102c9376db97097875bfb47c0fa16cd65e1f097a3d1fa185c";
const PASSWORD_PRICE = 1000000; // 0.001 SUI (1 SUI = 1_000_000_000 MIST)

// List of predefined strong passwords
// const STRONG_PASSWORDS = [
//   "Kj#9mP$2vN5xL@8q",
//   "P8%kR#mN4$vX9j&L",
//   "X5$jL#nM2@pK7v&Q",
//   "M3#nB$vC5*xZ9p&L",
//   "T7%hJ#kL9$mN4@vX",
//   "W2$pK#xL5@jM8&nB",
//   "H6#mN$vX3*pK9&jL",
//   "Q4%kL#nB7$xZ2@mP",
//   "Y8#vX$jL5*nM3&pK",
//   "R5%pK#mN9$vX4@jL",
//   "B3#xZ$kL7*nM6&vX",
//   "G9%jL#pK2$mN8@xZ",
//   "D4#nM$vX6*kL1&pK",
//   "C7%xZ#jL3$pK5@nM",
//   "F2#kL$mN8*vX4&jL"
// ];

let lastUsedIndex = -1;

function generateStrongPassword(seed) {
  // Character sets for different types of characters
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  // Use the transaction digest to create a unique seed
  const hash = Array.from(sha256(seed));
  let password = '';

  // Ensure at least one character from each set
  password += uppercase[hash[0] % uppercase.length];
  password += lowercase[hash[1] % lowercase.length];
  password += numbers[hash[2] % numbers.length];
  password += special[hash[3] % special.length];

  // Fill the rest of the password
  const allChars = uppercase + lowercase + numbers + special;
  for (let i = 4; i < 16; i++) {
    password += allChars[hash[i] % allChars.length];
  }

  // Shuffle the password characters
  const shuffled = password.split('');
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = hash[(i * 13) % hash.length] % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.join('');
}

export async function generateRandomPassword(signer) {
  try {
    console.log("Starting password generation...");

    if (!signer) {
      throw new Error("No wallet connected");
    }

    const tx = new TransactionBlock();
    
    // Split coin to pay exact amount
    const [coin] = tx.splitCoins(tx.gas, [tx.pure(PASSWORD_PRICE)]);
    
    // Transfer the payment
    tx.transferObjects([coin], tx.pure(PAYMENT_ADDRESS));

    // Execute the transaction
    const result = await signer.signAndExecuteTransactionBlock({
      transactionBlock: tx,
      options: { 
        showEffects: true,
        showEvents: true 
      }
    });

    console.log("Payment transaction result:", result);

    if (result.effects?.status?.status === "success") {
      // Use transaction digest and timestamp for unique seed
      const seed = Buffer.from(result.digest + Date.now().toString());
      const password = generateStrongPassword(seed);
      return password;
    } else {
      throw new Error("Payment failed");
    }

  } catch (error) {
    console.error("Error in password generation:", error);
    throw error;
  }
}