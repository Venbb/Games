
using UnityEngine;

public enum ClientDeviceType
{
    CDT_Unknown = 0,
    CDT_IOS,
    CDT_Android,
    CDT_Windows,
    CDT_MacOS,
};
public class AccountTypeConvertor
{
    public static ClientDeviceType convertDeviceType(RuntimePlatform platform)
    {
        switch (platform)
        {
            case RuntimePlatform.OSXEditor:
            case RuntimePlatform.OSXPlayer:
            case RuntimePlatform.OSXDashboardPlayer:
                return ClientDeviceType.CDT_MacOS;
            case RuntimePlatform.WindowsEditor:
            case RuntimePlatform.WindowsPlayer:
                return ClientDeviceType.CDT_Windows;
            case RuntimePlatform.IPhonePlayer:
                return ClientDeviceType.CDT_IOS;
            case RuntimePlatform.Android:
                return ClientDeviceType.CDT_Android;
            default:
                return ClientDeviceType.CDT_Unknown;
        }
    }
}
