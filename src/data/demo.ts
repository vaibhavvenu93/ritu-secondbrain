import {Agent,AttentionItem,Metric} from "@/domain/types";
export const metrics:Metric[]=[
{id:"revenue",label:"Revenue MTD",value:"₹38.6 Cr",plan:"₹36.2 Cr",delta:"+6.6%",health:"good",note:"UP and premium nutrition are ahead of plan.",provenance:"illustrative"},
{id:"ebitda",label:"EBITDA",value:"11.8%",plan:"12.6%",delta:"-0.8 pp",health:"watch",note:"Input costs and Bihar discounting explain most variance.",provenance:"illustrative"},
{id:"production",label:"Production",value:"18,420 MT",plan:"18,050 MT",delta:"+2.0%",health:"good",note:"Amethi recovered after last week's interruption.",provenance:"illustrative"},
{id:"inventory",label:"Inventory",value:"23 days",plan:"21 days",delta:"+2 days",health:"watch",note:"Finished-goods inventory is elevated in two territories.",provenance:"illustrative"},
{id:"collections",label:"Collections",value:"₹31.4 Cr",plan:"₹32.1 Cr",delta:"-2.2%",health:"watch",note:"Three distributors crossed the escalation threshold.",provenance:"illustrative"},
{id:"cash",label:"Cash position",value:"₹16.8 Cr",plan:"₹15.5 Cr",delta:"+8.4%",health:"good",note:"Liquidity remains healthy.",provenance:"illustrative"}];
export const attention:AttentionItem[]=[
{id:"d1",kind:"decision",title:"Bihar discount guardrail",summary:"Commercial wants flexibility on two distributor programs. Current proposal protects volume but compresses contribution.",impact:"₹41L margin exposure",owner:"Commercial",health:"watch",provenance:"illustrative"},
{id:"r1",kind:"risk",title:"Soymeal cost pressure",summary:"30-day market movement is flowing into open procurement requirements and premium SKU economics.",impact:"₹92L modelled exposure",owner:"Procurement",health:"risk",provenance:"illustrative"},
{id:"o1",kind:"opportunity",title:"Working-capital release",summary:"Inventory rebalancing across territories may release cash without reducing service levels.",impact:"₹1.2Cr opportunity",owner:"Finance + Supply",health:"good",provenance:"illustrative"},
{id:"c1",kind:"commitment",title:"Inventory review due today",summary:"Leadership commitment from the previous operating review is due for closure.",impact:"Due today",owner:"Finance",health:"watch",provenance:"illustrative"}];
export const agents:Agent[]=[
{id:"finance",name:"Finance",scope:"P&L · EBITDA · cash · working capital",status:"ready"},
{id:"commercial",name:"Commercial",scope:"states · distributors · retailers · SKUs",status:"ready"},
{id:"plant",name:"Plant",scope:"production · quality · downtime · cost/MT",status:"ready"},
{id:"supply",name:"Supply",scope:"procurement · inventory · logistics",status:"ready"},
{id:"people",name:"People",scope:"owners · goals · commitments · capacity",status:"ready"},
{id:"market",name:"Market",scope:"commodities · competitors · policy · opportunity",status:"ready"},
{id:"memory",name:"MD Memory",scope:"decisions · meetings · assumptions · history",status:"ready"}];
