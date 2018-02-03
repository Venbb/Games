using System.Collections;
using System.Collections.Generic;
using UnityEngine;
namespace UMA.CharacterSystem
{
    public class TestCustomizerDD : MonoBehaviour
    {
        public DynamicDemo Avatar;
        public DNAPanel faceEditor;
        public void ShowHideFaceDNA()
        {
            faceEditor.Initialize(Avatar);
            faceEditor.transform.parent.gameObject.SetActive(true);
        }
    }
}
