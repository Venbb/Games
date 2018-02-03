using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using ClientBase.Singleton;
using UMA;
using System.IO;

public class UMAPackBase : Singleton<UMAPackBase>
{
    public string recipeString = "";
    public string saveFilename = "DNA";
    public void Save(UMARecipe umaRecipe)
    {
        var packedRecipe = PackRecipeV3(umaRecipe);
        PackedSave(packedRecipe);
    }
    public static UMAPackRecipe PackRecipeV3(UMARecipe umaRecipe)
    {
        UMAPackRecipe umaPackRecipe = new UMAPackRecipe();
        umaPackRecipe.packedDna = GetPackedDNA(umaRecipe);
        return umaPackRecipe;
    }
    public static List<UMAPackedDna> GetPackedDNA(UMARecipe umaRecipe)
    {
        List<UMAPackedDna> PackedDNAlist = new List<UMAPackedDna>();

        foreach (var dna in umaRecipe.GetAllDna())
        {
            UMAPackedDna packedDna = new UMAPackedDna();
            packedDna.dnaTypeHash = dna.DNATypeHash;
            packedDna.dnaType = dna.GetType().Name;
            packedDna.packedDna = UMA.UMADna.SaveInstance(dna);
            PackedDNAlist.Add(packedDna);
        }
        return PackedDNAlist;
    }
    public void PackedSave(UMAPackRecipe packedRecipe)
    {
        recipeString = JsonUtility.ToJson(packedRecipe);
        FileUtils.WriteAllText(GetSavePath(saveFilename), recipeString);
    }
    public UMAPackRecipe PackedLoad()
    {
        if ((recipeString == null) || (recipeString.Length == 0)) return new UMAPackRecipe();
        return JsonUtility.FromJson<UMAPackRecipe>(recipeString);
    }
    string GetSavePath(string saveFilename)
    {
        string path = "";
        string filePath = "";
        path = System.IO.Path.Combine(Application.dataPath, "Resources");
        if (!Directory.Exists(path))
        {
            Directory.CreateDirectory(path);
        }
        filePath = System.IO.Path.Combine(path, saveFilename + ".txt");
        return filePath;
    }
}
