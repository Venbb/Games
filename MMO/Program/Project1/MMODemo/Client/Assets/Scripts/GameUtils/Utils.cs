using System.IO;
using ClientBase.Debuger;
using UnityEngine;
using UnityEngine.UI;

public class Utils {

    public static byte[] ReadFile(string path)
    {
#if UNITY_WEBPLAYER
		return null;
#endif
        if (!File.Exists(path))
            return null;

        try
        {
            FileStream fs = new FileStream(path, FileMode.Open, FileAccess.Read);
            byte[] thebytes = new byte[(int)fs.Length];
            fs.Read(thebytes, 0, (int)fs.Length);
            fs.Close();
            return thebytes;
        }
        catch (System.IO.IOException e)
        {
            Debuger.Log(string.Format("Read file : {0} occur some error. log : {1}", path, e.StackTrace));
            return null;
        }
    }



}
