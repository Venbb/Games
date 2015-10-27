package com.paypal.android.pizza;

import com.android.gservicesampletest.R;

import android.content.Context;
import android.view.Gravity;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

/*
 * Simple layout that contains a title as well as left and right navigation buttons
 */
public class NavBar extends LinearLayout {
	public TextView titleText;
	public Button leftButton;
	public Button rightButton;
	
	public NavBar(Context context, OnClickListener listener) {
		super(context);
		setLayoutParams(new LinearLayout.LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT));
		setOrientation(VERTICAL);
		
		LinearLayout content = new LinearLayout(context);
		content.setLayoutParams(new LinearLayout.LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT));
		content.setOrientation(HORIZONTAL);
		content.setBackgroundResource(R.drawable.header_gradient);
		
		titleText = new TextView(context);
		LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT, 0.5f);
		params.setMargins(0, 5, 0, 0);
		titleText.setLayoutParams(params);
		titleText.setGravity(Gravity.CENTER);
		titleText.setSingleLine(true);
		titleText.setTextSize(16.0f);
		titleText.setTextColor(0xffffffff);
		
		leftButton = new Button(context);
		leftButton.setLayoutParams(new LinearLayout.LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT, 0.75f));
		leftButton.setText("Left");
		leftButton.setTextSize(12.0f);
		leftButton.setOnClickListener(listener);
		
		rightButton = new Button(context);
		rightButton.setLayoutParams(new LinearLayout.LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT, 0.75f));
		rightButton.setText("Right");
		rightButton.setTextSize(14.0f);
		rightButton.setOnClickListener(listener);
		
		content.addView(leftButton);
		content.addView(titleText);
		content.addView(rightButton);
		addView(content);
		
		LinearLayout spacer = new LinearLayout(context);
		spacer.setLayoutParams(new LinearLayout.LayoutParams(LayoutParams.FILL_PARENT, 10));
		addView(spacer);
	}
}
