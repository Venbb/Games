using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using ClientBase.Singleton;
using ClientNtModule;

public class GameData : XMonoSingleton<GameData> {
    public eAccountType accountType;
    public string mVersion = "v1.1.0";
    public bool mExamine = false;
    public bool mIsDebug = false;
    public string identifyCode = "";
    public int mReloginEnterDng = 0;
    public bool mShowUILoading = true;
    public bool mShowSvrList = true;
    public NtModule ntModule = null;
    public int getVersionNum(string version)
    {
        string[] val = version.Split('.');
        if (val.Length != 3)
            return -1;

        try
        {
            return int.Parse(val[0]) * 10000 + int.Parse(val[1]) * 100 + int.Parse(val[2]);
        }
        catch
        {
            return -1;
        }
    }
}
