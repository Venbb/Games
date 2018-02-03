using ClientBase.Singleton;
using System.Collections.Generic;
using UnityEngine;

public class RandomNameManager: Singleton<RandomNameManager>
{
    private List<string[]> mNamePart0 = null;
    private List<string[]> mNamePart1 = null;

    public void LoadNamePart0(List<string[]> lines)
    {
        mNamePart0 = lines;
    }

    public void LoadNamePart1(List<string[]> lines)
    {
        mNamePart1 = lines;
    }

    private int GetRandom(int start, int end)
    {
        return (int)(Random.value * (end - start) + start);
    }

    public string RandomName()
    {
        int part0_c = mNamePart0.Count;
        int part1_c = mNamePart1.Count;

        int part0 = Random.Range(0, part0_c);
        int part1 = Random.Range(0, part1_c);

        return mNamePart0[part0][0] + mNamePart1[part1][0];
    }
}
