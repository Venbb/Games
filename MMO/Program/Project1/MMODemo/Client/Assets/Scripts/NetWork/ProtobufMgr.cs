using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using ClientBase.Singleton;
using ProtoBuf;
using System.IO;

public class ProtobufMgr : Singleton<ProtobufMgr> {
    private byte[] CreateData(int typeId, IExtensible pbuf)
    {
        byte[] pbdata = ProtobufPack.Serialize(pbuf);
        ByteBuffer buff = new ByteBuffer();
        buff.WriteInt(typeId);
        buff.WriteBytes(pbdata);
        return WriteMessage(buff.ToBytes());
    }
    /// <summary>  
    /// 数据转换，网络发送需要两部分数据，一是数据长度，二是主体数据  
    /// </summary>  
    /// <param name="message"></param>  
    /// <returns></returns>  
    private byte[] WriteMessage(byte[] message)
    {
        MemoryStream ms = null;
        using (ms = new MemoryStream())
        {
            ms.Position = 0;
            BinaryWriter writer = new BinaryWriter(ms);
            ushort msglen = (ushort)message.Length;
            writer.Write(msglen);
            writer.Write(message);
            writer.Flush();
            return ms.ToArray();
        }
    }
}
