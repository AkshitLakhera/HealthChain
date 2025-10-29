use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod healthchain {
    use super::*;

    pub fn create_patient(
        ctx: Context<CreatePatient>,
        name: String,
        age: u8,
        gender: String,
    ) -> Result<()> {
        let patient = &mut ctx.accounts.patient;
        patient.authority = ctx.accounts.authority.key();
        patient.name = name;
        patient.age = age;
        patient.gender = gender;
        
        msg!("Patient account created for: {}", patient.name);
        Ok(())
    }

    pub fn add_medical_record(
        ctx: Context<AddMedicalRecord>,
        report_cid: String,
        report_type: String,
    ) -> Result<()> {
        let record = &mut ctx.accounts.medical_record;

        record.patient = ctx.accounts.patient.key();
        record.doctor = ctx.accounts.doctor.key();
        record.report_cid = report_cid;
        record.report_type = report_type;
        record.timestamp = Clock::get()?.unix_timestamp;

        msg!("Medical record added for patient: {}", record.patient);
        Ok(())
    }
}

#[account]
pub struct PatientAccount {
    pub authority: Pubkey,
    pub name: String,
    pub age: u8,
    pub gender: String,
}

#[account]
pub struct MedicalRecord {
    pub patient: Pubkey,
    pub doctor: Pubkey,
    pub report_cid: String,
    pub report_type: String,
    pub timestamp: i64,
}

#[derive(Accounts)]
pub struct CreatePatient<'info> {
    #[account(
        init,
        seeds = [b"patient", authority.key().as_ref()],
        bump,
        payer = authority,
        space = 8 + 32 + 4 + 50 + 1 + 4 + 10
    )]
    pub patient: Account<'info, PatientAccount>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddMedicalRecord<'info> {
    #[account(
        init,
        payer = doctor,
        space = 8 + 32 + 32 + 4 + 100 + 4 + 50 + 8
    )]
    pub medical_record: Account<'info, MedicalRecord>,

    #[account(mut)]
    pub patient: Account<'info, PatientAccount>,

    #[account(mut)]
    pub doctor: Signer<'info>,

    pub system_program: Program<'info, System>,
}