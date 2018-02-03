using ClientNet;
using ClientBase.Debuger;
using System.Collections.Generic;
using System;
using System.Text;

public class ProtocolEvent : IProtocolEvent
{
    public const int ProtocolHeaderSize = 1;
    private delegate void ProtocolHandler(byte[] data);
    private Dictionary<S2CProtocol, ProtocolHandler> mProtocols;

    public delegate void PPing();
    public delegate void PWaiting(int order);
    public delegate void PLogin(bool login, bool created, bool forbidden, string extraData, string sessionID);
    public delegate void PDayChanged();
    public event PPing OnPing;
    public event PWaiting OnWaiting;
    public event PLogin OnLogin;
    public event PDayChanged OnDayChanged;


    public ProtocolEvent()
    {
        mProtocols = new Dictionary<S2CProtocol, ProtocolHandler>();
        mProtocols[S2CProtocol.S2C_Ping] = new ProtocolHandler(onPing);
        mProtocols[S2CProtocol.S2C_Waiting] = new ProtocolHandler(onWaiting);
        mProtocols[S2CProtocol.S2C_Login] = new ProtocolHandler(onLogin);
        mProtocols[S2CProtocol.S2C_ReLogin] = new ProtocolHandler(onReLogin);
        mProtocols[S2CProtocol.S2C_DayChanged] = new ProtocolHandler(onDayChanged);
        mProtocols[S2CProtocol.S2C_Create] = new ProtocolHandler(onCreat);
    }
    public void OnEvent(byte[] byData)
    {
        S2CProtocol protocol = (S2CProtocol)byData[0];
        if (mProtocols.ContainsKey(protocol))
        {
            if (mProtocols[protocol] == null)
            {
                this.LogError("protocol func is null:" + protocol);
            }
            else
                mProtocols[protocol].Invoke(byData);
        }
    }
    private void onWaiting(byte[] data)
    {
        int offset = 1;
        int order = BitConverter.ToInt32(data, offset); offset += sizeof(int);
        if (OnWaiting != null)
            this.OnWaiting(order);
    }
    private void onPing(byte[] data)
    {
        this.OnPing();
    }
    private void onLogin(byte[] data)
    {
        int offset = ProtocolHeaderSize;
        int tmp = data[offset]; ++offset;
        bool login = false;
        bool forbidden = false;

        switch (tmp)
        {
            case 0:
                {
                    login = false;
                    forbidden = false;
                }
                break;
            case 1:
                {
                    login = true;
                    forbidden = false;
                }
                break;
            case 2:
                {
                    login = false;
                    forbidden = true;
                }
                break;
        }

        bool created = (data[offset] == 1); ++offset;
        int extraDataLength = BitConverter.ToInt32(data, offset); offset += sizeof(int);
        int sessionIDLength = BitConverter.ToInt32(data, offset); offset += sizeof(int);
        string extraData = "";
        string sessionID = "";

        if (extraDataLength > 0)
        {
            extraData = Encoding.UTF8.GetString(data, offset, extraDataLength); offset += extraDataLength;
        }

        if (sessionIDLength > 0)
        {
            sessionID = Encoding.UTF8.GetString(data, offset, sessionIDLength); offset += sessionIDLength;
        }

        if (OnLogin != null)
        {
            this.OnLogin(login, created, forbidden, extraData, sessionID);
        }
    }
    private void onReLogin(byte[] data)
    {

    }
    private void onDayChanged(byte[] data)
    {
        if (OnDayChanged != null)
            OnDayChanged();
    }
    private void onCreat(byte[] data)
    {
		int offset = 1;
		byte type = data[offset]; ++offset;
		if (type == 1 )
		{
			if (GameData.Instance.ntModule != null)
			{
				GameData.Instance.ntModule.roleCreated(SeverListManager.Instance.mCurServerInfo.nSvrId);
			}
		}
    }
}
