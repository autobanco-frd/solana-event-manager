import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { EventManager } from "../target/types/event_manager";
import { BN } from "bn.js";
import { Keypair, PublicKey } from '@solana/web3.js';
//import { createMint } from "@solana/spl-token";
import { createMint } from './utils';

describe("event-manager", () => {

  const provider = anchor.AnchorProvider.env();
  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  const program = anchor.workspace.EventManager as Program<EventManager>;

  //event test data 
  //const name:string = "my_event";
  //const ticketPrice = new BN(1);

  //event accounts address
  let acceptedMint: PublicKey;

  //PDAs
  let eventPublickey: PublicKey;
  let eventMint: PublicKey;
  let treasuryVault: PublicKey;
  let gainVault: PublicKey;

  before(async () => {
    acceptedMint = await createMint(provider);

    //find even account PDA
    [eventPublickey] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from ("event", "utf-8"), provider.wallet.publicKey.toBuffer()],
        program.programId
    );

    [eventMint] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from ("event_mint", "utf-8"), eventPublickey.toBuffer()],
      program.programId
   );

    [treasuryVault] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from ("treasury_vault", "utf-8"), eventPublickey.toBuffer()],
      program.programId
    );

    [gainVault] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from ("event_mint", "utf-8"), eventPublickey.toBuffer()],
      program.programId
  );
                  

  });


  it("Is initialized!", async () => {
    // Add your test here.
    const name:string = "my_event";
    const ticketPrice = new BN(1);
    const tx = await program.methods.createEvent(name, ticketPrice)
    .accounts({
     event: eventPublickey,
     acceptedMint: acceptedMint,
     eventMint: eventMint,
     treasuryVault: treasuryVault,
     gainVault: gainVault,
     authority: provider.wallet.publicKey,

    })
    .rpc();

     //show event info 
     const eventAccount = await program.account.event.fetch(eventPublickey);
     console.log("Event info: ", eventAccount);
    
  });
});
