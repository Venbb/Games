using System.Collections;
using System.Collections.Generic;
using UnityEngine;
namespace UMA
{
    [System.Serializable]
    public class UMADnaHumanoid : UMADna
    {
        public float shullPositionx = 0.5f;
        public float shullPositionz = 0.5f;
        public float shullRotationx = 0.5f;
        public float shullRotationz = 0.5f;
        public float shullSize = 0.5f;
  
        public float cheek_lPositionx = 0.5f;
        public float cheek_lPositionz = 0.5f;
        public float cheek_lRotationx = 0.5f;
        public float cheek_lRotationz = 0.5f;
        public float cheek_lSize = 0.5f;

        public float cheek_rPositionx = 0.5f;
        public float cheek_rPositionz = 0.5f;
        public float cheek_rRotationx = 0.5f;
        public float cheek_rRotationz = 0.5f;
        public float cheek_rSize = 0.5f;

        public float cheek_02_lPositionx = 0.5f;
        public float cheek_02_lPositionz = 0.5f;
        public float cheek_02_lRotationx = 0.5f;
        public float cheek_02_lRotationz = 0.5f;
        public float cheek_02_lSize = 0.5f;

        public float chin_02_rPositionx = 0.5f;
        public float chin_02_rPositionz = 0.5f;
        public float chin_02_rRotationx = 0.5f;
        public float chin_02_rRotationz = 0.5f;
        public float chin_02_rSize = 0.5f;

        public float chin_03_rPositionx = 0.5f;
        public float chin_03_rPositionz = 0.5f;
        public float chin_03_rRotationx = 0.5f;
        public float chin_03_rRotationz = 0.5f;
        public float chin_03_rSize = 0.5f;

        public float chinPositionx = 0.5f;
        public float chinPositionz = 0.5f;
        public float chinRotationx = 0.5f;
        public float chinRotationz = 0.5f;
        public float chinSize = 0.5f;

        public float cheekbone_rPositionx = 0.5f;
        public float cheekbone_rPositionz = 0.5f;
        public float cheekbone_rRotationx = 0.5f;
        public float cheekbone_rRotationz = 0.5f;
        public float cheekbone_rSize = 0.5f;

        public float brow_rPositionx = 0.5f;
        public float brow_rPositionz = 0.5f;
        public float brow_rRotationx = 0.5f;
        public float brow_rRotationz = 0.5f;
        public float brow_rSize = 0.5f;

        public float tailbrow_rPositionx = 0.5f;
        public float tailbrow_rPositionz = 0.5f;
        public float tailbrow_rRotationx = 0.5f;
        public float tailbrow_rRotationz = 0.5f;
        public float tailbrow_rSize = 0.5f;

        public float canthus_rPositionx = 0.5f;
        public float canthus_rPositionz = 0.5f;
        public float canthus_rRotationx = 0.5f;
        public float canthus_rRotationz = 0.5f;
        public float canthus_rSize = 0.5f;

        public float endeye_rPositionx = 0.5f;
        public float endeye_rPositionz = 0.5f;
        public float endeye_rRotationx = 0.5f;
        public float endeye_rRotationz = 0.5f;
        public float endeye_rSize = 0.5f;

        public float eyePositionx = 0.5f;
        public float eyePositionz = 0.5f;
        public float eyeRotationx = 0.5f;
        public float eyeRotationz = 0.5f;
        public float eyeSize = 0.5f;

        public float upeye_rPositionx = 0.5f;
        public float upeye_rPositionz = 0.5f;
        public float upeye_rRotationx = 0.5f;
        public float upeye_rRotationz = 0.5f;
        public float upeye_rSize = 0.5f;

        public float loweye_rPositionx = 0.5f;
        public float loweye_rPositionz = 0.5f;
        public float loweye_rRotationx = 0.5f;
        public float loweye_rRotationz = 0.5f;
        public float loweye_rSize = 0.5f;

        public float nosePositionx = 0.5f;
        public float nosePositionz = 0.5f;
        public float noseRotationx = 0.5f;
        public float noseRotationz = 0.5f;
        public float noseSize = 0.5f;

        public float tipnosePositionx = 0.5f;
        public float tipnosePositionz = 0.5f;
        public float tipnoseRotationx = 0.5f;
        public float tipnoseRotationz = 0.5f;
        public float tipnoseSize = 0.5f;

        public float nose_upPositionx = 0.5f;
        public float nose_upPositionz = 0.5f;
        public float nose_upRotationx = 0.5f;
        public float nose_upRotationz = 0.5f;
        public float nose_upSize = 0.5f;

        public float nasalnosePositionx = 0.5f;
        public float nasalnosePositionz = 0.5f;
        public float nasalnoseRotationx = 0.5f;
        public float nasalnoseRotationz = 0.5f;
        public float nasalnoseSize = 0.5f;

        public float nosewing_rPositionx = 0.5f;
        public float nosewing_rPositionz = 0.5f;
        public float nosewing_rRotationx = 0.5f;
        public float nosewing_rRotationz = 0.5f;
        public float nosewing_rSize = 0.5f;

        public float mouthPositionx = 0.5f;
        public float mouthPositionz = 0.5f;
        public float mouthRotationx = 0.5f;
        public float mouthRotationz = 0.5f;
        public float mouthSize = 0.5f;

        public float lipmouthPositionx = 0.5f;
        public float lipmouthPositionz = 0.5f;
        public float lipmouthRotationx = 0.5f;
        public float lipmouthRotationz = 0.5f;
        public float lipmouthSize = 0.5f;

        public float upmouthPositionx = 0.5f;
        public float upmouthPositionz = 0.5f;
        public float upmouthRotationx = 0.5f;
        public float upmouthRotationz = 0.5f;
        public float upmouthSize = 0.5f;

        public float lowmouthPositionx = 0.5f;
        public float lowmouthPositionz = 0.5f;
        public float lowmouthRotationx = 0.5f;
        public float lowmouthRotationz = 0.5f;
        public float lowmouthSize = 0.5f;

        public override int Count { get { return 120; } }
        public override float[] Values
        {
            get
            {
                return new float[]
                {
                    shullPositionx,
                    shullPositionz,
                    shullRotationx,
                    shullRotationz,
                    shullSize,
                    cheek_lPositionx,
                    cheek_lPositionz,
                    cheek_lRotationx,
                    cheek_lRotationz,
                    cheek_lSize,
                    cheek_rPositionx,
                    cheek_rPositionz,
                    cheek_rRotationx,
                    cheek_rRotationz,
                    cheek_rSize,
                    cheek_02_lPositionx,
                    cheek_02_lPositionz,
                    cheek_02_lRotationx,
                    cheek_02_lRotationz,
                    cheek_02_lSize,
                    chin_02_rPositionx,
                    chin_02_rPositionz,
                    chin_02_rRotationx,
                    chin_02_rRotationz,
                    chin_02_rSize,
                    chin_03_rPositionx,
                    chin_03_rPositionz,
                    chin_03_rRotationx,
                    chin_03_rRotationz,
                    chin_03_rSize,
                    chinPositionx,
                    chinPositionz,
                    chinRotationx,
                    chinRotationz,
                    chinSize,
                    cheekbone_rPositionx,
                    cheekbone_rPositionz,
                    cheekbone_rRotationx,
                    cheekbone_rRotationz,
                    cheekbone_rSize,
                    brow_rPositionx,
                    brow_rPositionz,
                    brow_rRotationx,
                    brow_rRotationz,
                    brow_rSize,
                    tailbrow_rPositionx,
                    tailbrow_rPositionz,
                    tailbrow_rRotationx,
                    tailbrow_rRotationz,
                    tailbrow_rSize,
                    canthus_rPositionx,
                    canthus_rPositionz,
                    canthus_rRotationx,
                    canthus_rRotationz,
                    canthus_rSize,
                    endeye_rPositionx,
                    endeye_rPositionz,
                    endeye_rRotationx,
                    endeye_rRotationz,
                    endeye_rSize,
                    eyePositionx,
                    eyePositionz,
                    eyeRotationx,
                    eyeRotationz,
                    eyeSize,
                    upeye_rPositionx,
                    upeye_rPositionz,
                    upeye_rRotationx,
                    upeye_rRotationz,
                    upeye_rSize,
                    loweye_rPositionx,
                    loweye_rPositionz,
                    loweye_rRotationx,
                    loweye_rRotationz,
                    loweye_rSize,
                    nosePositionx,
                    nosePositionz,
                    noseRotationx,
                    noseRotationz,
                    noseSize,
                    tipnosePositionx,
                    tipnosePositionz,
                    tipnoseRotationx,
                    tipnoseRotationz,
                    tipnoseSize,
                    nose_upPositionx,
                    nose_upPositionz,
                    nose_upRotationx,
                    nose_upRotationz,
                    nose_upSize,
                    nasalnosePositionx,
                    nasalnosePositionz,
                    nasalnoseRotationx,
                    nasalnoseRotationz,
                    nasalnoseSize,
                    nosewing_rPositionx,
                    nosewing_rPositionz,
                    nosewing_rRotationx,
                    nosewing_rRotationz,
                    nosewing_rSize,
                    mouthPositionx,
                    mouthPositionz,
                    mouthRotationx,
                    mouthRotationz,
                    mouthSize,
                    lipmouthPositionx,
                    lipmouthPositionz,
                    lipmouthRotationx,
                    lipmouthRotationz,
                    lipmouthSize,
                    upmouthPositionx,
                    upmouthPositionz,
                    upmouthRotationx,
                    upmouthRotationz,
                    upmouthSize,
                    lowmouthPositionx,
                    lowmouthPositionz,
                    lowmouthRotationx,
                    lowmouthRotationz,
                    lowmouthSize,

    };
            }
            set
            {
                    shullPositionx = value[0];
                    shullPositionz = value[1];
                    shullRotationx = value[2];
                    shullRotationz = value[3];
                    shullSize = value[4];
                    cheek_lPositionx = value[5];
                    cheek_lPositionz = value[6];
                    cheek_lRotationx = value[7];
                    cheek_lRotationz = value[8];
                    cheek_lSize = value[9];
                    cheek_rPositionx = value[10];
                    cheek_rPositionz = value[11];
                    cheek_rRotationx = value[12];
                    cheek_rRotationz = value[13];
                    cheek_rSize = value[14];
                    cheek_02_lPositionx = value[15];
                    cheek_02_lPositionz = value[16];
                    cheek_02_lRotationx = value[17];
                    cheek_02_lRotationz = value[18];
                    cheek_02_lSize = value[19];
                    chin_02_rPositionx = value[20];
                    chin_02_rPositionz = value[21];
                    chin_02_rRotationx = value[22];
                    chin_02_rRotationz = value[23];
                    chin_02_rSize = value[24];
                    chin_03_rPositionx = value[25];
                    chin_03_rPositionz = value[26];
                    chin_03_rRotationx = value[27];
                    chin_03_rRotationz = value[28];
                    chin_03_rSize = value[29];
                    chinPositionx = value[30];
                    chinPositionz = value[31];
                    chinRotationx = value[32];
                    chinRotationz = value[33];
                    chinSize = value[34];
                    cheekbone_rPositionx = value[35];
                    cheekbone_rPositionz = value[36];
                    cheekbone_rRotationx = value[37];
                    cheekbone_rRotationz = value[38];
                    cheekbone_rSize = value[39];
                    brow_rPositionx = value[40];
                    brow_rPositionz = value[41];
                    brow_rRotationx = value[42];
                    brow_rRotationz = value[43];
                    brow_rSize = value[44];
                    tailbrow_rPositionx = value[45];
                    tailbrow_rPositionz = value[46];
                    tailbrow_rRotationx = value[47];
                    tailbrow_rRotationz = value[48];
                    tailbrow_rSize = value[49];
                    canthus_rPositionx = value[50];
                    canthus_rPositionz = value[51];
                    canthus_rRotationx = value[52];
                    canthus_rRotationz = value[53];
                    canthus_rSize = value[54];
                    endeye_rPositionx = value[55];
                    endeye_rPositionz = value[56];
                    endeye_rRotationx = value[57];
                    endeye_rRotationz = value[58];
                    endeye_rSize = value[59];
                    eyePositionx = value[60];
                    eyePositionz = value[61];
                    eyeRotationx = value[62];
                    eyeRotationz = value[63];
                    eyeSize = value[64];
                    upeye_rPositionx = value[65];
                    upeye_rPositionz = value[66];
                    upeye_rRotationx = value[67];
                    upeye_rRotationz = value[68];
                    upeye_rSize = value[69];
                    loweye_rPositionx = value[70];
                    loweye_rPositionz = value[71];
                    loweye_rRotationx = value[72];
                    loweye_rRotationz = value[73];
                    loweye_rSize = value[74];
                    nosePositionx = value[75];
                    nosePositionz = value[76];
                    noseRotationx = value[77];
                    noseRotationz = value[78];
                    noseSize = value[79];
                    tipnosePositionx = value[80];
                    tipnosePositionz = value[81];
                    tipnoseRotationx = value[82];
                    tipnoseRotationz = value[83];
                    tipnoseSize = value[84];
                    nose_upPositionx = value[85];
                    nose_upPositionz = value[86];
                    nose_upRotationx = value[87];
                    nose_upRotationz = value[88];
                    nose_upSize = value[89];
                    nasalnosePositionx = value[90];
                    nasalnosePositionz = value[91];
                    nasalnoseRotationx = value[92];
                    nasalnoseRotationz = value[93];
                    nasalnoseSize = value[94];
                    nosewing_rPositionx = value[95];
                    nosewing_rPositionz = value[96];
                    nosewing_rRotationx = value[97];
                    nosewing_rRotationz = value[98];
                    nosewing_rSize = value[99];
                    mouthPositionx = value[100];
                    mouthPositionz = value[101];
                    mouthRotationx = value[102];
                    mouthRotationz = value[103];
                    mouthSize = value[104];
                    lipmouthPositionx = value[105];
                    lipmouthPositionz = value[106];
                    lipmouthRotationx = value[107];
                    lipmouthRotationz = value[108];
                    lipmouthSize = value[109];
                    upmouthPositionx = value[110];
                    upmouthPositionz = value[111];
                    upmouthRotationx = value[112];
                    upmouthRotationz = value[113];
                    upmouthSize = value[114];
                    lowmouthPositionx = value[115];
                    lowmouthPositionz = value[116];
                    lowmouthRotationx = value[117];
                    lowmouthRotationz = value[118];
                    lowmouthSize = value[119];

            }
        }
        public override float GetValue(int idx)
        {
            switch (idx)
            {
                case 0: return shullPositionx;
                case 1: return shullPositionz;
                case 2: return shullRotationx;
                case 3: return shullRotationz;
                case 4: return shullSize;

                case 5: return cheek_lPositionx;
                case 6: return cheek_lPositionz;
                case 7: return cheek_lRotationx;
                case 8: return cheek_lRotationz;
                case 9: return cheek_lSize;

                case 10: return cheek_rPositionx;
                case 11: return cheek_rPositionz;
                case 12: return cheek_rRotationx;
                case 13: return cheek_rRotationz;
                case 14: return cheek_rSize;

                case 15: return cheek_02_lPositionx;
                case 16: return cheek_02_lPositionz;
                case 17: return cheek_02_lRotationx;
                case 18: return cheek_02_lRotationz;
                case 19: return cheek_02_lSize;

                case 20: return chin_02_rPositionx;
                case 21: return chin_02_rPositionz;
                case 22: return chin_02_rRotationx;
                case 23: return chin_02_rRotationz;
                case 24: return chin_02_rSize;

                case 25: return chin_03_rPositionx;
                case 26: return chin_03_rPositionz;
                case 27: return chin_03_rRotationx;
                case 28: return chin_03_rRotationz;
                case 29: return chin_03_rSize;

                case 30: return chinPositionx;
                case 31: return chinPositionz;
                case 32: return chinRotationx;
                case 33: return chinRotationz;
                case 34: return chinSize;

                case 35: return cheekbone_rPositionx;
                case 36: return cheekbone_rPositionz;
                case 37: return cheekbone_rRotationx;
                case 38: return cheekbone_rRotationz;
                case 39: return cheekbone_rSize;

                case 40: return brow_rPositionx;
                case 41: return brow_rPositionz;
                case 42: return brow_rRotationx;
                case 43: return brow_rRotationz;
                case 44: return brow_rSize;

                case 45: return tailbrow_rPositionx;
                case 46: return tailbrow_rPositionz;
                case 47: return tailbrow_rRotationx;
                case 48: return tailbrow_rRotationz;
                case 49: return tailbrow_rSize;

                case 50: return canthus_rPositionx;
                case 51: return canthus_rPositionz;
                case 52: return canthus_rRotationx;
                case 53: return canthus_rRotationz;
                case 54: return canthus_rSize;

                case 55: return endeye_rPositionx;
                case 56: return endeye_rPositionz;
                case 57: return endeye_rRotationx;
                case 58: return endeye_rRotationz;
                case 59: return endeye_rSize;

                case 60: return eyePositionx;
                case 61: return eyePositionz;
                case 62: return eyeRotationx;
                case 63: return eyeRotationz;
                case 64: return eyeSize;

                case 65: return upeye_rPositionx;
                case 66: return upeye_rPositionz;
                case 67: return upeye_rRotationx;
                case 68: return upeye_rRotationz;
                case 69: return upeye_rSize;

                case 70: return loweye_rPositionx;
                case 71: return loweye_rPositionz;
                case 72: return loweye_rRotationx;
                case 73: return loweye_rRotationz;
                case 74: return loweye_rSize;

                case 75: return nosePositionx;
                case 76: return nosePositionz;
                case 77: return noseRotationx;
                case 78: return noseRotationz;
                case 79: return noseSize;

                case 80: return tipnosePositionx;
                case 81: return tipnosePositionz;
                case 82: return tipnoseRotationx;
                case 83: return tipnoseRotationz;
                case 84: return tipnoseSize;

                case 85: return nose_upPositionx;
                case 86: return nose_upPositionz;
                case 87: return nose_upRotationx;
                case 88: return nose_upRotationz;
                case 89: return nose_upSize;

                case 90: return nasalnosePositionx;
                case 91: return nasalnosePositionz;
                case 92: return nasalnoseRotationx;
                case 93: return nasalnoseRotationz;
                case 94: return nasalnoseSize;

                case 95: return nosewing_rPositionx;
                case 96: return nosewing_rPositionz;
                case 97: return nosewing_rRotationx;
                case 98: return nosewing_rRotationz;
                case 99: return nosewing_rSize;

                case 100: return mouthPositionx;
                case 101: return mouthPositionz;
                case 102: return mouthRotationx;
                case 103: return mouthRotationz;
                case 104: return mouthSize;

                case 105: return lipmouthPositionx;
                case 106: return lipmouthPositionz;
                case 107: return lipmouthRotationx;
                case 108: return lipmouthRotationz;
                case 109: return lipmouthSize;

                case 110: return upmouthPositionx;
                case 111: return upmouthPositionz;
                case 112: return upmouthRotationx;
                case 113: return upmouthRotationz;
                case 114: return upmouthSize;

                case 115: return lowmouthPositionx;
                case 116: return lowmouthPositionz;
                case 117: return lowmouthRotationx;
                case 118: return lowmouthRotationz;
                case 119: return lowmouthSize;
            }
            throw new System.ArgumentOutOfRangeException();
        }
        public override void SetValue(int idx, float value)
        {
            switch (idx)
            {
                case 0: shullPositionx = value; return;
                case 1: shullPositionz = value; return;
                case 2: shullRotationx = value; return;
                case 3: shullRotationz = value; return;
                case 4: shullSize = value; return;

                case 5: cheek_lPositionx = value; return;
                case 6: cheek_lPositionz = value; return;
                case 7: cheek_lRotationx = value; return;
                case 8: cheek_lRotationz = value; return;
                case 9: cheek_lSize = value; return;

                case 10: cheek_rPositionx = value; return;
                case 11: cheek_rPositionz = value; return;
                case 12: cheek_rRotationx = value; return;
                case 13: cheek_rRotationz = value; return;
                case 14: cheek_rSize = value; return;

                case 15: cheek_02_lPositionx = value; return;
                case 16: cheek_02_lPositionz = value; return;
                case 17: cheek_02_lRotationx = value; return;
                case 18: cheek_02_lRotationz = value; return;
                case 19: cheek_02_lSize = value; return;

                case 20: chin_02_rPositionx = value; return;
                case 21: chin_02_rPositionz = value; return;
                case 22: chin_02_rRotationx = value; return;
                case 23: chin_02_rRotationz = value; return;
                case 24: chin_02_rSize = value; return;

                case 25: chin_03_rPositionx = value; return;
                case 26: chin_03_rPositionz = value; return;
                case 27: chin_03_rRotationx = value; return;
                case 28: chin_03_rRotationz = value; return;
                case 29: chin_03_rSize = value; return;

                case 30: chinPositionx = value; return;
                case 31: chinPositionz = value; return;
                case 32: chinRotationx = value; return;
                case 33: chinRotationz = value; return;
                case 34: chinSize = value; return;

                case 35: cheekbone_rPositionx = value; return;
                case 36: cheekbone_rPositionz = value; return;
                case 37: cheekbone_rRotationx = value; return;
                case 38: cheekbone_rRotationz = value; return;
                case 39: cheekbone_rSize = value; return;

                case 40: brow_rPositionx = value; return;
                case 41: brow_rPositionz = value; return;
                case 42: brow_rRotationx = value; return;
                case 43: brow_rRotationz = value; return;
                case 44: brow_rSize = value; return;

                case 45: tailbrow_rPositionx = value; return;
                case 46: tailbrow_rPositionz = value; return;
                case 47: tailbrow_rRotationx = value; return;
                case 48: tailbrow_rRotationz = value; return;
                case 49: tailbrow_rSize = value; return;

                case 50: canthus_rPositionx = value; return;
                case 51: canthus_rPositionz = value; return;
                case 52: canthus_rRotationx = value; return;
                case 53: canthus_rRotationz = value; return;
                case 54: canthus_rSize = value; return;

                case 55: endeye_rPositionx = value; return;
                case 56: endeye_rPositionz = value; return;
                case 57: endeye_rRotationx = value; return;
                case 58: endeye_rRotationz = value; return;
                case 59: endeye_rSize = value; return;

                case 60: eyePositionx = value; return;
                case 61: eyePositionz = value; return;
                case 62: eyeRotationx = value; return;
                case 63: eyeRotationz = value; return;
                case 64: eyeSize = value; return;

                case 65: upeye_rPositionx = value; return;
                case 66: upeye_rPositionz = value; return;
                case 67: upeye_rRotationx = value; return;
                case 68: upeye_rRotationz = value; return;
                case 69: upeye_rSize = value; return;

                case 70: loweye_rPositionx = value; return;
                case 71: loweye_rPositionz = value; return;
                case 72: loweye_rRotationx = value; return;
                case 73: loweye_rRotationz = value; return;
                case 74: loweye_rSize = value; return;

                case 75: nosePositionx = value; return;
                case 76: nosePositionz = value; return;
                case 77: noseRotationx = value; return;
                case 78: noseRotationz = value; return;
                case 79: noseSize = value; return;

                case 80: tipnosePositionx = value; return;
                case 81: tipnosePositionz = value; return;
                case 82: tipnoseRotationx = value; return;
                case 83: tipnoseRotationz = value; return;
                case 84: tipnoseSize = value; return;

                case 85: nose_upPositionx = value; return;
                case 86: nose_upPositionz = value; return;
                case 87: nose_upRotationx = value; return;
                case 88: nose_upRotationz = value; return;
                case 89: nose_upSize = value; return;

                case 90: nasalnosePositionx = value; return;
                case 91: nasalnosePositionz = value; return;
                case 92: nasalnoseRotationx = value; return;
                case 93: nasalnoseRotationz = value; return;
                case 94: nasalnoseSize = value; return;

                case 95: nosewing_rPositionx = value; return;
                case 96: nosewing_rPositionz = value; return;
                case 97: nosewing_rRotationx = value; return;
                case 98: nosewing_rRotationz = value; return;
                case 99: nosewing_rSize = value; return;

                case 100: mouthPositionx = value; return;
                case 101: mouthPositionz = value; return;
                case 102: mouthRotationx = value; return;
                case 103: mouthRotationz = value; return;
                case 104: mouthSize = value; return;

                case 105: lipmouthPositionx = value; return;
                case 106: lipmouthPositionz = value; return;
                case 107: lipmouthRotationx = value; return;
                case 108: lipmouthRotationz = value; return;
                case 109: lipmouthSize = value; return;

                case 110: upmouthPositionx = value; return;
                case 111: upmouthPositionz = value; return;
                case 112: upmouthRotationx = value; return;
                case 113: upmouthRotationz = value; return;
                case 114: upmouthSize = value; return;

                case 115: lowmouthPositionx = value; return;
                case 116: lowmouthPositionz = value; return;
                case 117: lowmouthRotationx = value; return;
                case 118: lowmouthRotationz = value; return;
                case 119: lowmouthSize = value; return;

            }
            throw new System.ArgumentOutOfRangeException();
        }

        public static string[] GetNames()
        {
            return new string[]
            {
                "shullPositionx",
                "shullPositionz",
                "shullRotationx",
                "shullRotationz",
                "shullSize",

                "cheek_lPositionx",
                "cheek_lPositionz",
                "cheek_lRotationx",
                "cheek_lRotationz",
                "cheek_lSize",

                "cheek_rPositionx",
                "cheek_rPositionz",
                "cheek_rRotationx",
                "cheek_rRotationz",
                "cheek_rSize",

                "cheek_02_lPositionx",
                "cheek_02_lPositionz",
                "cheek_02_lRotationx",
                "cheek_02_lRotationz",
                "cheek_02_lSize",

                "chin_02_rPositionx",
                "chin_02_rPositionz",
                "chin_02_rRotationx",
                "chin_02_rRotationz",
                "chin_02_rSize",

                "chin_03_rPositionx",
                "chin_03_rPositionz",
                "chin_03_rRotationx",
                "chin_03_rRotationz",
                "chin_03_rSize",

                "chinPositionx",
                "chinPositionz",
                "chinRotationx",
                "chinRotationz",
                "chinSize",

                "cheekbone_rPositionx",
                "cheekbone_rPositionz",
                "cheekbone_rRotationx",
                "cheekbone_rRotationz",
                "cheekbone_rSize",

                "brow_rPositionx",
                "brow_rPositionz",
                "brow_rRotationx",
                "brow_rRotationz",
                "brow_rSize",

                "tailbrow_rPositionx",
                "tailbrow_rPositionz",
                "tailbrow_rRotationx",
                "tailbrow_rRotationz",
                "tailbrow_rSize",

                "canthus_rPositionx",
                "canthus_rPositionz",
                "canthus_rRotationx",
                "canthus_rRotationz",
                "canthus_rSize",

                "endeye_rPositionx",
                "endeye_rPositionz",
                "endeye_rRotationx",
                "endeye_rRotationz",
                "endeye_rSize",

                "eyePositionx",
                "eyePositionz",
                "eyeRotationx",
                "eyeRotationz",
                "eyeSize",

                "upeye_rPositionx",
                "upeye_rPositionz",
                "upeye_rRotationx",
                "upeye_rRotationz",
                "upeye_rSize",

                "loweye_rPositionx",
                "loweye_rPositionz",
                "loweye_rRotationx",
                "loweye_rRotationz",
                "loweye_rSize",

                "nosePositionx",
                "nosePositionz",
                "noseRotationx",
                "noseRotationz",
                "noseSize",

                "tipnosePositionx",
                "tipnosePositionz",
                "tipnoseRotationx",
                "tipnoseRotationz",
                "tipnoseSize",

                "nose_upPositionx",
                "nose_upPositionz",
                "nose_upRotationx",
                "nose_upRotationz",
                "nose_upSize",

                "nasalnosePositionx",
                "nasalnosePositionz",
                "nasalnoseRotationx",
                "nasalnoseRotationz",
                "nasalnoseSize",

                "nosewing_rPositionx",
                "nosewing_rPositionz",
                "nosewing_rRotationx",
                "nosewing_rRotationz",
                "nosewing_rSize",

                "mouthPositionx",
                "mouthPositionz",
                "mouthRotationx",
                "mouthRotationz",
                "mouthSize",

                "lipmouthPositionx",
                "lipmouthPositionz",
                "lipmouthRotationx",
                "lipmouthRotationz",
                "lipmouthSize",

                "upmouthPositionx",
                "upmouthPositionz",
                "upmouthRotationx",
                "upmouthRotationz",
                "upmouthSize",

                "lowmouthPositionx",
                "lowmouthPositionz",
                "lowmouthRotationx",
                "lowmouthRotationz",
                "lowmouthSize",

            };
        }
        public override string[] Names
        {
            get
            {
                return GetNames();
            }
        }
        public static UMADnaHumanoid LoadInstance(string data)
        {
#if !StripLitJson
            return LitJson.JsonMapper.ToObject<UMADnaHumanoid_Byte>(data).ToDna();
#else
			return null;
#endif
        }
        public static string SaveInstance(UMADnaHumanoid instance)
        {
#if !StripLitJson
            return LitJson.JsonMapper.ToJson(UMADnaHumanoid_Byte.FromDna(instance));
#else
			return null;
#endif
        }
    }

    [System.Serializable]
    public class UMADnaHumanoid_Byte
    {
        public System.Byte shullPositionx;
        public System.Byte shullPositionz;
        public System.Byte shullRotationx;
        public System.Byte shullRotationz;
        public System.Byte shullSize;

        public System.Byte cheek_lPositionx;
        public System.Byte cheek_lPositionz;
        public System.Byte cheek_lRotationx;
        public System.Byte cheek_lRotationz;
        public System.Byte cheek_lSize;

        public System.Byte cheek_rPositionx;
        public System.Byte cheek_rPositionz;
        public System.Byte cheek_rRotationx;
        public System.Byte cheek_rRotationz;
        public System.Byte cheek_rSize;

        public System.Byte cheek_02_lPositionx;
        public System.Byte cheek_02_lPositionz;
        public System.Byte cheek_02_lRotationx;
        public System.Byte cheek_02_lRotationz;
        public System.Byte cheek_02_lSize;

        public System.Byte chin_02_rPositionx;
        public System.Byte chin_02_rPositionz;
        public System.Byte chin_02_rRotationx;
        public System.Byte chin_02_rRotationz;
        public System.Byte chin_02_rSize;

        public System.Byte chin_03_rPositionx;
        public System.Byte chin_03_rPositionz;
        public System.Byte chin_03_rRotationx;
        public System.Byte chin_03_rRotationz;
        public System.Byte chin_03_rSize;

        public System.Byte chinPositionx;
        public System.Byte chinPositionz;
        public System.Byte chinRotationx;
        public System.Byte chinRotationz;
        public System.Byte chinSize;

        public System.Byte cheekbone_rPositionx;
        public System.Byte cheekbone_rPositionz;
        public System.Byte cheekbone_rRotationx;
        public System.Byte cheekbone_rRotationz;
        public System.Byte cheekbone_rSize;

        public System.Byte brow_rPositionx;
        public System.Byte brow_rPositionz;
        public System.Byte brow_rRotationx;
        public System.Byte brow_rRotationz;
        public System.Byte brow_rSize;

        public System.Byte tailbrow_rPositionx;
        public System.Byte tailbrow_rPositionz;
        public System.Byte tailbrow_rRotationx;
        public System.Byte tailbrow_rRotationz;
        public System.Byte tailbrow_rSize;

        public System.Byte canthus_rPositionx;
        public System.Byte canthus_rPositionz;
        public System.Byte canthus_rRotationx;
        public System.Byte canthus_rRotationz;
        public System.Byte canthus_rSize;

        public System.Byte endeye_rPositionx;
        public System.Byte endeye_rPositionz;
        public System.Byte endeye_rRotationx;
        public System.Byte endeye_rRotationz;
        public System.Byte endeye_rSize;

        public System.Byte eyePositionx;
        public System.Byte eyePositionz;
        public System.Byte eyeRotationx;
        public System.Byte eyeRotationz;
        public System.Byte eyeSize;

        public System.Byte upeye_rPositionx;
        public System.Byte upeye_rPositionz;
        public System.Byte upeye_rRotationx;
        public System.Byte upeye_rRotationz;
        public System.Byte upeye_rSize;

        public System.Byte loweye_rPositionx;
        public System.Byte loweye_rPositionz;
        public System.Byte loweye_rRotationx;
        public System.Byte loweye_rRotationz;
        public System.Byte loweye_rSize;

        public System.Byte nosePositionx;
        public System.Byte nosePositionz;
        public System.Byte noseRotationx;
        public System.Byte noseRotationz;
        public System.Byte noseSize;

        public System.Byte tipnosePositionx;
        public System.Byte tipnosePositionz;
        public System.Byte tipnoseRotationx;
        public System.Byte tipnoseRotationz;
        public System.Byte tipnoseSize;

        public System.Byte nose_upPositionx;
        public System.Byte nose_upPositionz;
        public System.Byte nose_upRotationx;
        public System.Byte nose_upRotationz;
        public System.Byte nose_upSize;

        public System.Byte nasalnosePositionx;
        public System.Byte nasalnosePositionz;
        public System.Byte nasalnoseRotationx;
        public System.Byte nasalnoseRotationz;
        public System.Byte nasalnoseSize;

        public System.Byte nosewing_rPositionx;
        public System.Byte nosewing_rPositionz;
        public System.Byte nosewing_rRotationx;
        public System.Byte nosewing_rRotationz;
        public System.Byte nosewing_rSize;

        public System.Byte mouthPositionx;
        public System.Byte mouthPositionz;
        public System.Byte mouthRotationx;
        public System.Byte mouthRotationz;
        public System.Byte mouthSize;

        public System.Byte lipmouthPositionx;
        public System.Byte lipmouthPositionz;
        public System.Byte lipmouthRotationx;
        public System.Byte lipmouthRotationz;
        public System.Byte lipmouthSize;

        public System.Byte upmouthPositionx;
        public System.Byte upmouthPositionz;
        public System.Byte upmouthRotationx;
        public System.Byte upmouthRotationz;
        public System.Byte upmouthSize;

        public System.Byte lowmouthPositionx;
        public System.Byte lowmouthPositionz;
        public System.Byte lowmouthRotationx;
        public System.Byte lowmouthRotationz;
        public System.Byte lowmouthSize;

        public UMADnaHumanoid ToDna()
        {
            var res = new UMADnaHumanoid();
            res.shullPositionx = shullPositionx * (1f / 255f);
            res.shullPositionz = shullPositionz * (1f / 255f);
            res.shullRotationx = shullRotationx * (1f / 255f);
            res.shullRotationz = shullRotationz * (1f / 255f);
            res.shullSize = shullSize * (1f / 255f);

            res.cheek_lPositionx = cheek_lPositionx * (1f / 255f);
            res.cheek_lPositionz = cheek_lPositionz * (1f / 255f);
            res.cheek_lRotationx = cheek_lRotationx * (1f / 255f);
            res.cheek_lRotationz = cheek_lRotationz * (1f / 255f);
            res.cheek_lSize = cheek_lSize * (1f / 255f);

            res.cheek_rPositionx = cheek_rPositionx * (1f / 255f);
            res.cheek_rPositionz = cheek_rPositionz * (1f / 255f);
            res.cheek_rRotationx = cheek_rRotationx * (1f / 255f);
            res.cheek_rRotationz = cheek_rRotationz * (1f / 255f);
            res.cheek_rSize = cheek_rSize * (1f / 255f);

            res.cheek_02_lPositionx = cheek_02_lPositionx * (1f / 255f);
            res.cheek_02_lPositionz = cheek_02_lPositionz * (1f / 255f);
            res.cheek_02_lRotationx = cheek_02_lRotationx * (1f / 255f);
            res.cheek_02_lRotationz = cheek_02_lRotationz * (1f / 255f);
            res.cheek_02_lSize = cheek_02_lSize * (1f / 255f);

            res.chin_02_rPositionx = chin_02_rPositionx * (1f / 255f);
            res.chin_02_rPositionz = chin_02_rPositionz * (1f / 255f);
            res.chin_02_rRotationx = chin_02_rRotationx * (1f / 255f);
            res.chin_02_rRotationz = chin_02_rRotationz * (1f / 255f);
            res.chin_02_rSize = chin_02_rSize * (1f / 255f);

            res.chin_03_rPositionx = chin_03_rPositionx * (1f / 255f);
            res.chin_03_rPositionz = chin_03_rPositionz * (1f / 255f);
            res.chin_03_rRotationx = chin_03_rRotationx * (1f / 255f);
            res.chin_03_rRotationz = chin_03_rRotationz * (1f / 255f);
            res.chin_03_rSize = chin_03_rSize * (1f / 255f);

            res.chinPositionx = chinPositionx * (1f / 255f);
            res.chinPositionz = chinPositionz * (1f / 255f);
            res.chinRotationx = chinRotationx * (1f / 255f);
            res.chinRotationz = chinRotationz * (1f / 255f);
            res.chinSize = chinSize * (1f / 255f);

            res.cheekbone_rPositionx = cheekbone_rPositionx * (1f / 255f);
            res.cheekbone_rPositionz = cheekbone_rPositionz * (1f / 255f);
            res.cheekbone_rRotationx = cheekbone_rRotationx * (1f / 255f);
            res.cheekbone_rRotationz = cheekbone_rRotationz * (1f / 255f);
            res.cheekbone_rSize = cheekbone_rSize * (1f / 255f);

            res.brow_rPositionx = brow_rPositionx * (1f / 255f);
            res.brow_rPositionz = brow_rPositionz * (1f / 255f);
            res.brow_rRotationx = brow_rRotationx * (1f / 255f);
            res.brow_rRotationz = brow_rRotationz * (1f / 255f);
            res.brow_rSize = brow_rSize * (1f / 255f);

            res.tailbrow_rPositionx = tailbrow_rPositionx * (1f / 255f);
            res.tailbrow_rPositionz = tailbrow_rPositionz * (1f / 255f);
            res.tailbrow_rRotationx = tailbrow_rRotationx * (1f / 255f);
            res.tailbrow_rRotationz = tailbrow_rRotationz * (1f / 255f);
            res.tailbrow_rSize = tailbrow_rSize * (1f / 255f);

            res.canthus_rPositionx = canthus_rPositionx * (1f / 255f);
            res.canthus_rPositionz = canthus_rPositionz * (1f / 255f);
            res.canthus_rRotationx = canthus_rRotationx * (1f / 255f);
            res.canthus_rRotationz = canthus_rRotationz * (1f / 255f);
            res.canthus_rSize = canthus_rSize * (1f / 255f);

            res.endeye_rPositionx = endeye_rPositionx * (1f / 255f);
            res.endeye_rPositionz = endeye_rPositionz * (1f / 255f);
            res.endeye_rRotationx = endeye_rRotationx * (1f / 255f);
            res.endeye_rRotationz = endeye_rRotationz * (1f / 255f);
            res.endeye_rSize = endeye_rSize * (1f / 255f);

            res.eyePositionx = eyePositionx * (1f / 255f);
            res.eyePositionz = eyePositionz * (1f / 255f);
            res.eyeRotationx = eyeRotationx * (1f / 255f);
            res.eyeRotationz = eyeRotationz * (1f / 255f);
            res.eyeSize = eyeSize * (1f / 255f);

            res.upeye_rPositionx = upeye_rPositionx * (1f / 255f);
            res.upeye_rPositionz = upeye_rPositionz * (1f / 255f);
            res.upeye_rRotationx = upeye_rRotationx * (1f / 255f);
            res.upeye_rRotationz = upeye_rRotationz * (1f / 255f);
            res.upeye_rSize = upeye_rSize * (1f / 255f);

            res.loweye_rPositionx = loweye_rPositionx * (1f / 255f);
            res.loweye_rPositionz = loweye_rPositionz * (1f / 255f);
            res.loweye_rRotationx = loweye_rRotationx * (1f / 255f);
            res.loweye_rRotationz = loweye_rRotationz * (1f / 255f);
            res.loweye_rSize = loweye_rSize * (1f / 255f);

            res.nosePositionx = nosePositionx * (1f / 255f);
            res.nosePositionz = nosePositionz * (1f / 255f);
            res.noseRotationx = noseRotationx * (1f / 255f);
            res.noseRotationz = noseRotationz * (1f / 255f);
            res.noseSize = noseSize * (1f / 255f);

            res.tipnosePositionx = tipnosePositionx * (1f / 255f);
            res.tipnosePositionz = tipnosePositionz * (1f / 255f);
            res.tipnoseRotationx = tipnoseRotationx * (1f / 255f);
            res.tipnoseRotationz = tipnoseRotationz * (1f / 255f);
            res.tipnoseSize = tipnoseSize * (1f / 255f);

            res.nose_upPositionx = nose_upPositionx * (1f / 255f);
            res.nose_upPositionz = nose_upPositionz * (1f / 255f);
            res.nose_upRotationx = nose_upRotationx * (1f / 255f);
            res.nose_upRotationz = nose_upRotationz * (1f / 255f);
            res.nose_upSize = nose_upSize * (1f / 255f);

            res.nasalnosePositionx = nasalnosePositionx * (1f / 255f);
            res.nasalnosePositionz = nasalnosePositionz * (1f / 255f);
            res.nasalnoseRotationx = nasalnoseRotationx * (1f / 255f);
            res.nasalnoseRotationz = nasalnoseRotationz * (1f / 255f);
            res.nasalnoseSize = nasalnoseSize * (1f / 255f);

            res.nosewing_rPositionx = nosewing_rPositionx * (1f / 255f);
            res.nosewing_rPositionz = nosewing_rPositionz * (1f / 255f);
            res.nosewing_rRotationx = nosewing_rRotationx * (1f / 255f);
            res.nosewing_rRotationz = nosewing_rRotationz * (1f / 255f);
            res.nosewing_rSize = nosewing_rSize * (1f / 255f);

            res.mouthPositionx = mouthPositionx * (1f / 255f);
            res.mouthPositionz = mouthPositionz * (1f / 255f);
            res.mouthRotationx = mouthRotationx * (1f / 255f);
            res.mouthRotationz = mouthRotationz * (1f / 255f);
            res.mouthSize = mouthSize * (1f / 255f);

            res.lipmouthPositionx = lipmouthPositionx * (1f / 255f);
            res.lipmouthPositionz = lipmouthPositionz * (1f / 255f);
            res.lipmouthRotationx = lipmouthRotationx * (1f / 255f);
            res.lipmouthRotationz = lipmouthRotationz * (1f / 255f);
            res.lipmouthSize = lipmouthSize * (1f / 255f);

            res.upmouthPositionx = upmouthPositionx * (1f / 255f);
            res.upmouthPositionz = upmouthPositionz * (1f / 255f);
            res.upmouthRotationx = upmouthRotationx * (1f / 255f);
            res.upmouthRotationz = upmouthRotationz * (1f / 255f);
            res.upmouthSize = upmouthSize * (1f / 255f);

            res.lowmouthPositionx = lowmouthPositionx * (1f / 255f);
            res.lowmouthPositionz = lowmouthPositionz * (1f / 255f);
            res.lowmouthRotationx = lowmouthRotationx * (1f / 255f);
            res.lowmouthRotationz = lowmouthRotationz * (1f / 255f);
            res.lowmouthSize = lowmouthSize * (1f / 255f);
            return res;
        }
        public static UMADnaHumanoid_Byte FromDna(UMADnaHumanoid dna)
        {
            var res = new UMADnaHumanoid_Byte();
            res.shullPositionx = (System.Byte)(dna.shullPositionx * 255f + 0.5f);
            res.shullPositionz = (System.Byte)(dna.shullPositionz * 255f + 0.5f);
            res.shullRotationx = (System.Byte)(dna.shullRotationx * 255f + 0.5f);
            res.shullRotationz = (System.Byte)(dna.shullRotationz * 255f + 0.5f);
            res.shullSize = (System.Byte)(dna.shullSize * 255f + 0.5f);

            res.cheek_lPositionx = (System.Byte)(dna.cheek_lPositionx * 255f + 0.5f);
            res.cheek_lPositionz = (System.Byte)(dna.cheek_lPositionz * 255f + 0.5f);
            res.cheek_lRotationx = (System.Byte)(dna.cheek_lRotationx * 255f + 0.5f);
            res.cheek_lRotationz = (System.Byte)(dna.cheek_lRotationz * 255f + 0.5f);
            res.cheek_lSize = (System.Byte)(dna.cheek_lSize * 255f + 0.5f);

            res.cheek_rPositionx = (System.Byte)(dna.cheek_rPositionx * 255f + 0.5f);
            res.cheek_rPositionz = (System.Byte)(dna.cheek_rPositionz * 255f + 0.5f);
            res.cheek_rRotationx = (System.Byte)(dna.cheek_rRotationx * 255f + 0.5f);
            res.cheek_rRotationz = (System.Byte)(dna.cheek_rRotationz * 255f + 0.5f);
            res.cheek_rSize = (System.Byte)(dna.cheek_rSize * 255f + 0.5f);

            res.cheek_02_lPositionx = (System.Byte)(dna.cheek_02_lPositionx * 255f + 0.5f);
            res.cheek_02_lPositionz = (System.Byte)(dna.cheek_02_lPositionz * 255f + 0.5f);
            res.cheek_02_lRotationx = (System.Byte)(dna.cheek_02_lRotationx * 255f + 0.5f);
            res.cheek_02_lRotationz = (System.Byte)(dna.cheek_02_lRotationz * 255f + 0.5f);
            res.cheek_02_lSize = (System.Byte)(dna.cheek_02_lSize * 255f + 0.5f);

            res.chin_02_rPositionx = (System.Byte)(dna.chin_02_rPositionx * 255f + 0.5f);
            res.chin_02_rPositionz = (System.Byte)(dna.chin_02_rPositionz * 255f + 0.5f);
            res.chin_02_rRotationx = (System.Byte)(dna.chin_02_rRotationx * 255f + 0.5f);
            res.chin_02_rRotationz = (System.Byte)(dna.chin_02_rRotationz * 255f + 0.5f);
            res.chin_02_rSize = (System.Byte)(dna.chin_02_rSize * 255f + 0.5f);

            res.chin_03_rPositionx = (System.Byte)(dna.chin_03_rPositionx * 255f + 0.5f);
            res.chin_03_rPositionz = (System.Byte)(dna.chin_03_rPositionz * 255f + 0.5f);
            res.chin_03_rRotationx = (System.Byte)(dna.chin_03_rRotationx * 255f + 0.5f);
            res.chin_03_rRotationz = (System.Byte)(dna.chin_03_rRotationz * 255f + 0.5f);
            res.chin_03_rSize = (System.Byte)(dna.chin_03_rSize * 255f + 0.5f);

            res.chinPositionx = (System.Byte)(dna.chinPositionx * 255f + 0.5f);
            res.chinPositionz = (System.Byte)(dna.chinPositionz * 255f + 0.5f);
            res.chinRotationx = (System.Byte)(dna.chinRotationx * 255f + 0.5f);
            res.chinRotationz = (System.Byte)(dna.chinRotationz * 255f + 0.5f);
            res.chinSize = (System.Byte)(dna.chinSize * 255f + 0.5f);

            res.cheekbone_rPositionx = (System.Byte)(dna.cheekbone_rPositionx * 255f + 0.5f);
            res.cheekbone_rPositionz = (System.Byte)(dna.cheekbone_rPositionz * 255f + 0.5f);
            res.cheekbone_rRotationx = (System.Byte)(dna.cheekbone_rRotationx * 255f + 0.5f);
            res.cheekbone_rRotationz = (System.Byte)(dna.cheekbone_rRotationz * 255f + 0.5f);
            res.cheekbone_rSize = (System.Byte)(dna.cheekbone_rSize * 255f + 0.5f);

            res.brow_rPositionx = (System.Byte)(dna.brow_rPositionx * 255f + 0.5f);
            res.brow_rPositionz = (System.Byte)(dna.brow_rPositionz * 255f + 0.5f);
            res.brow_rRotationx = (System.Byte)(dna.brow_rRotationx * 255f + 0.5f);
            res.brow_rRotationz = (System.Byte)(dna.brow_rRotationz * 255f + 0.5f);
            res.brow_rSize = (System.Byte)(dna.brow_rSize * 255f + 0.5f);

            res.tailbrow_rPositionx = (System.Byte)(dna.tailbrow_rPositionx * 255f + 0.5f);
            res.tailbrow_rPositionz = (System.Byte)(dna.tailbrow_rPositionz * 255f + 0.5f);
            res.tailbrow_rRotationx = (System.Byte)(dna.tailbrow_rRotationx * 255f + 0.5f);
            res.tailbrow_rRotationz = (System.Byte)(dna.tailbrow_rRotationz * 255f + 0.5f);
            res.tailbrow_rSize = (System.Byte)(dna.tailbrow_rSize * 255f + 0.5f);

            res.canthus_rPositionx = (System.Byte)(dna.canthus_rPositionx * 255f + 0.5f);
            res.canthus_rPositionz = (System.Byte)(dna.canthus_rPositionz * 255f + 0.5f);
            res.canthus_rRotationx = (System.Byte)(dna.canthus_rRotationx * 255f + 0.5f);
            res.canthus_rRotationz = (System.Byte)(dna.canthus_rRotationz * 255f + 0.5f);
            res.canthus_rSize = (System.Byte)(dna.canthus_rSize * 255f + 0.5f);

            res.endeye_rPositionx = (System.Byte)(dna.endeye_rPositionx * 255f + 0.5f);
            res.endeye_rPositionz = (System.Byte)(dna.endeye_rPositionz * 255f + 0.5f);
            res.endeye_rRotationx = (System.Byte)(dna.endeye_rRotationx * 255f + 0.5f);
            res.endeye_rRotationz = (System.Byte)(dna.endeye_rRotationz * 255f + 0.5f);
            res.endeye_rSize = (System.Byte)(dna.endeye_rSize * 255f + 0.5f);

            res.eyePositionx = (System.Byte)(dna.eyePositionx * 255f + 0.5f);
            res.eyePositionz = (System.Byte)(dna.eyePositionz * 255f + 0.5f);
            res.eyeRotationx = (System.Byte)(dna.eyeRotationx * 255f + 0.5f);
            res.eyeRotationz = (System.Byte)(dna.eyeRotationz * 255f + 0.5f);
            res.eyeSize = (System.Byte)(dna.eyeSize * 255f + 0.5f);

            res.upeye_rPositionx = (System.Byte)(dna.upeye_rPositionx * 255f + 0.5f);
            res.upeye_rPositionz = (System.Byte)(dna.upeye_rPositionz * 255f + 0.5f);
            res.upeye_rRotationx = (System.Byte)(dna.upeye_rRotationx * 255f + 0.5f);
            res.upeye_rRotationz = (System.Byte)(dna.upeye_rRotationz * 255f + 0.5f);
            res.upeye_rSize = (System.Byte)(dna.upeye_rSize * 255f + 0.5f);

            res.loweye_rPositionx = (System.Byte)(dna.loweye_rPositionx * 255f + 0.5f);
            res.loweye_rPositionz = (System.Byte)(dna.loweye_rPositionz * 255f + 0.5f);
            res.loweye_rRotationx = (System.Byte)(dna.loweye_rRotationx * 255f + 0.5f);
            res.loweye_rRotationz = (System.Byte)(dna.loweye_rRotationz * 255f + 0.5f);
            res.loweye_rSize = (System.Byte)(dna.loweye_rSize * 255f + 0.5f);

            res.nosePositionx = (System.Byte)(dna.nosePositionx * 255f + 0.5f);
            res.nosePositionz = (System.Byte)(dna.nosePositionz * 255f + 0.5f);
            res.noseRotationx = (System.Byte)(dna.noseRotationx * 255f + 0.5f);
            res.noseRotationz = (System.Byte)(dna.noseRotationz * 255f + 0.5f);
            res.noseSize = (System.Byte)(dna.noseSize * 255f + 0.5f);

            res.tipnosePositionx = (System.Byte)(dna.tipnosePositionx * 255f + 0.5f);
            res.tipnosePositionz = (System.Byte)(dna.tipnosePositionz * 255f + 0.5f);
            res.tipnoseRotationx = (System.Byte)(dna.tipnoseRotationx * 255f + 0.5f);
            res.tipnoseRotationz = (System.Byte)(dna.tipnoseRotationz * 255f + 0.5f);
            res.tipnoseSize = (System.Byte)(dna.tipnoseSize * 255f + 0.5f);

            res.nose_upPositionx = (System.Byte)(dna.nose_upPositionx * 255f + 0.5f);
            res.nose_upPositionz = (System.Byte)(dna.nose_upPositionz * 255f + 0.5f);
            res.nose_upRotationx = (System.Byte)(dna.nose_upRotationx * 255f + 0.5f);
            res.nose_upRotationz = (System.Byte)(dna.nose_upRotationz * 255f + 0.5f);
            res.nose_upSize = (System.Byte)(dna.nose_upSize * 255f + 0.5f);

            res.nasalnosePositionx = (System.Byte)(dna.nasalnosePositionx * 255f + 0.5f);
            res.nasalnosePositionz = (System.Byte)(dna.nasalnosePositionz * 255f + 0.5f);
            res.nasalnoseRotationx = (System.Byte)(dna.nasalnoseRotationx * 255f + 0.5f);
            res.nasalnoseRotationz = (System.Byte)(dna.nasalnoseRotationz * 255f + 0.5f);
            res.nasalnoseSize = (System.Byte)(dna.nasalnoseSize * 255f + 0.5f);

            res.nosewing_rPositionx = (System.Byte)(dna.nosewing_rPositionx * 255f + 0.5f);
            res.nosewing_rPositionz = (System.Byte)(dna.nosewing_rPositionz * 255f + 0.5f);
            res.nosewing_rRotationx = (System.Byte)(dna.nosewing_rRotationx * 255f + 0.5f);
            res.nosewing_rRotationz = (System.Byte)(dna.nosewing_rRotationz * 255f + 0.5f);
            res.nosewing_rSize = (System.Byte)(dna.nosewing_rSize * 255f + 0.5f);

            res.mouthPositionx = (System.Byte)(dna.mouthPositionx * 255f + 0.5f);
            res.mouthPositionz = (System.Byte)(dna.mouthPositionz * 255f + 0.5f);
            res.mouthRotationx = (System.Byte)(dna.mouthRotationx * 255f + 0.5f);
            res.mouthRotationz = (System.Byte)(dna.mouthRotationz * 255f + 0.5f);
            res.mouthSize = (System.Byte)(dna.mouthSize * 255f + 0.5f);

            res.lipmouthPositionx = (System.Byte)(dna.lipmouthPositionx * 255f + 0.5f);
            res.lipmouthPositionz = (System.Byte)(dna.lipmouthPositionz * 255f + 0.5f);
            res.lipmouthRotationx = (System.Byte)(dna.lipmouthRotationx * 255f + 0.5f);
            res.lipmouthRotationz = (System.Byte)(dna.lipmouthRotationz * 255f + 0.5f);
            res.lipmouthSize = (System.Byte)(dna.lipmouthSize * 255f + 0.5f);

            res.upmouthPositionx = (System.Byte)(dna.upmouthPositionx * 255f + 0.5f);
            res.upmouthPositionz = (System.Byte)(dna.upmouthPositionz * 255f + 0.5f);
            res.upmouthRotationx = (System.Byte)(dna.upmouthRotationx * 255f + 0.5f);
            res.upmouthRotationz = (System.Byte)(dna.upmouthRotationz * 255f + 0.5f);
            res.upmouthSize = (System.Byte)(dna.upmouthSize * 255f + 0.5f);

            res.lowmouthPositionx = (System.Byte)(dna.lowmouthPositionx * 255f + 0.5f);
            res.lowmouthPositionz = (System.Byte)(dna.lowmouthPositionz * 255f + 0.5f);
            res.lowmouthRotationx = (System.Byte)(dna.lowmouthRotationx * 255f + 0.5f);
            res.lowmouthRotationz = (System.Byte)(dna.lowmouthRotationz * 255f + 0.5f);
            res.lowmouthSize = (System.Byte)(dna.lowmouthSize * 255f + 0.5f);
            return res;
        }
    }
}
