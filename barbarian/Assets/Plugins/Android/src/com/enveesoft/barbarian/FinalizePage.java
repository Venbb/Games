package com.paypal.android.pizza;

import com.android.gservicesampletest.R;

import android.content.Context;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.ToggleButton;

public class FinalizePage extends BasePage implements OnClickListener {

	//The different elements of our page
	NavBar mainNavBar;
	Button reviewButton;
	ToggleButton oneButton;
	ToggleButton twoButton;
	ToggleButton threeButton;
	ToggleButton pickupButton;
	ToggleButton deliveryButton;
	LinearLayout insideLayout;
	
	public FinalizePage(Context context) {
		super(context);

		//Setup our page and remember our previous selections
		insideLayout = new LinearLayout(context);
		insideLayout.setLayoutParams(new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT));
		insideLayout.setOrientation(LinearLayout.VERTICAL);
		insideLayout.setBackgroundResource(R.drawable.bg);
		addView(insideLayout);
		
		mainNavBar = new NavBar(context, this);
		mainNavBar.titleText.setText("Finalize your order");
		mainNavBar.leftButton.setText("Customize");
		mainNavBar.rightButton.setText("");
		mainNavBar.rightButton.setVisibility(INVISIBLE);
		insideLayout.addView(mainNavBar);
		
		RelativeLayout numberTitleLayout = new RelativeLayout(context);
		numberTitleLayout.setLayoutParams(new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT));
		insideLayout.addView(numberTitleLayout);
		
		TextView numberTitle = new TextView(context);
		numberTitle.setText("Select the number of pizzas");
		numberTitle.setTextColor(0xffffffff);
		numberTitle.setPadding(0, 10, 0, 5);
		numberTitle.setTextSize(16.0f);
		RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
		params.addRule(RelativeLayout.CENTER_HORIZONTAL, RelativeLayout.TRUE);
		numberTitle.setLayoutParams(params);
		numberTitleLayout.addView(numberTitle);
		
		LinearLayout numberLayout = new LinearLayout(context);
		numberLayout.setLayoutParams(new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT));
		insideLayout.addView(numberLayout);
		
		oneButton = new ToggleButton(context);
		oneButton.setText("One");
		oneButton.setTextOn("One");
		oneButton.setTextOff("One");
		oneButton.setLayoutParams(new LinearLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT, 0.66f));
		oneButton.setOnClickListener(this);
		if (Pizza.getInstance().getCurrentCount() == 1)
			oneButton.setChecked(true);
		numberLayout.addView(oneButton);
		
		twoButton = new ToggleButton(context);
		twoButton.setText("Two");
		twoButton.setTextOn("Two");
		twoButton.setTextOff("Two");
		twoButton.setLayoutParams(new LinearLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT, 0.66f));
		twoButton.setOnClickListener(this);
		if (Pizza.getInstance().getCurrentCount() == 2)
			twoButton.setChecked(true);
		numberLayout.addView(twoButton);
		
		threeButton = new ToggleButton(context);
		threeButton.setText("Three");
		threeButton.setTextOn("Three");
		threeButton.setTextOff("Three");
		threeButton.setLayoutParams(new LinearLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT, 0.66f));
		threeButton.setOnClickListener(this);
		if (Pizza.getInstance().getCurrentCount() == 3)
			threeButton.setChecked(true);
		numberLayout.addView(threeButton);
		
		RelativeLayout methodTitleLayout = new RelativeLayout(context);
		methodTitleLayout.setLayoutParams(new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT));
		insideLayout.addView(methodTitleLayout);
		
		TextView methodTitle = new TextView(context);
		methodTitle.setText("Choose method");
		methodTitle.setTextColor(0xffffffff);
		methodTitle.setPadding(0, 10, 0, 5);
		methodTitle.setTextSize(16.0f);
		params = new RelativeLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
		params.addRule(RelativeLayout.CENTER_HORIZONTAL, RelativeLayout.TRUE);
		methodTitle.setLayoutParams(params);
		methodTitleLayout.addView(methodTitle);
		
		LinearLayout methodLayout = new LinearLayout(context);
		methodLayout.setLayoutParams(new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT));
		insideLayout.addView(methodLayout);
		
		pickupButton = new ToggleButton(context);
		pickupButton.setText("Pickup");
		pickupButton.setTextOn("Pickup");
		pickupButton.setTextOff("Pickup");
		pickupButton.setLayoutParams(new LinearLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT, 0.5f));
		pickupButton.setOnClickListener(this);
		if (Pizza.getInstance().getCurrentMethod() == Pizza.METHOD_PICKUP)
			pickupButton.setChecked(true);
		methodLayout.addView(pickupButton);
		
		deliveryButton = new ToggleButton(context);
		deliveryButton.setText("Delivery");
		deliveryButton.setTextOn("Delivery");
		deliveryButton.setTextOff("Delivery");
		deliveryButton.setLayoutParams(new LinearLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT, 0.5f));
		deliveryButton.setOnClickListener(this);
		if (Pizza.getInstance().getCurrentMethod() == Pizza.METHOD_DELIVERY)
			deliveryButton.setChecked(true);
		methodLayout.addView(deliveryButton);
		
		RelativeLayout extraTextLayout = new RelativeLayout(context);
		extraTextLayout.setLayoutParams(new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT));
		insideLayout.addView(extraTextLayout);
		
		TextView extraText = new TextView(context);
		extraText.setText("Deliveries will be made in 30 minutes or you can pick it up from 2211 N. 1st St., San Jose, CA");
		extraText.setTextColor(0xffffffff);
		extraText.setPadding(40, 40, 40, 40);
		extraText.setTextSize(16.0f);
		params = new RelativeLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
		params.addRule(RelativeLayout.CENTER_HORIZONTAL, RelativeLayout.TRUE);
		extraText.setLayoutParams(params);
		extraTextLayout.addView(extraText);
		
		RelativeLayout buttonLayout = new RelativeLayout(context);
		buttonLayout.setLayoutParams(new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT));
		insideLayout.addView(buttonLayout);
		
		reviewButton = new Button(context);
		params = new RelativeLayout.LayoutParams(200, LayoutParams.WRAP_CONTENT);
		params.addRule(RelativeLayout.CENTER_HORIZONTAL, RelativeLayout.TRUE);
		reviewButton.setLayoutParams(params);
		reviewButton.setText("Review Order");
		reviewButton.setOnClickListener(this);
		buttonLayout.addView(reviewButton);
	}

	@Override
	public void onClick(View v) {
		if (v == mainNavBar.leftButton) {
			//User is navigating back to the customize page, so save our values and change the page
			saveValues();
			Pizza.getInstance().changePage(Pizza.PAGE_CUSTOMIZE);
		}
		else if (v == reviewButton) {
			//User selected review, so save our values, disable buttons, and change the page
			saveValues();
			mainNavBar.leftButton.setEnabled(false);
			oneButton.setEnabled(false);
			twoButton.setEnabled(false);
			threeButton.setEnabled(false);
			pickupButton.setEnabled(false);
			deliveryButton.setEnabled(false);
			reviewButton.setEnabled(false);
			Pizza.getInstance().changePage(Pizza.PAGE_WEB);
		}
		else if (v == oneButton) {
			//Deselect the other numbers to make these buttons more like a radio button
			twoButton.setChecked(false);
			threeButton.setChecked(false);
		}
		else if (v == twoButton) {
			//Deselect the other numbers to make these buttons more like a radio button
			oneButton.setChecked(false);
			threeButton.setChecked(false);
		}
		else if (v == threeButton) {
			//Deselect the other numbers to make these buttons more like a radio button
			oneButton.setChecked(false);
			twoButton.setChecked(false);
		}
		else if (v == pickupButton) {
			//Deselect the other method to make these buttons more like a radio button
			deliveryButton.setChecked(false);
		}
		else if (v == deliveryButton) {
			//Deselect the other method to make these buttons more like a radio button
			pickupButton.setChecked(false);
		}
	}
	
	public void saveValues() {
		//Save our selections
		int count = 1;
		if (twoButton.isChecked())
			count = 2;
		else if (threeButton.isChecked())
			count = 3;
		Pizza.getInstance().setCurrentCount(count);
		
		int method = Pizza.METHOD_PICKUP;
		if (deliveryButton.isChecked())
			method = Pizza.METHOD_DELIVERY;
		Pizza.getInstance().setCurrentMethod(method);
	}

	@Override
	public void update() {
		//Re-enable our buttons in case there was a problem launching the webview
		Pizza.getInstance().runOnUiThread(new Runnable() {
			public void run() {
				mainNavBar.leftButton.setEnabled(true);
				oneButton.setEnabled(true);
				twoButton.setEnabled(true);
				threeButton.setEnabled(true);
				pickupButton.setEnabled(true);
				deliveryButton.setEnabled(true);
				reviewButton.setEnabled(true);
			}
		});
	}

}
