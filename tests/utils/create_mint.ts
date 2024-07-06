import { AnchorProvider, web3 } from "@coral-xyz/anchor";
import {
    createInitializeMintInstruction,
    MintLayout,
    TOKEN_PROGRAM_ID,
    TokenAccountNotFoundError,
} from '@solana/spl-token';

//create new Token (mint accunt)

export const createMint = async (
    provider: AnchorProvider,
    decimals = 0 //no decimals
): Promise<web3.PublicKey> => {
    //tokne keypair
    const tokenMint = new web3.Keypair();
    //calculate rent
    const lamportsForMint = 
            await provider.connection.getMinimumBalanceForRentExemption(
                MintLayout.span //mint layout
            );
    await provider.sendAndConfirm(
        new web3.Transaction()
                .add(
                    web3.SystemProgram.createAccount({
                        programId: TOKEN_PROGRAM_ID,
                        space: MintLayout.span,
                        fromPubkey: provider.wallet.publicKey,
                        newAccountPubkey: tokenMint.publicKey,
                        lamports: lamportsForMint,
                    })
                )
                .add(

                    createInitializeMintInstruction(
                        tokenMint.publicKey,
                        decimals,
                        provider.wallet.publicKey,
                        provider.wallet.publicKey
                    )
                ),
                [tokenMint]
    );
    
    return tokenMint.publicKey;


};


