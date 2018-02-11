using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using ClientTool;
using ClientBase.Debuger;
using System.IO;
public class LanuageTool : Editor {
    [MenuItem("DingYouEditor/LanuageTool")]
    static void ReplaceLanuage()
    {
        string filePath = "Assets\\BuildResources\\Settings\\LanguageInCS.csv";
        string savePath = "Assets\\BuildResources\\Settings\\language.csv";
        TextAsset text = AssetDatabase.LoadAssetAtPath(filePath, typeof(TextAsset))as TextAsset;
        string txt = text.text;
        txt = txt.Replace("\"", string.Empty);

        LanguageAnalyze.AnalyzeFile(txt, "LanguageInCS", savePath);
        Debug.Log("ReplaceLanuage ok");
    }
}
