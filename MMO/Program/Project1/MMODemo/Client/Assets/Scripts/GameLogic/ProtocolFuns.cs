using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ClientBase.Debuger;
using UnityEngine;

public class ProtocolFuns
{
    public static void GameLoginPro(string deviceDes)
    {
        try
        {
            byte[] identifyCodeData = Encoding.UTF8.GetBytes(GameData.Instance.identifyCode);
            byte[] deviceDescription = Encoding.UTF8.GetBytes(deviceDes);
            int identifyCodeDataLength = identifyCodeData.Length;
            int deviceDescriptionLength = deviceDescription.Length;
            byte[] protocol = new byte[1 + 1 + 1 + 4 + 4 + 4 + identifyCodeDataLength + deviceDescriptionLength];
            int offset = 0;
            protocol[offset] = (byte)C2SProtocol.C2S_Login; ++offset;
            protocol[offset] = (byte)GameData.Instance.accountType; ++offset;
            protocol[offset] = (byte)(AccountTypeConvertor.convertDeviceType(Application.platform)); ++offset;
            Array.Copy(BitConverter.GetBytes(SeverListManager.Instance.mCurServerInfo.nSvrId), 0, protocol, offset, sizeof(int)); offset += sizeof(int);
            Array.Copy(BitConverter.GetBytes(identifyCodeDataLength), 0, protocol, offset, sizeof(int)); offset += sizeof(int);
            Array.Copy(BitConverter.GetBytes(deviceDescriptionLength), 0, protocol, offset, sizeof(int)); offset += sizeof(int);
            Array.Copy(identifyCodeData, 0, protocol, offset, identifyCodeDataLength); offset += identifyCodeDataLength;
            Array.Copy(deviceDescription, 0, protocol, offset, deviceDescriptionLength); offset += deviceDescriptionLength;
            GameClient.Instance.MyNetWorkMgr.SendData(protocol);
        }
        catch (System.Exception err)
        {
            Debuger.Log(err.ToString());
        }
    }
    public static void StartReloginPro()
    {
        try
        {
            byte[] sessionIDData = Encoding.UTF8.GetBytes(GameData.Instance.identifyCode);
            byte[] protocol = new byte[1 + 40];
            int offset = 0;
            protocol[offset] = (byte)C2SProtocol.C2S_ReLogin; offset++;
            Array.Copy(sessionIDData, 0, protocol, offset, sessionIDData.Length > 39 ? 39 : sessionIDData.Length); offset += 39;
            protocol[offset] = (byte)0; offset++;
            GameClient.Instance.MyNetWorkMgr.SendData(protocol);
        }
        catch (Exception err)
        {
            Debuger.Log(err.ToString());
        }
    }
    public static void CreateRole(string rolename, byte nJob, byte icon)
    {
        if (rolename != "")
        {
            byte[] protocol = new byte[64 + 1 + 1 + 1];
            byte[] roleNameData = Encoding.UTF8.GetBytes(rolename);
            protocol[0] = (byte)C2SProtocol.C2S_Create;

            Array.Copy(roleNameData, 0, protocol, 1, roleNameData.Length);
            protocol[65] = nJob;
            protocol[66] = icon;
            GameClient.Instance.MyNetWorkMgr.SendData(protocol);
        }
        else
        {

        }
    }
}
