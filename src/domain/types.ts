export type Provenance="verified"|"derived"|"illustrative";
export type Health="good"|"watch"|"risk";
export interface Metric{id:string;label:string;value:string;plan:string;delta:string;health:Health;note:string;provenance:Provenance}
export interface AttentionItem{id:string;kind:"decision"|"risk"|"opportunity"|"commitment";title:string;summary:string;impact:string;owner:string;health:Health;provenance:Provenance}
export interface Agent{id:string;name:string;scope:string;status:"ready"|"working";}
