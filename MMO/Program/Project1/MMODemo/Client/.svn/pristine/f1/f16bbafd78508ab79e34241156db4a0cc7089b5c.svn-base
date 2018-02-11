using System.Collections.Generic;

public class CRecordDataParser
{
    static public Dictionary<string, CPlayerLastLoginInfo> Parse(string str)
    {
        string[] lines = str.Split('#');
        Dictionary<string, CPlayerLastLoginInfo> mLastLoginDic = new Dictionary<string, CPlayerLastLoginInfo>();
        for (int i = 0, max = lines.Length; i < max; i++)
        {
            string[] info = lines[i].Split('$');
            if (info.Length != 2)
            {
                continue;
            }
            CPlayerLastLoginInfo loginInfo = new CPlayerLastLoginInfo();

            // account info
            string tmpInfo = info[0];
            string[] cols = tmpInfo.Split('_');
            loginInfo.StrAccount = cols[0];
            loginInfo.StrPsw = cols[1];

            // server info
            tmpInfo = info[1];
            string[] svrInfoArray = tmpInfo.Split('&');
            for (int k = 0; k < svrInfoArray.Length; ++k)
            {
                tmpInfo = svrInfoArray[k];
                cols = tmpInfo.Split('_');

                CRecordServerItem svrItem = new CRecordServerItem();
                svrItem.mSvrName = cols[0];
                svrItem.mSvrId = int.Parse(cols[1]);
                svrItem.mAccessSvr = cols[2];
                svrItem.mRoleName = cols[3];
                svrItem.mRoleLv = int.Parse(cols[4]);

                loginInfo.AddRecord(svrItem);
            }
            mLastLoginDic[loginInfo.StrAccount] = loginInfo;
        }
        return mLastLoginDic;
    }
}
