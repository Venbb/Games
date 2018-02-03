using System.Collections;
using System.Collections.Generic;

public class ServerInfo {
    public int nSvrId; //用于登陆的id
    public string sName;
    public string sServerIp;
    public int nServerPort;
    public string sAccServer;
    public bool bOpen;
    public eServerState eState;
#if UNITY_WEBPLAYER
	public string mResUrl;
#endif
    public string verInfo;
    public ushort nSvrIdx;
    public int nNewSvrId;

    public ServerInfo()
    {
    }
    public ServerInfo(string[] cols)
    {
        nSvrId = int.Parse(cols[0]);
        sName = cols[1];
        sServerIp = cols[2];
        nServerPort = 0;
        int.TryParse((cols[3]), out nServerPort);
        sAccServer = cols[4];
        bOpen = cols[5] == "1" ? true : false;

        int nServerState = 0;
        if (int.TryParse(cols[6], out nServerState))
        {
            eState = (eServerState)nServerState;
        }
        else
        {
            eState = eServerState.Server_State_Good;
        }

#if UNITY_WEBPLAYER
		if ( cols.Length >= 6)
		{
			mResUrl = cols[7];
		}
#endif
        if (cols.Length >= 9)
        {
            verInfo = cols[8];
            nSvrIdx = ushort.Parse(cols[9]);
        }
        else
        {
            verInfo = string.Empty;
            nSvrIdx = 1;
        }

        if (cols.Length >= 11)
        {
            int.TryParse(cols[10], out nNewSvrId);
        }

        if (nNewSvrId > 0)
        {
            int id = nSvrId;
            nSvrId = nNewSvrId;
            nNewSvrId = id;
        }
        else
        {
            nNewSvrId = nSvrId;
        }
    }
}
