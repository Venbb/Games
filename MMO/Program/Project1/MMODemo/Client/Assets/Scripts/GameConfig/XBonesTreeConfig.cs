using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using ClientBase.Singleton;

public class XBonesTreeConfig : Singleton<XBonesTreeConfig> {
    public Dictionary<eUMAPart, List<BonesTree>> BonesDictionary = new Dictionary<eUMAPart, List<BonesTree>>();
    public void LoadTable(List<string[]> lines)
    {
        BonesDictionary.Clear();
        for (int i = 1; i < lines.Count; ++i)
        {
            LoadSingleLine(lines[i]);
        }
    }
    private void LoadSingleLine(string[] line)
    {
        BonesTree bones = new BonesTree();
        bones.ePart = (eUMAPart)int.Parse(line[0]);
        bones.place = (eUMAPlace)int.Parse(line[1]);
        bones.BonesIcon = line[2];
        bones.bEnble = int.Parse(line[3]) > 0 ? true : false;
        if (BonesDictionary.ContainsKey(bones.ePart))
        {
            BonesDictionary[bones.ePart].Add(bones);
        }
        else
        {
            List<BonesTree> temp = new List<BonesTree>();
            temp.Add(bones);
            BonesDictionary.Add(bones.ePart, temp);
        }
    }
    public List<BonesTree> GetBonesTrees(eUMAPart ePart)
    {
        if (BonesDictionary.ContainsKey(ePart))
        {
            return BonesDictionary[ePart];
        }
        return null;
    }
}
public class BonesTree
{
    public eUMAPart ePart;
    public eUMAPlace place = eUMAPlace.UMA_None;
    public string BonesIcon;
    public bool bEnble;
}