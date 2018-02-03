
public class CRecordServerItem
{
    public int mSvrId;
    public string mSvrName;
    public string mSvrIp;
    public int mSvrPort;
    public string mAccessSvr;
    public int mRoleLv;
    public string mRoleName;

    public void SetData(ServerInfo info)
    {
        mSvrName = info.sName;
        mSvrIp = info.sServerIp;
        mSvrPort = info.nServerPort;
        mAccessSvr = info.sAccServer;
        mSvrId = info.nSvrId;
    }
}
