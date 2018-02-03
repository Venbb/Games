using UnityEngine;
using ClientBase.Debuger;
public class HttptLogin
{
    public WWW mWww = null;
    public void AccountLogin(eAccountType accountType, string uri, string username, string password)
    {
        this.internalHttpLogin(uri, username, password);
    }
    private void internalHttpLogin(string uri, string username, string password)
    {
        mWww = new WWW(uri + "loginex?username=" + username + "&password=" + password);
    }

    public eHttpLoginResult IsHttpLoginOver()
    {
        if (mWww != null)
        {
            if (mWww.error != null)
            {
                this.LogWarning("login failed! " + mWww.error);
                mWww = null;
                return eHttpLoginResult.error_net;
            }

            if (mWww.isDone)
            {
                string identifyCode = mWww.text;

                if (identifyCode == "")
                {
                    int index = mWww.url.IndexOf("password=");
                    string info = index == -1 ? mWww.url : mWww.url.Substring(0, index);
                    this.LogError("HttpLogin return error_account!\n" + info);
                    return eHttpLoginResult.error_account;
                }
                mWww = null;
                GameData.Instance.identifyCode = identifyCode;
                return eHttpLoginResult.ok;
            }
        }
        return eHttpLoginResult.none;
    }
}
