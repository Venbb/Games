/// <summary>
/// 树形菜单数据
/// </summary>
public class TreeViewData
{
    /// <summary>
    /// 数据内容
    /// </summary>
    public string Name;
    /// <summary>
    /// 数据所属的父ID
    /// </summary>
    public int ParentID;
    /// <summary>
    /// 数据索引
    /// </summary>
    public int index;

    public eUMAPart ePart = eUMAPart.UMA_None;
    public eOperationPart eOperation = eOperationPart.OP_Adjustment;

}
