using ClientBase.Singleton;
class GlobalConfig : Singleton<GlobalConfig>
{
    public bool useAppStore = false;
    public int ownindex = 999;          //我的服务器按钮索引
    public int recommendindex = 998;    //推荐服务器索引
}
