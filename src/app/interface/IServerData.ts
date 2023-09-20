export interface IServerData {
  serverName?: string;
  serverType?: string;
  serverLocation?: string;
  serverOrgUnit?: string;
  serverInventNum?: string;
  serverTag: string[];
  serverDateCreate: Date;
  serverDateUpd: Date;
  serverDateAudit?: Date;
}
