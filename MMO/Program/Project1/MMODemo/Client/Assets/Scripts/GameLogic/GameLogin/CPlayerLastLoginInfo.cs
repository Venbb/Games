using System.Collections.Generic;
public class CPlayerLastLoginInfo
{
    private string mStrAccount;
    private string mStrPsw = null;
    public List<CRecordServerItem> mLocalSvrLst;

    public string StrAccount
    {
        get
        {
            return mStrAccount;
        }
        set
        {
            mStrAccount = value;
        }
    }
    public string StrPsw
    {
        get
        {
            return StrPsw;
        }
        set
        {
            StrPsw = value;
        }
    }

    public CPlayerLastLoginInfo()
    {
        mLocalSvrLst = new List<CRecordServerItem>();
    }
    public void AddRecord(CRecordServerItem item)
    {
        mLocalSvrLst.Add(item);
    }
    public CRecordServerItem GetRecordList(int idx)
    {
        if (mLocalSvrLst.Count > 0)
        {
            return mLocalSvrLst[0];
        }
        return null;
    }
    public int GetRecordIdx(int svrId)
    {
        for (int i = 0; i < mLocalSvrLst.Count; ++i)
        {
            if (mLocalSvrLst[i].mSvrId == svrId)
            {
                return i;
            }
        }
        return -1;
    }
    public string FormatString()
    {
        string ret = string.Format("{0}_{1}$", mStrAccount, mStrPsw);
        for (int i = 0; i < mLocalSvrLst.Count; ++i)
        {
            CRecordServerItem item = mLocalSvrLst[i];
            ret += string.Format("{0}_{1}_{2}_{3}_{4}", item.mSvrName, item.mSvrId, item.mAccessSvr, item.mRoleName, item.mRoleLv);
            if (i + 1 != mLocalSvrLst.Count)
                ret += '&';
        }
        return ret;
    }
}

