using System.Collections;
using System.Collections.Generic;
using UMA;
using UnityEngine;
namespace UMA.CharacterSystem
{
    public class DynamicCharacterAvatar : UMAAvatarBase
    {
        public DynamicDNAConverterBehaviour dynamicDNAConverterBehaviour;
        public UMADnaBase[] GetAllDNA()
        {
            return umaData.GetAllDna();
        }
        public void ForceUpdate()
        {
            umaData.skeleton.ResetAll();
            dynamicDNAConverterBehaviour.ApplyDynamicDnaAction(umaData, umaData.skeleton);
        }  
    }
}
