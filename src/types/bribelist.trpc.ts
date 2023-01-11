export interface SingleOffer {
  usdPer1000Vp: number;
  rewardAmount: number;
  percent: number;
  votes: number;
  usdPerVp: number;
  label: string;
  underminimum: boolean;
}

export interface BribeHeader {
  roundName: string;
  voteStart: string;
  voteEnd: string;
  timeRemaining: string;
  totalVotes: number;
  bribedVotes: number;
  totalVoter: number;
  bribedVoter: number;
  totalBribes: number;
  avgPer1000: number;
}

export interface BribeOffer extends SingleOffer {
  voteindex: number;
  poolname: string;
  poolurl: string;
  rewarddescription: string;
  assumption?: string;
}

export interface BribeData {
  header: BribeHeader;
  bribelist: BribeOffer[];
}
