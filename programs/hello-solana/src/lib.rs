use anchor_lang::prelude::*;

declare_id!("sQjSNmjaDijHTWCu1P25HYQF3QendugoS91ZBxdN34w");

#[program]
pub mod hello_solana {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
