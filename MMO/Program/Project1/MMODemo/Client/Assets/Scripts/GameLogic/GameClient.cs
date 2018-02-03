using ClientBase.Singleton;
using ClientBase.Debuger;

public class GameClient : Singleton<GameClient>
{
    public bool mNeedReconnect;
    private GameLogin mGameLogin;
    public GameLogin MyGameLogin
    {
        get
        {
            return mGameLogin;
        }
    }
    private NetWorkMgr mNetWorkMgr = null;
    public NetWorkMgr MyNetWorkMgr
    {
        get
        {
            return mNetWorkMgr;
        }
    }
    public GameClient()
    {
        mGameLogin = new GameLogin();
        mNetWorkMgr = new NetWorkMgr(this.NetDroppedHandler);
        mNeedReconnect = false;
        this.InitNetEvent();
    }
    public void NetDroppedHandler()
    {
        this.LogError("NetDroppedHandler!!!!");
        mNeedReconnect = true;
    }
    public void FixedUpdate()
    {
        MyGameLogin.FixedUpdate();
        MyNetWorkMgr.FixedUpdate();
    }
    private void InitNetEvent()
    {
        ProtocolEvent myEvent = mNetWorkMgr.GetMyEvent() as ProtocolEvent;
        myEvent.OnPing += new ProtocolEvent.PPing(mNetWorkMgr.OnPing);
        myEvent.OnWaiting += new ProtocolEvent.PWaiting(MyGameLogin.OnWaiting);
        myEvent.OnLogin += new ProtocolEvent.PLogin(MyGameLogin.OnGameLogin);
        myEvent.OnDayChanged += OnDayChange;
    }
    public void CloseClient()
    {
        MyNetWorkMgr.StopNetWork();
        GameData.Instance.mReloginEnterDng = 0;
    }
    public void OnDayChange()
    {
    }
}
