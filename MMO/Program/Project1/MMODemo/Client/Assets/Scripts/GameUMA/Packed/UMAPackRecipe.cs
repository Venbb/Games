using System.Collections;
using System.Collections.Generic;
using UMA;
using UnityEngine;
using ClientBase.Singleton;
using System.IO;

[System.Serializable]
public class UMAPackRecipe
{
    public List<UMAPackedDna> packedDna = new List<UMAPackedDna>();
}
[System.Serializable]
public class UMAPackedDna
{
    public string dnaType;
    public int dnaTypeHash;
    public string packedDna;
}
