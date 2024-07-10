use { anchor_lang::prelude::*, crate::instructions::*} ;

mod collections;
mod instructions;
mod utils;

//realizado por: 
//XRei_investor (usuario discord)
//Reidys Rojas 
//Alfredo Gonzalez 
//autobanco

declare_id!("26n5c8HiiB3s8PFMPEMDitYTD9SCG8jh13Tfx8ZL5spK");

#[program]
pub mod event_manager {
    use super::*;

    pub fn create_event(
        ctx: Context<CreateEvent>,
        name: String,
        ticket_price: u64,
    ) -> Result<()> {
        instructions::create_event::handle(ctx, name, ticket_price)
    }

     // sponsor event (get event mint tokens)
     pub fn sponsor_event (
        ctx: Context<Sponsor>,
        quantity: u64,
    ) -> Result<()> {
        instructions::sponsor::handle(ctx, quantity)
    }

    // buy tickets
    pub fn buy_tickets (
        ctx: Context<BuyTickets>,
        quantity: u64,
    ) -> Result<()> {
        instructions::buy_tickets::handle(ctx, quantity)
    }

     // withdraw funds
     pub fn withdraw_funds(
        ctx: Context<WithdrawFunds>,
        amount: u64,
    ) -> Result<()> {
        instructions::withdraw_funds::handle(ctx, amount)
    }

    // close event
    pub fn close_event (
        ctx: Context<CloseEvent>
    ) -> Result<()> {
        instructions::close_event::handle(ctx)
    }

    // withdraw earnings
    pub fn withdraw_earnings(
        ctx: Context<WithdrawEarnings>
    ) -> Result<()> {
        instructions::withdraw_earnings::handle(ctx)
    }
}