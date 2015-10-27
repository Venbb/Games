package com.enveesoft.barbarian;

/*import android.app.Activity;*/
import java.io.File;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Calendar;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Bitmap.CompressFormat;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.provider.MediaStore.Audio.Media;
import android.provider.MediaStore.Images;
import android.provider.SyncStateContract.Constants;
import android.text.format.Time;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup.LayoutParams;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.unity3d.player.*;

import com.google.ads.*;
import com.mindmatics.mopay.android.api.IMopayPurchase;
import com.mindmatics.mopay.android.api.IMopayResult;
import com.mindmatics.mopay.android.api.MopayActivityResult;
import com.mindmatics.mopay.android.api.MopayClient;
import com.mindmatics.mopay.android.api.MopayPurchaseFactory;
import com.mindmatics.mopay.android.api.MopayResultFactory;
import com.mindmatics.mopay.android.api.MopayStatus;
import com.mindmatics.mopay.android.api.PurchaseParamByButtonId;
import com.enveesoft.barbarian.R;

public class AdmobTestActivity extends UnityPlayerActivity implements AdListener {
	   /** Called when the activity is first created. */	
	public AdView adView;
	public String ADV_PUB_ID = "a14f99f1d75896c";
	private boolean adVisible = true;
	public  final MopayClient mopayClient = new MopayClient(this);
	public  static boolean open = false;
	public  static int resultNum = 0;
    @Override
    public void onCreate(Bundle savedInstanceState) {
    	Log.i("AdMob", "onCreate");
    	
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.main);
        
        SetupAdvs();
        
        InitDIR();
    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) 
    {
    	super. onActivityResult(requestCode, resultCode, data);
    	// only if the response is coming from payment action, the evaluation of the mopay
    	// result hast to be done. Other actions are e.g mopay for android client installation done.
    	if ( requestCode == MopayActivityResult.ACTION_PAYMENT) 
    	{
    	    final IMopayResult mopayResult = MopayResultFactory.createMopayResult(requestCode, resultCode, data) ;
    	    onPaymentCompleted(mopayResult );
    	}
    }
     public  void startPayment() 
     {
     	Log.d("link", "link");
     	final IMopayPurchase mopayPurchase = MopayPurchaseFactory.createForButtonId("myAppSecret");
     	mopayPurchase.putParam(PurchaseParamByButtonId.COUNTRY, "DE" );
     	mopayPurchase.putParam(PurchaseParamByButtonId.BUTTON_ID, "97812848BC821DAAFFD8E8ECBDA23E26" );
     	mopayPurchase.putParam(PurchaseParamByButtonId.SERVICE_NAME, "MyAppName");
     	mopayPurchase.putParam(PurchaseParamByButtonId.PRODUCT_NAME, "10 Gold Nuggets");
     	mopayPurchase.putParam(PurchaseParamByButtonId.MYID, "OrderId 4712, created at "+System.currentTimeMillis() );
     	mopayPurchase.putParam(PurchaseParamByButtonId.EXTERNAL_UID, ""); // optional parameter
     	mopayPurchase.putParam(PurchaseParamByButtonId.REPORTING_ID, "" ); // optional parameter
     	mopayClient.startPayment(mopayPurchase) ;
     
     }
     private void onPaymentCompleted (IMopayResult mopayResult ) 
     {
     	// The mopay results contains the result of the payment acticity.
     	final MopayStatus status = mopayResult.getStatus(); // status will never be null
     	final String guid = mopayResult.getGuid(); // guid can be empty (invalid parameters supplied, no internet)
     	final String currency = mopayResult.getCurrency();
     	final double amount = mopayResult.getAmount();
     	final String country = mopayResult.getCountry();
     	final String msisdn = mopayResult.getMsisdn();
     	// Evaluate the payment details
     	if (MopayStatus.SUCCESS.equals(status) ) 
     	{
     	    // payment was sucecssfuly done, place here your code
     		Log.d("result1", "result1");
     		resultNum = 1;
     	} 
     	else if (MopayStatus.ERROR.equals(status) )
     	{
     	    // payment failed, place here your code
 	    	final long errorCode = mopayResult.getErrorCode(); // See error codes table at the end of this document.
 	    	final String errorMessage = mopayResult.getErrorMessage(); // Will be empty string, if errorcode = 0
 	    	final int errorDetail = mopayResult.getErrorDetail(); // Errordetail is an optional detailed error code only
     	    // returned in case of the payment errorcode=10210301
     	    Log.d("result2", "result2");
     	    resultNum = 2;
     	} 
     	else 
     	{
     		Log.d("result3", "result3");
     		resultNum = 3;
     		//payment still INPROGRESS, place here your code and wait for the mopay XML payment notificiation to your payment // backend application. It is required to have a server application to integrate mopay !
     	}
     }
     public int returnResult()
     {
     	 // id = resultNum;
     	  Log.d("resultid",String.valueOf(resultNum));
     	  return resultNum;
     	  
     	  //return resultNum;
     }
    public void InitDIR()
    {
    	File dir = new File(Environment.getExternalStorageDirectory()+"/SmurfData");
        if(!dir.exists())
        {
        	dir.mkdirs();
        }
    }
    public void DeleteAudio(int id)
    {
    	File file = new File(Environment.getExternalStorageDirectory()+"/SmurfData/TempAudioFile"+id+".wav"); 
    	file.delete();
    }
    public void SetupAdvs()
    {    	 
    	Log.i("AdMob", "Start Setup");
        LinearLayout layout = new LinearLayout(this);
		layout.setOrientation(LinearLayout.VERTICAL);
		layout.setGravity(android.view.Gravity.BOTTOM | android.view.Gravity.RIGHT);   //To put AdMob Adv to Bottom of Screen
		Log.i("AdMob", "End Layout Setup");
		
		addContentView(layout, new LayoutParams(LayoutParams.FILL_PARENT,LayoutParams.FILL_PARENT));
		
        adView = new AdView(this, AdSize.BANNER, ADV_PUB_ID);
        adView.setAdListener(this);
        Log.i("AdMob", "Init complete Adview");
        
        layout.addView(adView, new LayoutParams(LayoutParams.WRAP_CONTENT, 75));
        Log.i("AdMob", "Done AddView Layout");
		
        AdRequest request = new AdRequest();
        //request.addTestDevice(androidId);
        request.addTestDevice(AdRequest.TEST_EMULATOR);
        request.addKeyword("This is my AdMobTestString");
        
        adView.loadAd(request);
        
       Log.i("AdMob", "End Setup");
        
        
						
		// Add test devices (check the logcat for the ID string of your device..)
		//AdManager.setTestDevices( new String[] { androidId } ); //this has to be changed
		
		//request.addTestDevice(AdRequest.TEST_EMULATOR);
		
    }
    
    private Handler handler = new Handler() 
	{
		public void  handleMessage(Message msg) 
		{
			switch (msg.what)
			{
				case 0:		//Disable Adv
					if (adVisible)
						adVisible = false;
					break;
				
				case 1:		//Enable Adv
					if (!adVisible)
					{
						adVisible = true;
					}
					break;
				
				case 2:		//Enable but Hide Adv
						adView.setVisibility(View.GONE);				
					break;
						
				case 3:		//Enable but Show Adv
						adView.setVisibility(View.VISIBLE);
					break;
				
				default:
					break;
			}
		}
	};
	
	public void DisableAds()
	{
		Log.i("AdMob", "Request Disable Adv");
		handler.sendEmptyMessage(0);
	}
	public void ShowEmail()
	{
		//Uri uri = Uri.parse(MediaStore.Images.Media.insertImage(getContentResolver(), mBitmap, null, null));// 将bitmap转为uri
		//Log.d("here",+"");
		File file = new File(Environment.getExternalStorageDirectory()+"/Android/data/com.lily.times.blue3d/files/Smurf_ScreenShot_Photo.jpg"); 
		Log.d("here", "Does this exist? " + String.valueOf(file.exists())+"Length"+file.length());
		
		Intent intent = new Intent(Intent.ACTION_SEND);
		intent.putExtra(android.content.Intent.EXTRA_SUBJECT, this.getResources().getString(R.string.app_name) + "  Picture");
		intent.putExtra(android.content.Intent.EXTRA_TEXT, "Smurf Screen Shot");
		intent.setType("application/octet-stream");
		intent.putExtra(Intent.EXTRA_STREAM, Uri.fromFile(file)); // 添加附件，附件为file对象 
		startActivity(Intent.createChooser(intent, getTitle())); // 调用系统的mail客户端进行发送
	}

	public void SavePhoto()
	{
		File file = new File(Environment.getExternalStorageDirectory()+"/Android/data/com.lily.times.blue3d/files/Smurf_ScreenShot_Photo.jpg"); 
        Calendar rightNow = Calendar.getInstance();
        //Log.d("Here","/sdcard/SmurfData/Smurf_Photo"+rightNow.get(Calendar.YEAR)+rightNow.get(Calendar.DAY_OF_YEAR)+rightNow.get(Calendar.HOUR_OF_DAY)+rightNow.get(Calendar.MINUTE)+rightNow.get(Calendar.SECOND)+".jpg");
        String Path = Environment.getExternalStorageDirectory()+"/SmurfData/Smurf_Photo"+rightNow.get(Calendar.YEAR)+rightNow.get(Calendar.DAY_OF_YEAR)+rightNow.get(Calendar.HOUR_OF_DAY)+rightNow.get(Calendar.MINUTE)+rightNow.get(Calendar.SECOND)+".jpg";
        copyfile(file,Path);
        
        File fileB = new File(Path);
        if(fileB.exists())
        	Log.d("Here","Copy Success");
        sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.parse("file://"+Path)));
	}
	
	public void copyfile(File input, String output) {

		try {
			FileInputStream inputstream = new FileInputStream(input);
			File file = new File(output);

			// if(file.exists())file.delete();
			FileOutputStream outputstream = new FileOutputStream(file);
			byte[] buffer = new byte[1024];
			int length = 0;
			while ((length = inputstream.read(buffer)) != -1) {
				outputstream.write(buffer, 0, length);
			}
			outputstream.flush();
			outputstream.close();
			inputstream.close();
			// File files=new File(output);
			// inputstream.close();

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}
	public void DownloadApp(int position)
	{
		//System.out.println(position);
		String  url = "market://details?id=";
		if (position == 0) {
			startActivity(new Intent(Intent.ACTION_VIEW,Uri.parse(url + "com.lily.times.monkey1.all")));
		}
		if (position == 1) {
			startActivity(new Intent(Intent.ACTION_VIEW,Uri.parse(url +"com.lily.times.tiger1.all")));
		}
		if (position == 2) {
			startActivity(new Intent(Intent.ACTION_VIEW,Uri.parse(url +"com.lily.times.chick1.all")));
		}
		if (position == 3) {
			startActivity(new Intent(Intent.ACTION_VIEW,Uri.parse(url +"com.lily.times.dragon1.all")));
		}
		if (position == 4) {
			startActivity(new Intent(Intent.ACTION_VIEW,Uri.parse(url +"com.lily.times.pony1.all")));
		}
		if (position == 5) {
			startActivity(new Intent(Intent.ACTION_VIEW,Uri.parse(url +"com.lily.times.calf1.all")));
		}
		if (position == 6) {
			startActivity(new Intent(Intent.ACTION_VIEW,Uri.parse(url +"com.lily.times.sheep1.all")));
		}
		if (position == 7) {
			startActivity(new Intent(Intent.ACTION_VIEW,Uri.parse(url +"com.lily.times.snake1.all")));
		}
		if (position == 8) {
			startActivity(new Intent(Intent.ACTION_VIEW,Uri.parse(url +"com.lily.times.mouse1.all")));
		}
		if (position == 9) {
			startActivity(new Intent(Intent.ACTION_VIEW,Uri.parse(url +"com.lily.times.rabbit1.all")));
		}
		if (position == 10) {
			startActivity(new Intent(Intent.ACTION_VIEW,Uri.parse(url +"com.lily.times.piggy1.all")));
		}
		if (position == 11) {
			startActivity(new Intent(Intent.ACTION_VIEW,Uri.parse(url +"com.lily.times.dog1.all")));
		}
		return;
	}
	public void RateApp()
	{
		Uri uri = Uri.parse("market://details?id="+ "com.lily.times.dog1.all");//AdmobTestActivity.class.getPackage().getName());
		startActivity(new Intent(Intent.ACTION_VIEW, uri));
	}
	public void EnableAds()
	{
		Log.i("AdMob", "Request Enable Adv");
		handler.sendEmptyMessage(1);
	}
	
	public void HideAdv()  //Enable Adv but Hide
	{
		Log.i("AdMob", "Request Hide Adv");
		handler.sendEmptyMessage(2);
	}

	public void ShowAdv()  //Show Adv
	{
		Log.i("AdMob", "Request Show Adv");
		handler.sendEmptyMessage(3);
	}
	
	/** Called when an ad is received. */
	@Override
	public void onReceiveAd(Ad ad)	{
		Log.d("AdMob", "Adv Received");
		
	}
	
	/** Called when an ad was not received. */
	@Override
	public void onFailedToReceiveAd(Ad ad, AdRequest.ErrorCode errorCode) {
	  Log.d("AdMob", "failed to receive ad (" + errorCode + ")");	  
	}
	
	/**
	   * Called when an Activity is created in front of the app (e.g. an
	   * interstitial is shown, or an ad is clicked and launches a new Activity).
	   */
	@Override
	public void onPresentScreen(Ad ad){
		Log.d("AdMob", "Present Screen");
	}
	
	/** Called when an ad is clicked and about to return to the application. */
	@Override
	public void onDismissScreen(Ad ad){
		Log.d("AdMob", "Dismiss Screen");
	}
	
	/**
	   * Called when an ad is clicked and going to start a new Activity that will
	   * leave the application (e.g. breaking out to the Browser or Maps
	   * application).
	   */
	@Override
	public void onLeaveApplication(Ad ad){
		Log.d("AdMob", "Leaving Application");
	}
	
    
    @Override
    public void onDestroy() {
      if (adView != null) {
        adView.destroy();
      }
      super.onDestroy();
    }
}
/*
public void RefreshMedia()
{
	folderScan(Environment.getExternalStorageDirectory()+"/SmurfData");
}

public void fileScan(String file){
	Uri data = Uri.parse("file://"+file);
	
	sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, data));
	Log.d("FileName",file);
}

public void folderScan(String path){
	File file = new File(path);
	Log.d("FileName",path);
	if(file.isDirectory()){
		File[] array = file.listFiles();
		Log.d("FileName",""+array.length);
		for(int i=0;i<array.length;i++){
			File f = array[i];
			if(f.isFile()){//FILE TYPE
				String name = f.getName();
				if(name.contains(".jpg"))
				{
					Log.d("FileName",f.getAbsolutePath());
					fileScan(f.getAbsolutePath());
				}
			}
		}
	}
}*/