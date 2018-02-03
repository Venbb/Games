using System.Collections;
using System.Collections.Generic;
using UnityEngine;
namespace UMA
{
    public class HumanoidDnaConverterBehaviour : DnaConverterBehaviour
    {
        static bool builtHashes = false;
        static protected int shullAdjustHash;           //前额
        static protected int cheek_lAdjustHash;         //苹果机
        static protected int cheek_rAdjustHash;         //苹果机
        static protected int cheek_02_lAdjustHash;      //脸颊
        static protected int chin_02_rAdjustHash;       //下颚
        static protected int chin_03_rAdjustHash;       //下颚角
        static protected int chinAdjustHash;            //下巴
        static protected int cheekbone_rAdjustHash;     //颧骨
        static protected int brow_rAdjustHash;          //眉毛
        static protected int tailbrow_rAdjustHash;      //眉毛尾
        static protected int canthus_rAdjustHash;       //内眼角
        static protected int endeye_rAdjustHash;        //外眼角
        static protected int eyeAdjustHash;             //眼整体
        static protected int upeye_rAdjustHash;         //上眼皮
        static protected int loweye_rAdjustHash;        //下眼皮
        static protected int noseAdjustHash;            //鼻整体
        static protected int tipnoseAdjustHash;         //鼻头
        static protected int nose_upAdjustHash;         //鼻梁
        static protected int nasalnoseAdjustHash;       //鼻基底
        static protected int nosewing_rAdjustHash;      //鼻翼
        static protected int mouthAdjustHash;           //嘴整体
        static protected int lipmouthAdjustHash;        //嘴角
        static protected int upmouthAdjustHash;         //上嘴皮
        static protected int lowmouthAdjustHash;        //下嘴皮
        public override void Prepare()
        {
            if (builtHashes)
                return;
            shullAdjustHash = UMAUtils.StringToHash("shull");
            cheek_lAdjustHash = UMAUtils.StringToHash("cheek_l");
            cheek_rAdjustHash = UMAUtils.StringToHash("cheek_r");
            cheek_02_lAdjustHash = UMAUtils.StringToHash("cheek_02_l");
            chin_02_rAdjustHash = UMAUtils.StringToHash("chin_02_r");
            chin_03_rAdjustHash = UMAUtils.StringToHash("chin_03_r");
            chinAdjustHash = UMAUtils.StringToHash("chin");
            cheekbone_rAdjustHash = UMAUtils.StringToHash("cheekbone_r");
            brow_rAdjustHash = UMAUtils.StringToHash("brow_r");
            tailbrow_rAdjustHash = UMAUtils.StringToHash("tailbrow_r");
            canthus_rAdjustHash = UMAUtils.StringToHash("canthus_r");
            endeye_rAdjustHash = UMAUtils.StringToHash("endeye_r");
            eyeAdjustHash = UMAUtils.StringToHash("eye");
            upeye_rAdjustHash = UMAUtils.StringToHash("upeye_r");
            loweye_rAdjustHash = UMAUtils.StringToHash("loweye_r");
            noseAdjustHash = UMAUtils.StringToHash("nose");
            tipnoseAdjustHash = UMAUtils.StringToHash("tipnose");
            nose_upAdjustHash = UMAUtils.StringToHash("nose_up");
            nasalnoseAdjustHash = UMAUtils.StringToHash("nasalnose");
            nosewing_rAdjustHash = UMAUtils.StringToHash("nosewing_r");
            mouthAdjustHash = UMAUtils.StringToHash("mouth");
            lipmouthAdjustHash = UMAUtils.StringToHash("lipmouth");
            upmouthAdjustHash = UMAUtils.StringToHash("upmouth");
            lowmouthAdjustHash = UMAUtils.StringToHash("lowmouth");
            builtHashes = true;
        }
    }
}