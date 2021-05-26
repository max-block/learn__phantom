import 'regenerator-runtime/runtime'

import {Connection, SystemProgram, Transaction} from '@solana/web3.js'

export function connectWallet() {
    window.solana.on("connect", () => {
        console.log("phantom connected!")
        console.log(window.solana.publicKey.toString())
    })
    window.solana.connect()
}

export async function transferSOL() {
    console.log("transferSOL called")
    const provider = window.solana;
    const connection = new Connection("https://testnet.solana.com")
    let transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: provider.publicKey,
            toPubkey: provider.publicKey,
            lamports: 777
        })
    )
    transaction.feePayer = provider.publicKey;
    transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
    console.log(transaction)
    console.log("Sending signature request to wallet");
    let signed = await provider.signTransaction(transaction);
    console.log("Got signature, submitting transaction");
    let signature = await connection.sendRawTransaction(signed.serialize());
    console.log(
        "Submitted transaction " + signature + ", awaiting confirmation"
    );
    await connection.confirmTransaction(signature);
    console.log("Transaction " + signature + " confirmed");

}



