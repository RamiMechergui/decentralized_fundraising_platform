import express from 'express';
const startupRouter = express.Router();
import User from "../models/User.js";
import fs from 'fs';
import startupDemand from '../models/StartupDemand.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

startupRouter.post('/depositdemand', async (req,res) => {
  const { authorization } = req.headers;
  const accessToken = authorization && authorization.split(' ')[1];
  const user = await User.findOne({ accessToken: accessToken });
  const new_Demand = new startupDemand({
        company_name: req.body.companyName,
        user_ID : user._id,
        company_email: req.body.companyEmail ,
        company_website:req.body.companyWebsite,
        country: req.body.country,
        state_of_funding: req.body.fundingState,
        activity_sector:req.body.activitySector,
        activity_description: req.body.businessDescription,
        pitch_video:'pitch_video' in req.files ? req.files.pitch_video.name : 'No file chosen',
        legal_status:'legal_status' in req.files ? req.files.legal_status.name : 'No file chosen',
        business_registration_number : 'business_registration_number' in req.files ? req.files.business_registration_number.name : 'No file chosen',
        member_name : req.body.memberName,
        member_occupation: req.body.memberOccupation,
        member_surname:req.body.memberSurname,
        member_cv: 'member_cv' in req.files ? req.files.member_cv.name : 'No file chosen',
        business_plan: 'business_plan' in req.files ? req.files.business_plan.name : 'No file chosen',
        market_analysis: 'market_analysis' in req.files ? req.files.market_analysis.name : 'No file chosen',
        balance_sheet: 'balance_sheet' in req.files ? req.files.balance_sheet.name : 'No file chosen',
        cash_flow_statement: 'cash_flow_statement' in req.files ? req.files.cash_flow_statement.name : 'No file chosen',
        equity_statement:'equity_statement' in req.files ? req.files.equity_statement.name : 'No file chosen',
        income_statement: 'income_statement' in req.files ? req.files.income_statement.name : 'No file chosen',
        additional_information: 'additional_information' in req.files ? req.files.additional_information.name : 'No file chosen'
  })
  try {
          const mainDirPath = `./startupDemands/Startup-${user._id}/`
          try {
              if (!fs.existsSync('./startupDemands')) {
              fs.mkdirSync('./startupDemands');
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

//Returns All Startup Demands
startupRouter.get('/getAll', async (req,res) => {
  try {
    // Find all documents in the collection
    const documents = await startupDemand.find({});
    res.json(documents);
  } catch (err) {
    console.error('Error retrieving documents:', err);
    res.status(500).json({ error: 'Error retrieving documents' });
  }
}
)

startupRouter.get('/mydemand', async (req,res) => {
  const { authorization } = req.headers;
  const accessToken = authorization && authorization.split(' ')[1];
  const user = await User.findOne({ accessToken: accessToken });
  try {
    const demand = await startupDemand.findOne({ user_ID: { $exists: true }, user_ID: user._id });

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

startupRouter.get('/demandowner', async (req,res) => {
  const { authorization } = req.headers;
  const accessToken = authorization && authorization.split(' ')[1];
  const user = await User.findOne({ accessToken: accessToken });
  return res.json(user);
}
)

startupRouter.put('/updateStatus', async (req, res) => {
  try {
    const { user_ID, newStatus } = req.body;
    console.log(user_ID)
    console.log(newStatus)
    // Find the startup demand by user_ID
    const updateFields = {
    Status: newStatus
    }

    const demand = await startupDemand.findOneAndUpdate(
      { user_ID : user_ID },
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

startupRouter.get('/document/download', async (req,res) => {
  const user_ID = req.query.user_ID;
  const FileName = req.query.FileName;
  const fileDir = path.join(__dirname, '..', 'startupDemands', `Startup-${user_ID}`);
  const filePath = path.join(fileDir, FileName);
  res.download(filePath);
}
)

startupRouter.get('/Update/download', async (req,res) => {
  const user_ID = req.query.user_ID;
  const FileName = req.query.FileName;
  const fileDir = path.join(__dirname, '..', 'startupDemands', `Startup-${user_ID}`);
  const filePath = path.join(fileDir, FileName);
  res.download(filePath);
}
)

startupRouter.put('/update/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  const updateFields = {
    company_name: req.body.company_name,
    company_email: req.body.company_email,
    company_website: req.body.company_website,
    country: req.body.country,
    state_of_funding: req.body.state_of_funding,
    activity_sector: req.body.activity_sector,
    activity_description: req.body.activity_description,
    member_name:req.body.member_name,
    member_surname:req.body.member_surname,
    member_occupation :req.body.member_occupation,
  };

  try {
    // Find the startupDemand document by user_id
    const demand = await startupDemand.findOneAndUpdate(
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
export default startupRouter