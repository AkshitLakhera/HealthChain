import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { assert } from "chai";

describe("healthchain", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  // Use dynamic type lookup to avoid compilation errors
  const program: any = anchor.workspace.Healthchain || anchor.workspace.Backend;

  if (!program) {
    const availablePrograms = Object.keys(anchor.workspace).join(", ");
    throw new Error(`Program not found. Available: ${availablePrograms}`);
  }

  const patient = anchor.web3.Keypair.generate();
  const doctor = anchor.web3.Keypair.generate();
  
  let patientPda: anchor.web3.PublicKey;

  before(async () => {
    // Airdrop SOL to test accounts
    try {
      const airdropPatient = await provider.connection.requestAirdrop(
        patient.publicKey,
        2 * anchor.web3.LAMPORTS_PER_SOL
      );
      const airdropDoctor = await provider.connection.requestAirdrop(
        doctor.publicKey, 
        2 * anchor.web3.LAMPORTS_PER_SOL
      );
      await provider.connection.confirmTransaction(airdropPatient);
      await provider.connection.confirmTransaction(airdropDoctor);
    } catch (error) {
      console.log("Airdrop might have failed, continuing anyway...");
    }
  });

  it("Create patient account!", async () => {
    // Calculate PDA for patient account
    [patientPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("patient"), patient.publicKey.toBuffer()],
      program.programId
    );

    try {
      // Call create_patient instruction
      const tx = await program.methods
        .createPatient("John Doe", 30, "Male")
        .accounts({
          patient: patientPda,
          authority: patient.publicKey,
        })
        .signers([patient])
        .rpc();

      console.log("Patient creation transaction signature:", tx);

      // Fetch and verify the account
      const patientAccount = await program.account.patientAccount.fetch(patientPda);
      
      assert.equal(patientAccount.name, "John Doe");
      assert.equal(patientAccount.age, 30);
      assert.equal(patientAccount.gender, "Male");
      assert.isTrue(patientAccount.authority.equals(patient.publicKey));

      console.log("Patient account created successfully!");
    } catch (error) {
      console.error("Error creating patient:", error);
      throw error;
    }
  });

  it("Add medical record for patient!", async () => {
    // Create a new keypair for medical record
    const medicalRecordKeypair = anchor.web3.Keypair.generate();
    const medicalRecordPda = medicalRecordKeypair.publicKey;

    try {
      // Call add_medical_record instruction
      const tx = await program.methods
        .addMedicalRecord(
          "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
          "Blood Test Report"
        )
        .accounts({
          medicalRecord: medicalRecordPda,
          patient: patientPda,
          doctor: doctor.publicKey,
        })
        .signers([doctor, medicalRecordKeypair])
        .rpc();

      console.log("Medical record transaction signature:", tx);

      // Fetch and verify the medical record
      const medicalRecord = await program.account.medicalRecord.fetch(medicalRecordPda);
      
      assert.isTrue(medicalRecord.patient.equals(patientPda));
      assert.isTrue(medicalRecord.doctor.equals(doctor.publicKey));
      assert.equal(medicalRecord.reportCid, "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco");
      assert.equal(medicalRecord.reportType, "Blood Test Report");
      assert.isNumber(medicalRecord.timestamp.toNumber());

      console.log("Medical record added successfully!");
    } catch (error) {
      console.error("Error adding medical record:", error);
      throw error;
    }
  });
});