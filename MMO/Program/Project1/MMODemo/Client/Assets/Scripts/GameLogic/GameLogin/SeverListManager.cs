using System.Collections.Generic;
using ClientBase.Singleton;
using ClientBase.Debuger;
using System.IO;
using UnityEngine;
using ClientBase.TableFile;
using ClientBase.Localization;
public class SeverListManager: Singleton<SeverListManager>
{
    public string mhttpUrl;
    public string mhttpUrlBak;
    public string mServerListPath;
    public string mPermissionPath;
    public int mServerLstIdx = 0;
    public eServerListStep mStep;
    public Dictionary<int, ServerInfo> mServerInfoLst = null;
    public Dictionary<string, CPlayerLastLoginInfo> mLastLoginDic = null;
    public CPlayerLastLoginInfo mLastLoginInfo = null;
    public List<int> mSeverRank = null;
    public Dictionary<int, List<int>> mSeverDict = null;    //服务器列表ID，服务器列表
    public ServerInfo mCurServerInfo = null;
    private string mServerLstUrl;
    private bool bUseBakAddress = false;
    public string mSaveFilePath;
    public WWW mWwwServerLst = null;
    private float mNextGetTime = 0;

    public void GetServerListUrl()
    {
        if (mServerInfoLst != null)
        {
            mStep = eServerListStep.s_over;
            return;
        }
        bUseBakAddress = false;
        mServerLstUrl = "http://" + mhttpUrl + mServerListPath;
        this.Log(mServerLstUrl);
        mStep = eServerListStep.s_get_url;
    }
    public bool ReadLastLoginInfo()
    {
#if !UNITY_WEBPLAYER
        if (File.Exists(mSaveFilePath))
        {
            byte[] data = Utils.ReadFile(mSaveFilePath);
            string utf8_str = System.Text.Encoding.UTF8.GetString(data);
            mLastLoginDic = CRecordDataParser.Parse(utf8_str);
            if (null == mLastLoginDic)
            {
                this.LogWarning("config file error~!");
                mLastLoginDic = null;
                return false;
            }
            string account = GameClient.Instance.MyGameLogin.MyAccount;

            if (mLastLoginDic.ContainsKey(account))
            {
                mLastLoginInfo = mLastLoginDic[account];
                if (mLastLoginInfo.StrPsw.Equals(GameClient.Instance.MyGameLogin.MyPassword))
                {
                    SetCurSvrInfo();
                    SetRecordSever();
                    mStep = eServerListStep.s_over;
                    return true;
                }
            }
        }
#endif
        return false;
    }
    private void SetRecordSever()
    {

        for (int i = 0; i < mLastLoginInfo.mLocalSvrLst.Count; i++)
        {
            if (mSeverDict.ContainsKey(GlobalConfig.Instance.ownindex))
            {
                mSeverDict[GlobalConfig.Instance.ownindex].Add(mLastLoginInfo.mLocalSvrLst[i].mSvrId);
            }
            else
            {
                List<int> temp = new List<int>
                {
                    mLastLoginInfo.mLocalSvrLst[i].mSvrId
                };
                mSeverDict.Add(GlobalConfig.Instance.ownindex, temp);
            }
        }

    }
    private void SetCurSvrInfo()
    {
        GameClient.Instance.MyGameLogin.MyAccount = mLastLoginInfo.StrAccount;
        GameClient.Instance.MyGameLogin.MyPassword = mLastLoginInfo.StrPsw;

        CRecordServerItem severInfo = mLastLoginInfo.GetRecordList(0);
        if (severInfo == null)
        {
            this.Log(XLanguage.Instance.GetSting(100003));
            return;
        }
        mCurServerInfo.nSvrId = severInfo.mSvrId;
        mCurServerInfo.sName = severInfo.mSvrName;
        mCurServerInfo.sServerIp = severInfo.mSvrIp;
        mCurServerInfo.nServerPort = severInfo.mSvrPort;
        mCurServerInfo.sAccServer = severInfo.mAccessSvr;
        if (mServerInfoLst != null && mServerInfoLst.ContainsKey(mCurServerInfo.nSvrId))
        {
            mCurServerInfo.nNewSvrId = mServerInfoLst[mCurServerInfo.nSvrId].nNewSvrId;
        }
        else
        {
            mCurServerInfo.nNewSvrId = severInfo.mSvrId;
        }
    }
    public void SetRecommendServer()
    {
        if (mServerInfoLst == null)
            return;
        mCurServerInfo = mServerInfoLst[mServerLstIdx];
    }
    private string RandomUrl(string url)
    {
        return string.Format("{0}?rand={1}", url, UnityEngine.Random.value.ToString());
    }
    public void SetServerLst(string txt)
    {
        mServerInfoLst = new Dictionary<int, ServerInfo>();
        mSeverRank = new List<int>();
        mSeverDict = new Dictionary<int, List<int>>();
        TableFile file = new TableFile("serverlst");
        List<string[]> lines = file.AnalyzeString(txt);
        lines.RemoveAt(0);
        int id = 0;
        int idx = 0;
        foreach (string[] cols in lines)
        {
            ServerInfo info = new ServerInfo(cols);
            mServerInfoLst[info.nSvrId] = info;
            if (id == 0)
                id = info.nSvrId;
            idx = info.nSvrId / 10;
            if (!mSeverRank.Contains(idx))
            {
                mSeverRank.Add(idx);
            }
            if (info.eState == eServerState.Server_State_Recommend)
            {
                if (mSeverDict.ContainsKey(GlobalConfig.Instance.recommendindex))
                {
                    mSeverDict[GlobalConfig.Instance.recommendindex].Add(id);
                }
                else
                {
                    List<int> temp = new List<int>
                {
                    id
                };
                    mSeverDict.Add(GlobalConfig.Instance.recommendindex, temp);
                }
            }
            if (mSeverDict.ContainsKey(idx))
            {
                mSeverDict[idx].Add(id);
            }
            else
            {
                List<int> temp = new List<int>
                {
                    id
                };
                mSeverDict.Add(idx, temp);
            }
        }
        mSeverRank.Add(GlobalConfig.Instance.recommendindex);
        mSeverRank.Add(GlobalConfig.Instance.ownindex);
        mSeverRank.Reverse();
        if (!mServerInfoLst.ContainsKey(mServerLstIdx))
            mServerLstIdx = id;
        InitCurSvrInfo();

    }
    public void InitCurSvrInfo()
    {
        mCurServerInfo = new ServerInfo();
        mCurServerInfo.nSvrId = mServerInfoLst[mServerLstIdx].nSvrId;
        mCurServerInfo.sName = mServerInfoLst[mServerLstIdx].sName;
        mCurServerInfo.sServerIp = mServerInfoLst[mServerLstIdx].sServerIp;
        mCurServerInfo.nServerPort = mServerInfoLst[mServerLstIdx].nServerPort;
        mCurServerInfo.sAccServer = mServerInfoLst[mServerLstIdx].sAccServer;
    }
    public void FixedUpdate()
    {
        if (mStep == eServerListStep.s_get_url)
        {
            if (mWwwServerLst == null)
                mWwwServerLst = new WWW(RandomUrl(mServerLstUrl));

            if (mWwwServerLst != null && mWwwServerLst.error != null)
            {
                if (bUseBakAddress)
                {
                    mWwwServerLst = null;
                    mNextGetTime = 6;
                    mStep = eServerListStep.s_error;
                    bUseBakAddress = false;
                    return;
                }

                bUseBakAddress = true;
                mServerLstUrl = mServerLstUrl.Replace(mhttpUrl, mhttpUrlBak);
                mWwwServerLst = new WWW(RandomUrl(mServerLstUrl));
                return;
            }

            if (mWwwServerLst.isDone)
            {
                SetServerLst(mWwwServerLst.text);
                mStep = eServerListStep.s_over;
            }
        }
        else if (mStep == eServerListStep.s_error)
        {
            this.LogWarning(XLanguage.Instance.GetSting(100002));

            mNextGetTime -= Time.deltaTime;
            if (mNextGetTime <= 0)
            {
#if UNITY_IPHONE && UNITY_ANDROID
				Application.Quit();
#else
                GetServerListUrl();
#endif
            }
        }
    }

}
