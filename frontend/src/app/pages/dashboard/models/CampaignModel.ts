export interface CampaignModel {
    id: any;
    tokenName: string;
    tokenPrice: string;
    tokenSymbol: string;
    minInvest: string;
    maxInvest: string;
    startDate: string;
    endDate: string;
    remainTokens: string;
    yieldValue: string;
    campaignName:string;
    amount:string;
    actionType: string;
    shares:string;
    numberOfInvestors:string; 
    status:string;
    investorsCount:string;
    totalRaised:string;
    percentageofcompletation:string;
    timetocompletation:string;
    percentageoffinish:string;
    duration:string;
    motifRejection:string;
    rejectedBy:string;
    rejectDate:Date

  }