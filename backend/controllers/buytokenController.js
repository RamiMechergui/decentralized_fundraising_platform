import Buytoken from "../models/Buytoken.js";
import Token from "../models/Token.js";
// import abi from './utils/abi.json' assert { type: 'json' };
import User from "../models/User.js";
import Web3 from 'web3';
import express from 'express';
import {sendEmail} from "../utils/sendEmails.js";

import Feedback from "../models/Feedback.js";


import dotenv from "dotenv";
const web3 =new Web3(new Web3.providers.HttpProvider("http://blockchain.docker.local"));
const tokenoppRib = process.env.RIB;
const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_symbol",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_totalSupply",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_tokenPrice",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_companyWallet",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_thirdPartyWallet",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_campaignStartDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_campaignEndDate",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_RedemptionType",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_yield",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_actionType",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "investor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "DividendPaid",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "investor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "InterestPaid",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Paused",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "investor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "RevenueDistributed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Unpaused",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "RedemptionType",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "actionType",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "companyWallet",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "debtBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_revenue",
				"type": "uint256"
			}
		],
		"name": "distributeRevenueMonthly",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_revenue",
				"type": "uint256"
			}
		],
		"name": "distributeRevenueQuarterly",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_revenue",
				"type": "uint256"
			}
		],
		"name": "distributeRevenueYearly",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "dividendBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endDate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMaxInvest",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMinInvest",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "investor",
				"type": "address"
			}
		],
		"name": "investorBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "investorsCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isInvestor",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "payDividendMonthly",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "payDividendQuarterly",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "payDividendYearly",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "interestRatio",
				"type": "uint256"
			}
		],
		"name": "payInterestMonthly",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "interestRatio",
				"type": "uint256"
			}
		],
		"name": "payInterestQuarterly",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "interestRatio",
				"type": "uint256"
			}
		],
		"name": "payInterestYearly",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "revenueShare",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "addresses",
				"type": "address[]"
			},
			{
				"internalType": "bool",
				"name": "hasVotingRights",
				"type": "bool"
			}
		],
		"name": "setVotingRights",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startDate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "thirdPartyWallet",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenSymbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenTotalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "votingRights",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "yield",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];






export const buytoken = async (req, res) => {
    try{
    const { name, email, phoneNumber, quantity, paymentMethod, tokenName} = req.body;
    const BuyToken = await Buytoken.create({
        name,
        email,
        phoneNumber,
        quantity,
        paymentMethod,
        tokenName
    })
    res.status(200).json(BuyToken);
}

    catch (error) {
        console.error(error);
        res.status(500).send('Error submitting data');

}}

export const buytokens = async (req, res) => {
    try{
    const {quantity, paymentMethod, tokenName} = req.body;
	const buyer = await User.findById(req.user._id);

const token = await Token.findOne({tokenName:tokenName})

    const BuyToken = await Buytoken.create({
        name:buyer.userName,
        email:buyer.email,
        phoneNumber:buyer.phone,
		rib:buyer.rib,
        quantity,
        paymentMethod,
        tokenName,
		amount:(token.tokenPrice * quantity)

	    })
	sendEmail(buyer.email,buyer.userName, 'Demand for purchase Tokens', `<h3>Hello Mr/Mrs ${buyer.firstName} ${buyer.lastName}</h3> <p>We receive your demand for purchase ${BuyToken.quantity} tokens of ${BuyToken.tokenName}</p> <p> We want to inform you that for finalize the purchase of tokens you have to send this amount of money ${BuyToken.amount} to our rib ${tokenoppRib} </p> <p> Cordially</p>`);

    res.status(200).json(BuyToken);
}

    catch (error) {
        console.error(error);
        res.status(500).send('Error submitting data');

}}



export const alldemand = async(req,res) =>{
    try{
        const demands = await Buytoken.find();
        const demandData = demands.map(demand => ({
            id:demand.id,
			_id:demand._id,
            name:demand.name,
            email:demand.email,
            phoneNumber:demand.phoneNumber,
            quantity:demand.quantity,
			rib:demand.rib,
            paymentMethod:demand.paymentMethod,
            tokenName:demand.tokenName,
            status:demand.status,
			amount:demand.amount

          }));
          res.json(demandData);
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
}


export const transfer = async(req,res) =>{

    try{
        const {id} = req.params;
        const tokenopp = await User.findById(req.user._id);
        const demand = await Buytoken.findById(id);
        const token = await Token.findOne({tokenName:demand.tokenName});
        const buyer = await User.findOne({email:demand.email});
        const from = tokenopp.address ;
        const to = buyer.address;
        const amount = demand.quantity;




        if (demand.status==='pending'){

            const tokenContract = new web3.eth.Contract(abi, token.contractAddress);



            if (token.remainToken>demand.quantity){
            const transfer = await tokenContract.methods.transfer(to,amount).send({from:from});
            token.remainToken = (token.remainToken - amount);
            token.maxInvest = (token.remainToken * token.tokenPrice);
            token.transactionHash.push(transfer.transactionHash);
            await Token.findOneAndUpdate(token._id,token);
            demand.status='accepted';
            await Buytoken.findOneAndUpdate(demand._id ,demand);
			res.status(200).json(demand.status);
		}
            else {
                res.status(400).send('fail not enough remain tokens');
            };
		}
        else {
        demand.status='rejected';
        await Buytoken.findOneAndUpdate(demand._id ,demand);
		res.status(200).json(demand.status);

       }


    } catch (error) {
        res.status(400).json({error:'Internal Error'});
    }
}

export const accepttransfer = async(req,res) =>{
	const {id} = req.params;
	const tokenopp = await User.findById(req.user._id);
	const demand = await Buytoken.findById(id);
	const token = await Token.findOne({tokenName:demand.tokenName});
	const buyer = await User.findOne({email:demand.email});
	const from = tokenopp.address ;
	const to = buyer.address;
	const amount = demand.quantity;


	try{

        if (demand.status==='pending'){

            const tokenContract = new web3.eth.Contract(abi, token.contractAddress);

            // if (token.remainToken>demand.quantity){

            const transfer = await tokenContract.methods.transfer(to,amount).send({from:from});
            token.remainToken = (token.remainToken - amount);
            token.maxInvest = (token.remainToken * token.tokenPrice);
            token.transactionHash.push(transfer.transactionHash);

			token.investorCount= (token.investorCount +1);
            await Token.findOneAndUpdate(token._id,token);
            demand.status='accepted';
			const createdAt = new Date();
			demand.Date=createdAt;
            await Buytoken.findOneAndUpdate(demand._id ,demand);
			res.status(200).json(demand.status);
		// }
        //     else {
        //         res.status(400).send('fail not enough remain tokens');
        //     };

		}
        else {
        demand.status='rejected';
        await Buytoken.findOneAndUpdate(demand._id ,demand);
		res.status(200).json(demand.status);

       }


    } catch (error) {
        res.status(400).json({error:'Internal Error'});
    }

}

export const allbuytoken= async (req, res) => {
		const { authorization } = req.headers;
		const accessToken = authorization && authorization.split(' ')[1];  
		try {
	  
	  const user = await User.findOne({ accessToken: accessToken }); 

	  const tokens = await Token.findOne({companyAccount:user.address});
	  const buytokens = await Buytoken.find({tokenName:tokens.tokenName  ,status:'accepted'});
  
	  // Map the tokens to a new array containing only the necessary information
	  const tokenData = buytokens.map(token => ({
		name:token.name,
		amount:token.amount,
		quantity: token.quantity,
		Date:token.Date
	  }));
  
	  res.json(tokenData);
	} catch (error) {
	  console.error('Error retrieving token details:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  };
    
//   export const rejectTransfer = async (req,res)=>{
//     try {
//         const {id} = req.params;
// 		const demand = await Buytoken.findById(id);
//         if (demand.status === 'pending') {
//             await Buytoken.findByIdAndUpdate(id,{status:"rejected"}, { new: true });
//             res.send("Buy Token had been rejected");
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

export const rejectTransfer = async (req, res) => {
    const {motifRejection} = req.body;

    try {
        const tokenId = req.params.id;
        const rejectDate = new Date();
		const demand = await Buytoken.findById(tokenId);
        const tokenopp = await User.findById(req.user._id);
        const tokenUpdate ={
          status:"rejected",
          rejectDate:rejectDate,
          rejectedBy:tokenopp.userName,
          motifRejection:motifRejection

      }

        const updatedToken = await Buytoken.findByIdAndUpdate(tokenId, tokenUpdate, { new: true });
    
          res.json(updatedToken);

      } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
      }
  };
  export const getBuyTokenById = async (req,res) => {
    const { id } = req.params;
	const buytoken = await Buytoken.findById(id);
    if (buytoken) {
      res.json(buytoken);
    } else {
      res.status(404).send({ message: "buy token demand Not Found" });
    }
}
export const rejectionDetails= async(req,res)=>{
	try{
		const company = await User.findById(req.user._id);
		
		const companyAccount = company.email;
  
		const rejectionData = await Buytoken.find({email:companyAccount,status:'rejected'});
		res.status(200).json(rejectionData);
  
	
	} catch (error) {
		  console.error('Error retrieving campaign details:', error);
		  res.status(500).json({ error: 'Internal Server Error' });
		}
	  };

	  export const addFeedback= async(req,res)=>{
		const {subject,message,name} = req.body;
  
		try{
		  const user = await User.findById(req.user._id);
		  const tokens = await Buytoken.findOne({ email: user.email });
  
		  const feedback ={
		  name:user.userName,
		  email:user.email,
		  subject:subject,
		  message:message,
		  usernameofrejector:name,
		  tokenName:tokens.tokenName
		}
  
		const newfeedback = await Feedback.create(feedback);
		res.json(newfeedback);
		}
		catch (error) {
		  console.error('Error saving feedback :', error);
		  res.status(500).json({ error: 'Internal Server Error' });
		}
	  }



