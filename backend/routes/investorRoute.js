import express from 'express';
const investorRouter = express.Router();
import User from "../models/User.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import investorDemand from '../models/InvestorDemands.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

investorRouter.post('/depositdemand', async (req,res) => {
  const { authorization } = req.headers;
  const accessToken = authorization && authorization.split(' ')[1];
  const user = await User.findOne({ accessToken: accessToken });
  console.log(user.id)
  console.log(req.body)
  const new_Demand = new investorDemand({
        investor_name: req.body.investor_name,
        user_ID : user._id,
        investor_surname: req.body.investor_surname ,
        investor_email:req.body.investor_phone_number,
        investor_phone_number: req.body.investor_phone_number,
        nationality: req.body.nationality,
        passport_ID:'passport_ID' in req.files ? req.files.passport_ID.name : 'No file chosen',
        Social_Security_Number: 'Social_Security_Number' in req.files ? req.files.Social_Security_Number.name : 'No file chosen',
        Tax_ID: req.body.Tax_ID,
        investor_type: req.body.investor_type,
        annual_income: req.body.annual_income,
        investment_experience: req.body.investment_experience,
        preferred_investment: req.body.preferred_investment,
        risk_tolerance: req.body.risk_tolerance,
        investment_objective: req.body.investment_objective,
        bank_account: req.body.bank_account,
        investment_primary_goal: req.body.investment_primary_goal,
        investor_reaction: req.body.investor_reaction,
        investment_time_horizon: req.body.investment_time_horizon,
        previous_investment_experience: req.body.previous_investment_experience,
        down_market_tolerance: req.body.down_market_tolerance,
        risk_attitude: req.body.risk_attitude
  })
  try {
          const mainDirPath = `./investorDemands/Investor-${user._id}/`
          try {
              if (!fs.existsSync('./investorDemands')) {
              fs.mkdirSync('./investorDemands');
              }
              if (!fs.existsSync(mainDirPath)) {
              fs.mkdirSync(mainDirPath);
          }
          } catch (err) {
              console.error(err);
          }
          
          Object.values(req.files).map(file => {
          file.mv(mainDirPath+file.name,function(err){
            if (err){
                console.log('An error just happened while uploading your files')
            }else{
                console.log('Files uploaded successfully')
            }
          })
          }); 
          const savedDemand = await new_Demand.save()
          try {
          const result = await User.findOneAndUpdate({ _id: user._id },{ $set: { KYC_Status: 'Submitted' } },{ new: true })
          if (!result) {
          console.log("Document not found.");
          return;
          }
          console.log("Document updated successfully:", result);
          }catch(error){
            console.log(error)
          }
          res.send(savedDemand);
  }catch(error) {
    res.status(400).send(error);
  }
 }
)

investorRouter.get('/', (req,res) => {
  res.send("fundraising route");
}
)

investorRouter.get('/mydemand', async (req,res) => {
  const { authorization } = req.headers;
  const accessToken = authorization && authorization.split(' ')[1];
  const user = await User.findOne({ accessToken: accessToken });
  try {
    const demand = await investorDemand.findOne({ user_ID: { $exists: true }, user_ID: user._id });

    if (!demand) {
      return res.status(404).json({ message: 'There is no demand with the specified user ID' });
    }
    console.log(demand)
    return res.json(demand);
  } catch (error) {
    console.error('Error finding book:', error);
    return res.status(500).json({ message: 'There is an error' });
  }
}
)

investorRouter.get('/demandowner', async (req,res) => {
  const { authorization } = req.headers;
  const accessToken = authorization && authorization.split(' ')[1];
  const user = await User.findOne({ accessToken: accessToken });
  return res.json(user);
}
)

investorRouter.put('/updateStatus', async (req, res) => {
  try {
    const { user_ID, newStatus } = req.body;
    console.log(user_ID)
    console.log(newStatus)
    // Find the startup demand by user_ID
    const updateFields = {
    Status: newStatus
    }

    const demand = await investorDemand.findOneAndUpdate(
      { user_ID: user_ID },
      { $set: updateFields },
      { new: true } // Return the updated document
    )

    const updatedDocument = await User.findByIdAndUpdate(
      user_ID,
      { KYC_Status: newStatus },
      { new: true } // To return the updated document instead of the original one
    );


    if (!demand) {
      return res.status(404).json({ error: 'Startup demand not found' });
    }

    return res.json(demand);
  } catch (error) {
    console.error('Error updating status:', error);
    return res.status(500).json({ error: 'Error updating status' });
  }
});

investorRouter.get('/document/download', async (req,res) => {
  const user_ID = req.query.user_ID;
  const FileName = req.query.FileName;
  const fileDir = path.join(__dirname, '..', 'investorDemands', `Investor-${user_ID}`);
  const filePath = path.join(fileDir, FileName);
  res.download(filePath);
}
)

investorRouter.put('/update/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  const updateFields = {
    investor_name : req.body.investor_name,
    investor_surname : req.body.investor_surname,
    investor_email : req.body.investor_email,
    investor_phone_number : req.body.investor_phone_number,
    nationality  : req.body.nationality,
    passport_ID : req.body.passport_ID,
    Social_Security_Number: req.body.Social_Security_Number,
    Tax_ID: req.body.Tax_ID,
    investor_type:req.body.investor_type,
    annual_income: req.body.annual_income,
    investment_experience: req.body.investment_experience,
    risk_tolerance: req.body.risk_tolerance,
    investment_objective : req.body.investment_objective,
    bank_account : req.body.bank_account,
    investment_primary_goal:req.body.investment_primary_goal,
    investor_reaction :req.body.investor_reaction,
    investment_time_horizon: req.body.investment_time_horizon,
    previous_investment_experience : req.body.previous_investment_experience,
    down_market_tolerance : req.body.down_market_tolerance,
    loss_tolerance :req.body.loss_tolerance,
    risk_attitude : req.body.risk_attitude,
    preferred_investment : req.body.preferred_investment,
  };

  try {
    // Find the startupDemand document by user_id
    const demand = await investorDemand.findOneAndUpdate(
      { user_ID: user_id },
      { $set: updateFields },
      { new: true } // Return the updated document
    );

    if (!demand) {
      return res.status(404).json({ error: 'Startup demand not found' });
    }

    return res.json(demand);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server Error' });
  }
});

investorRouter.get('/getAll', async (req,res) => {
  try {
    // Find all documents in the collection
    const documents = await investorDemand.find({});
    res.json(documents);
  } catch (err) {
    console.error('Error retrieving documents:', err);
    res.status(500).json({ error: 'Error retrieving documents' });
  }
}
)
export default investorRouter