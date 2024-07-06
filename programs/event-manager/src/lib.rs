use { anchor_lang::prelude::*, crate::instructions::*} ;

mod collections;
mod instructions;

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
}

